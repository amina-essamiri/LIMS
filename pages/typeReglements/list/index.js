import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated Payment Type Service
const PaymentTypeService = {
    getPaymentTypes: () => {
        return Promise.resolve([
            { id: 1, name: 'Chèque' },
            { id: 2, name: 'Effets' },
            { id: 3, name: 'Espèces' },
            { id: 4, name: 'Carte' },
            { id: 5, name: 'Virement' },
        ]);
    },
    deletePaymentType: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [paymentType, setPaymentType] = useState({ id: null, name: '' });
    const [paymentTypeDialog, setPaymentTypeDialog] = useState(false);
    const [deletePaymentTypeDialog, setDeletePaymentTypeDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        PaymentTypeService.getPaymentTypes()
            .then((data) => {
                setPaymentTypes(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des types de règlements' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const paymentTypeTemplate = (rowData) => (
        <span><i className="pi pi-sitemap" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );

    const openNewPaymentTypeDialog = () => {
        setPaymentType({ id: null, name: '' });
        setPaymentTypeDialog(true);
    };

    const openEditPaymentTypeDialog = (paymentType) => {
        setPaymentType(paymentType); // Prefill the dialog with payment type data for editing
        setPaymentTypeDialog(true);
    };

    const hideDialog = () => {
        setPaymentTypeDialog(false);
    };

const deletePaymentType = () => {
    setPaymentTypes(paymentTypes.filter(pt => pt.id !== paymentType.id));
    setDeletePaymentTypeDialog(false);
    toast.current.show({ 
        severity: 'success', 
        summary: 'Succès', 
        detail: 'Type supprimé', 
        life: 3000 
    });
};


    const confirmDeletePaymentType = (paymentType) => {
        setPaymentType(paymentType);
        setDeletePaymentTypeDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditPaymentTypeDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" className="" onClick={() => confirmDeletePaymentType(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des types" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewPaymentTypeDialog} />
            </div>
        );
    };
    const savePaymentType = () => {
    if (!paymentType.name.trim()) {
        toast.current.show({ 
            severity: 'warn', 
            summary: 'Attention', 
            detail: 'Le nom du type est requis', 
            life: 3000 
        });
        return;
    }

    if (paymentType.id) {
        // Modification
        setPaymentTypes(paymentTypes.map(pt => 
            pt.id === paymentType.id ? { ...pt, name: paymentType.name } : pt
        ));
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Type modifié', 
            life: 3000 
        });
    } else {
        // Création
        const maxId = paymentTypes.length > 0 ? Math.max(...paymentTypes.map(pt => pt.id)) : 0;
        const newPaymentType = { id: maxId + 1, name: paymentType.name };
        setPaymentTypes([...paymentTypes, newPaymentType]);
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Type ajouté', 
            life: 3000 
        });
    }
    setPaymentTypeDialog(false);
    setPaymentType({ id: null, name: '' });
};

const paymentTypeDialogFooter = (
    <>
        <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={savePaymentType} />
    </>
);


    const deletePaymentTypeDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeletePaymentTypeDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deletePaymentType} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-sitemap" /> &nbsp;&nbsp;Liste des types de règlements</span>
            <DataTable
                ref={dt}
                value={paymentTypes}
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} types de règlements"
            >
                <Column field="name" header="Nom du type de règlement" body={paymentTypeTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '85%' }} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>

            <Dialog visible={deletePaymentTypeDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deletePaymentTypeDialogFooter} onHide={() => setDeletePaymentTypeDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {paymentType && <span>Confirmez-vous la suppression de ce type?</span>}
                </div>
            </Dialog>

            <Dialog visible={paymentTypeDialog} style={{ width: '450px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{paymentType.id ? "Modifier le type de règlement" : "Ajouter un type de règlement"}</span>} modal className="p-fluid" footer={paymentTypeDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nom du type de règlement</label>
                    <InputText id="name" value={paymentType.name} onChange={(e) => setPaymentType({ ...paymentType, name: e.target.value })} required autoFocus />
                </div>
            </Dialog>
        </div>
    );
}

export default List;
