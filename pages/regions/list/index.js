import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated Region Service
const RegionService = {
    getRegions: () => {
        return Promise.resolve([
            { id: 1, name: 'Tanger-Tétouan-Al Hoceïma' },
            { id: 2, name: 'Fès-Meknès' },
            { id: 3, name: 'Casablanca-Settat' },
            { id: 4, name: 'Rabat-Salé-Kénitra' },
            { id: 5, name: 'Béni Mellal-Khénifra' },
            { id: 6, name: 'Marrakech-Safi' },
            { id: 7, name: 'Drâa-Tafilalet' },
            { id: 8, name: 'Souss-Massa' },
            { id: 9, name: 'Guelmim-Oued Noun' },
            { id: 10, name: 'Laâyoune-Sakia El Hamra' },
            { id: 11, name: 'Dakhla-Oued Ed-Dahab' },
            { id: 12, name: 'L’Oriental' },
        ]);
    },
    deleteRegion: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useState({ id: null, name: '' });
    const [regionDialog, setRegionDialog] = useState(false);
    const [deleteRegionDialog, setDeleteRegionDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);


    useEffect(() => {
        RegionService.getRegions()
            .then((data) => {
                setRegions(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des régions' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const regionTemplate = (rowData) => (
        <span><i className="pi pi-map-marker" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );

    const openNewRegionDialog = () => {
        setRegion({ id: null, name: '' });
        setRegionDialog(true);
    };

    const openEditRegionDialog = (region) => {
        setRegion(region); // Prefill the dialog with region data for editing
        setRegionDialog(true);
    };

    const hideDialog = () => {
        setRegionDialog(false);
    };

    const deleteRegion = () => {
        setDeleteRegionDialog(false);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Région supprimée', life: 3000 });
    };

    const confirmDeleteRegion = (region) => {
        setRegion(region);
        setDeleteRegionDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditRegionDialog(rowData)}  />
            <Button icon="pi pi-trash"  rounded text severity="danger"  className="" onClick={() => confirmDeleteRegion(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des régions" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter"  tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewRegionDialog} />
            </div>
        );
    };

    const regionDialogFooter = (
        <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" />
        </>
    );

    const deleteRegionDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteRegionDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteRegion} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-map" /> &nbsp;&nbsp;Liste des régions</span>
            <DataTable
                ref={dt}
                value={regions}
                header={renderHeader()}
                paginator
                rows={10}
                responsiveLayout="scroll"
                rowsPerPageOptions={[10, 25, 50]}
                // style={{ height: '500px' }}
                filters={filters}
                loading={loading}
                size='small'
                // className="datatable-responsive"
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} régions"
            >
                <Column field="name" header="Nom de région" body={regionTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '85%'}} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible'}} />
            </DataTable>

            <Dialog visible={deleteRegionDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteRegionDialogFooter} onHide={() => setDeleteRegionDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {region && <span>Confirmez-vous la suppression de cet élément ?</span>}
                </div>
            </Dialog>

            <Dialog visible={regionDialog}
            style={{ width: '450px' }} 
            header={
                <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                    {region.id ? "Modifier la région" : "Ajouter une région"}
                </span>
              }
             modal className="p-fluid" footer={regionDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nom de la région</label>
                    <InputText id="name" value={region.name} onChange={(e) => setRegion({ ...region, name: e.target.value })} required autoFocus />
                </div>
            </Dialog>
        </div>
    );
}

export default List;
