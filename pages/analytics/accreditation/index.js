import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated Accreditation Service
const AccreditationService = {
    getAccreditations: () => {
        return Promise.resolve([
            { id: 1, name: 'Non Accrédité' },
            { id: 2, name: 'Sous-traité' },
            { id: 3, name: 'Reconnu' },
            { id: 4, name: 'Accrédité' },
            { id: 5, name: 'Reconnu/Accrédité' },
            { id: 6, name: 'Agréé/Accrédité' },
        ]);
    },
    deleteAccreditation: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [accreditations, setAccreditations] = useState([]);
    const [accreditation, setAccreditation] = useState({ id: null, name: '' });
    const [accreditationDialog, setAccreditationDialog] = useState(false);
    const [deleteAccreditationDialog, setDeleteAccreditationDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        AccreditationService.getAccreditations()
            .then((data) => {
                setAccreditations(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des accréditations' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const accreditationTemplate = (rowData) => (
        <span><i className="pi pi-verified" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );

    const openNewAccreditationDialog = () => {
        setAccreditation({ id: null, name: '' });
        setAccreditationDialog(true);
    };

    const openEditAccreditationDialog = (accreditation) => {
        setAccreditation(accreditation); // Prefill the dialog with accreditation data for editing
        setAccreditationDialog(true);
    };

    const hideDialog = () => {
        setAccreditationDialog(false);
    };
// Corrigez la fonction de suppression
const deleteAccreditation = () => {
    setAccreditations(accreditations.filter(a => a.id !== accreditation.id));
    setDeleteAccreditationDialog(false);
    toast.current.show({ 
        severity: 'success', 
        summary: 'Succès', 
        detail: 'Accréditation supprimée', 
        life: 3000 
    });
};
    const confirmDeleteAccreditation = (accreditation) => {
        setAccreditation(accreditation);
        setDeleteAccreditationDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditAccreditationDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" className="" onClick={() => confirmDeleteAccreditation(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des accréditations" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewAccreditationDialog} />
            </div>
        );
    };
    // Ajoutez cette fonction dans le composant
const saveAccreditation = () => {
    if (!accreditation.name.trim()) {
        toast.current.show({ 
            severity: 'warn', 
            summary: 'Attention', 
            detail: 'Le nom de l\'accréditation est requis', 
            life: 3000 
        });
        return;
    }

    if (accreditation.id) {
        // Modification
        setAccreditations(accreditations.map(a => 
            a.id === accreditation.id ? { ...a, name: accreditation.name } : a
        ));
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Accréditation modifiée', 
            life: 3000 
        });
    } else {
        // Création
        const maxId = accreditations.length > 0 ? Math.max(...accreditations.map(a => a.id)) : 0;
        const newAccreditation = { id: maxId + 1, name: accreditation.name };
        setAccreditations([...accreditations, newAccreditation]);
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Accréditation ajoutée', 
            life: 3000 
        });
    }
    setAccreditationDialog(false);
    setAccreditation({ id: null, name: '' });
};
// Modifiez le footer du dialog
const accreditationDialogFooter = (
    <>
        <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveAccreditation} />
    </>
);

    const deleteAccreditationDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteAccreditationDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteAccreditation} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-verified" /> &nbsp;&nbsp;Liste des accréditations</span>
            <DataTable
                ref={dt}
                value={accreditations}
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} accréditations"
            >
                <Column field="name" header="Nom de l'accréditation" body={accreditationTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '85%' }} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>

            <Dialog visible={deleteAccreditationDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteAccreditationDialogFooter} onHide={() => setDeleteAccreditationDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {accreditation && <span>Confirmez-vous la suppression de cette accréditation ?</span>}
                </div>
            </Dialog>

            <Dialog visible={accreditationDialog} style={{ width: '450px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{accreditation.id ? "Modifier l'accréditation" : "Ajouter une accréditation"}</span>} modal className="p-fluid" footer={accreditationDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nom de l&apos;accréditation</label>
                    <InputText id="name" value={accreditation.name} onChange={(e) => setAccreditation({ ...accreditation, name: e.target.value })} required autoFocus />
                </div>
            </Dialog>
        </div>
    );
}

export default List;
