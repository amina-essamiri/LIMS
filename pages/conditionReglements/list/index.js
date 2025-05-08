import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated ConditionReglement Service
const ConditionReglementService = {
    getConditions: () => {
        return Promise.resolve([
            { id: 1, name: 'Paiement à la livraison' },
            { id: 2, name: 'Paiement à 60 jours' },
            { id: 3, name: 'Paiement en plusieurs fois' },
            { id: 4, name: 'Paiement par virement bancaire' },
            { id: 5, name: 'Paiement par chèque' },
            { id: 6, name: 'Paiement via PayPal' },
            { id: 7, name: 'Paiement à la réception de facture' },
            { id: 8, name: 'Paiement à la commande' },
            { id: 9, name: 'Paiement à 30 jours' },
        ]);
    },
    deleteCondition: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [conditions, setConditions] = useState([]);
    const [condition, setCondition] = useState({ id: null, name: '' });
    const [conditionDialog, setConditionDialog] = useState(false);
    const [deleteConditionDialog, setDeleteConditionDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        ConditionReglementService.getConditions()
            .then((data) => {
                setConditions(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des conditions de règlement' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const conditionTemplate = (rowData) => (
        <span><i className="pi pi-money-bill" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );

    const openNewConditionDialog = () => {
        setCondition({ id: null, name: '' });
        setConditionDialog(true);
    };

    const openEditConditionDialog = (condition) => {
        setCondition(condition); // Prefill the dialog with condition data for editing
        setConditionDialog(true);
    };

    const hideDialog = () => {
        setConditionDialog(false);
    };

    const deleteCondition = () => {
        setDeleteConditionDialog(false);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Condition de règlement supprimée', life: 3000 });
    };

    const confirmDeleteCondition = (condition) => {
        setCondition(condition);
        setDeleteConditionDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditConditionDialog(rowData)}  />
            <Button icon="pi pi-trash"  rounded text severity="danger"  className="" onClick={() => confirmDeleteCondition(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des conditions" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter"  tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewConditionDialog} />
            </div>
        );
    };

    const conditionDialogFooter = (
        <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" />
        </>
    );

    const deleteConditionDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteConditionDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteCondition} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-money-bill" /> &nbsp;&nbsp;Liste des conditions de règlement</span>
            <DataTable
                ref={dt}
                value={conditions}
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} conditions"
            >
                <Column field="name" header="Nom de condition" body={conditionTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '85%' }} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible'}} />
            </DataTable>

            <Dialog visible={deleteConditionDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteConditionDialogFooter} onHide={() => setDeleteConditionDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {condition && <span>Confirmez-vous la suppression de cette condition ?</span>}
                </div>
            </Dialog>

            <Dialog visible={conditionDialog}
            style={{ width: '450px' }} 
            header={
                <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                    {condition.id ? "Modifier la condition de règlement" : "Ajouter une condition de règlement"}
                </span>
              }
            modal className="p-fluid" footer={conditionDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nom de la condition</label>
                    <InputText id="name" value={condition.name} onChange={(e) => setCondition({ ...condition, name: e.target.value })} required autoFocus />
                </div>
            </Dialog>
        </div>
    );
}

export default List;
