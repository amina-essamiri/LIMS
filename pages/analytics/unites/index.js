import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated Unit Service
const UnitService = {
    getUnits: () => {
        return Promise.resolve([
            { id: 1, name: '%' },
            { id: 2, name: '°' },
            { id: 3, name: 'B°' },
            { id: 4, name: 'Bq/L' },
            { id: 5, name: 'C°' },
            { id: 6, name: 'f°' },
            { id: 7, name: 'g' },
            { id: 8, name: 'g/100g' },
            { id: 9, name: 'g/100g de MB' },
            { id: 10, name: 'g/100g de MS' },
            { id: 11, name: 'g/100mL' },
            { id: 12, name: 'meq d\'O2/kg' },
            { id: 13, name: 'Larves/L' },
            { id: 14, name: 'kJ/100g' },
            { id: 15, name: 'kcal/100g' },
            { id: 16, name: 'g/kg' },
            { id: 17, name: 'g/100mL' },
            { id: 18, name: 'g/100mL' },
        ]);
    },
    deleteUnit: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [units, setUnits] = useState([]);
    const [unit, setUnit] = useState({ id: null, name: '' });
    const [unitDialog, setUnitDialog] = useState(false);
    const [deleteUnitDialog, setDeleteUnitDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        UnitService.getUnits()
            .then((data) => {
                setUnits(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des unités' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const unitTemplate = (rowData) => (
        <span><i className="pi pi-bookmark" style={{ color: 'var(--primary-color)' }} />&nbsp; &nbsp;{rowData.name}</span>
    );

    const openNewUnitDialog = () => {
        setUnit({ id: null, name: '' });
        setUnitDialog(true);
    };

    const openEditUnitDialog = (unit) => {
        setUnit(unit); // Prefill the dialog with unit data for editing
        setUnitDialog(true);
    };

    const hideDialog = () => {
        setUnitDialog(false);
    };

    const deleteUnit = () => {
        setDeleteUnitDialog(false);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Unité supprimée', life: 3000 });
    };

    const confirmDeleteUnit = (unit) => {
        setUnit(unit);
        setDeleteUnitDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditUnitDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" className="" onClick={() => confirmDeleteUnit(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des unités" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewUnitDialog} />
            </div>
        );
    };

    const unitDialogFooter = (
        <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" />
        </>
    );

    const deleteUnitDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteUnitDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteUnit} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-bookmark" /> &nbsp;&nbsp;Liste des unités</span>
            <DataTable
                ref={dt}
                value={units}
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} unités"
            >
                <Column field="name" header="Nom de l'unité" body={unitTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '85%' }} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>

            <Dialog visible={deleteUnitDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteUnitDialogFooter} onHide={() => setDeleteUnitDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {unit && <span>Confirmez-vous la suppression de cette unité ?</span>}
                </div>
            </Dialog>

            <Dialog visible={unitDialog} style={{ width: '450px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{unit.id ? "Modifier l'unité" : "Ajouter une unité"}</span>} modal className="p-fluid" footer={unitDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nom de l&apos;unité</label>
                    <InputText id="name" value={unit.name} onChange={(e) => setUnit({ ...unit, name: e.target.value })} required autoFocus />
                </div>
            </Dialog>
        </div>
    );
}

export default List;
