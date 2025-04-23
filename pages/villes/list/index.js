import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

// Service simulé pour récupérer les villes
const CityService = {
    getCitiesByRegion: (regionId) => {
      return Promise.resolve([
        { id: 1, name: 'Tanger' },
        { id: 2, name: 'Tetouan' },
        { id: 3, name: 'Al Hoceima' },
        { id: 4, name: 'Fès' },
        { id: 5, name: 'Marrakech' },
        { id: 6, name: 'Casablanca' },
        { id: 7, name: 'Rabat' },
        { id: 8, name: 'Agadir' },
        { id: 9, name: 'Meknès' },
        { id: 10, name: 'Oujda' },
      ]);
    },
    deleteCity: (cityId) => {
      return Promise.resolve({ success: true });
    },
};

function CityList() {
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState({ id: null, name: '', region: '' });  // Initialize with an empty object
    const [submitted, setSubmitted] = useState(false);
    const [cityDialog, setCityDialog] = useState(false);
    const [filters, setFilters] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(1);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [cityToDelete, setCityToDelete] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    const regionsMaroc = [
        { id: 1, name: 'Tanger-Tétouan-Al Hoceima' },
        { id: 2, name: 'Oriental' },
        { id: 3, name: 'Fès-Meknès' },
        { id: 4, name: 'Rabat-Salé-Kénitra' },
        { id: 5, name: 'Béni Mellal-Khénifra' },
        { id: 6, name: 'Casablanca-Settat' },
        { id: 7, name: 'Marrakech-Safi' },
        { id: 8, name: 'Drâa-Tafilalet' },
        { id: 9, name: 'Souss-Massa' },
        { id: 10, name: 'Guelmim-Oued Noun' },
        { id: 11, name: 'Laâyoune-Sakia El Hamra' },
        { id: 12, name: 'Dakhla-Oued Ed-Dahab' },
    ];

    const dropdownValues = regionsMaroc.map(region => ({
        name: region.name,
        code: `REG${region.id}`,
        region: region.name,
    }));

    useEffect(() => {
        CityService.getCitiesByRegion(selectedRegion).then((data) => {
            setCities(data);
            setLoading(false);
        });
    }, [selectedRegion]);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const openNewCityDialog = () => {
        setCity({ id: null, name: '', region: '' }); // Initialize for new city
        setSubmitted(false);
        setCityDialog(true);
    };

    const openEditCityDialog = (city) => {
        setCity(city); // Fill the dialog with the city data for editing
        setDropdownValue(city.region);
        setCityDialog(true);
    };

    const hideDialog = () => {
        setCityDialog(false);
        setSubmitted(false);
    };

    const deleteCity = () => {
        setCityToDelete(null);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Ville supprimée', life: 3000 });
    };

    const confirmDeleteCity = (city) => {
        setCityToDelete(city);
        setDialogVisible(true);
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des villes" className="w-full" />
                </span>
                <Button type="button" icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} rounded outlined className="p-button-outlined" onClick={openNewCityDialog} />
            </div>
        );
    };

    const cityTemplate = (rowData) => (
        <span style={{ padding: '5px'}} ><i className="pi pi-map-marker" style={{ color: 'var(--primary-color)' }} /> &nbsp;&nbsp;{rowData.name}</span>
    );

    const actionTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditCityDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" className="" onClick={() => confirmDeleteCity(rowData)} />
        </>
    );

    const cityDialogFooter = (
        <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" />
        </>
    );

    const deleteCityDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDialogVisible(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteCity} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-map-marker" /> &nbsp;&nbsp;Liste des villes</span>
            <DataTable
                ref={dt}
                value={cities}
                header={renderHeader()}
                paginator
                rows={10}
                responsiveLayout="scroll"
                filters={filters}
                loading={loading}
                rowsPerPageOptions={[10, 25, 50]}
                size='small'
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} villes"
                
            >
                <Column field="name" header="Nom de la ville" style={{ width: '85%'}} body={cityTemplate} sortable />
                <Column body={actionTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible'}} />
            </DataTable>

            <Dialog visible={dialogVisible} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteCityDialogFooter} onHide={() => setDialogVisible(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {cityToDelete && (
                        <span>Confirmez-vous la suppression de cet élément ?</span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={cityDialog} style={{ width: '450px' }} 
            header={
            <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                {city.id ? "Modifier la ville" : "Ajouter une ville"}
            </span>
        } modal className="p-fluid" footer={cityDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nom de la ville</label>
                    <InputText id="name" value={city.name} onChange={(e) => setCity({ ...city, name: e.target.value })} required autoFocus />
                </div>
                <div className="field">
                    <label htmlFor="region">Région</label>
                    <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Sélectionner la région" />
                </div>
            </Dialog>
        </div>
    );
}

export default CityList;
