import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useRef, useState } from 'react';

// Simulated Parameters Service
const ParametersService = {
    getParameters: () => {
        return Promise.resolve([
            { id: 1, name: '% Extrait sec', abbreviation: 'ES', family: ['COHV'] },
            { id: 2, name: '1,1-Dichloroéthane', abbreviation: 'DCE', family: ['COHV'] },
            { id: 3, name: '2,4-DB', abbreviation: '2,4-DB', family: ['Pesticides'] },
            { id: 4, name: 'Acide alpha-linolénique (C18:3, n-3)', abbreviation: 'ALA', family: ['Profil des acides gras'] },
            { id: 5, name: 'Acide gadoléique (C20:1)', abbreviation: 'GDA', family: ['Profil des acides gras'] },
            { id: 6, name: 'Aflatoxines B2', abbreviation: 'AFB2', family: ['Aflatoxines'] },
            { id: 7, name: 'Aflatoxines G1', abbreviation: 'AFG1', family: ['Aflatoxines'] },
            { id: 8, name: 'Vitamine B12', abbreviation: 'VB12', family: ['Vitamines'] },
            { id: 9, name: 'Vitamine C', abbreviation: 'VC', family: ['Vitamines'] },
            { id: 10, name: 'Somme Toxines (T2+HT2)', abbreviation: 'Tox. T2+HT2', family: ['Toxines'] },
            { id: 11, name: 'Diflufenican', abbreviation: 'DIF', family: ['Pesticides'] },
            { id: 12, name: 'Metamitrone', abbreviation: 'MET', family: ['Pesticides'] },
        ]);
    },
    deleteParameter: (id) => {
        return Promise.resolve({ success: true });
    },
};

// Simulated FamilleParamètre Service (Dropdown options)
const FamilleParamètreService = {
    getTypes: () => {
        return Promise.resolve([
            { id: 1, name: 'Algues' },
            { id: 2, name: 'Chlorophytes (bacillarioph) en %' },
            { id: 3, name: 'Chlorophytes en %' },
            { id: 4, name: 'Cyanophytes en %' },
            { id: 5, name: 'Elément figurés' },
            { id: 6, name: 'Elément morts' },
            { id: 7, name: 'Vitamines' },
            { id: 8, name: 'Pesticides' },
            { id: 9, name: 'Toxines' },
            { id: 10, name: 'Profil des acides gras' },
        ]);
    },
};

function List() {
    const [parameters, setParameters] = useState([]);
    const [parameter, setParameter] = useState({ id: null, name: '', abbreviation: '', family: [] });
    const [parameterDialog, setParameterDialog] = useState(false);
    const [deleteParameterDialog, setDeleteParameterDialog] = useState(false);
    const [familleParamètre, setFamilleParamètre] = useState([]);
    const [selectedFamilleParamètre, setSelectedFamilleParamètre] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    // Fetch Parameters and FamilleParamètre on component mount
    useEffect(() => {
        ParametersService.getParameters()
            .then((data) => {
                setParameters(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des paramètres' });
            });

        FamilleParamètreService.getTypes()
            .then((data) => {
                setFamilleParamètre(data);
            })
            .catch((error) => {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des familles paramètre' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const parameterTemplate = (rowData) => (
        <span><i className="pi pi-link" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );

    const openNewParameterDialog = () => {
        setParameter({ id: null, name: '', abbreviation: '', family: [] });
        setParameterDialog(true);
    };

    const openEditParameterDialog = (parameter) => {
        setParameter(parameter); // Prefill the dialog with parameter data for editing
        setSelectedFamilleParamètre(parameter.family);
        setParameterDialog(true);
    };

    const hideDialog = () => {
        setParameterDialog(false);
    };

    const deleteParameter = () => {
        setDeleteParameterDialog(false);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Paramètre supprimé', life: 3000 });
    };

    const confirmDeleteParameter = (parameter) => {
        setParameter(parameter);
        setDeleteParameterDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditParameterDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" className="" onClick={() => confirmDeleteParameter(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des paramètres" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewParameterDialog} />
            </div>
        );
    };

    const parameterDialogFooter = (
        <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" />
        </>
    );

    const deleteParameterDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteParameterDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteParameter} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-link" /> &nbsp;&nbsp;Liste des paramètres</span>
            <DataTable
                ref={dt}
                value={parameters}
                header={renderHeader()}
                paginator
                rows={10}
                responsiveLayout="scroll"
                rowsPerPageOptions={[10, 25, 50]}
                filters={filters}
                loading={loading}
                size='small'
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} paramètres"
            >
                <Column field="name" header="Nom" body={parameterTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '40%' }} sortable />
                <Column field="abbreviation" header="Abréviation" headerClassName="white-space-nowrap" size="small" style={{ width: '25%' }} sortable />
                <Column field="family" header="Famille Paramètre" headerClassName="white-space-nowrap" size="small" style={{ width: '35%' }} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>

            <Dialog visible={deleteParameterDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteParameterDialogFooter} onHide={() => setDeleteParameterDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {parameter && <span>Confirmez-vous la suppression de ce paramètre ?</span>}
                </div>
            </Dialog>

            <Dialog visible={parameterDialog} style={{ width: '450px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{parameter.id ? "Modifier le paramètre" : "Ajouter un paramètre"}</span>} modal className="p-fluid" footer={parameterDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nom</label>
                    <InputText id="name" value={parameter.name} onChange={(e) => setParameter({ ...parameter, name: e.target.value })} required autoFocus />
                </div>
                <div className="field">
                    <label htmlFor="abbreviation">Abréviation</label>
                    <InputText id="abbreviation" value={parameter.abbreviation} onChange={(e) => setParameter({ ...parameter, abbreviation: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="family">Famille Paramètre</label>
                    <Dropdown
                        value={selectedFamilleParamètre}
                        onChange={(e) => setSelectedFamilleParamètre(e.value)}
                        options={familleParamètre}
                        optionLabel="name"
                        placeholder="Sélectionner Famille Paramètre"
                        filter
                        multiple
                    />
                </div>
            </Dialog>
        </div>
    );
}

export default List;
