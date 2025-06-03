import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated Conclusion Service
const ConclusionService = {
    getConclusions: () => {
        return Promise.resolve([
            { id: 1, name: 'Non satisfaisant' },
            { id: 2, name: 'Acceptable' },
            { id: 3, name: 'Conforme' },
            { id: 4, name: 'Non conforme' },
            { id: 5, name: 'Satisfaisant' },
        ]);
    },
    deleteConclusion: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [conclusions, setConclusions] = useState([]);
    const [conclusion, setConclusion] = useState({ id: null, name: '' });
    const [conclusionDialog, setConclusionDialog] = useState(false);
    const [deleteConclusionDialog, setDeleteConclusionDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        ConclusionService.getConclusions()
            .then((data) => {
                setConclusions(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des conclusions' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const conclusionTemplate = (rowData) => (
        <span><i className="pi pi-copy" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );

    const openNewConclusionDialog = () => {
        setConclusion({ id: null, name: '' });
        setConclusionDialog(true);
    };

    const openEditConclusionDialog = (conclusion) => {
        setConclusion(conclusion); // Prefill the dialog with conclusion data for editing
        setConclusionDialog(true);
    };

    const hideDialog = () => {
        setConclusionDialog(false);
    };


// Corrigez la fonction de suppression
const deleteConclusion = () => {
    setConclusions(conclusions.filter(c => c.id !== conclusion.id));
    setDeleteConclusionDialog(false);
    toast.current.show({ 
        severity: 'success', 
        summary: 'Succès', 
        detail: 'Conclusion supprimée', 
        life: 3000 
    });
};

    const confirmDeleteConclusion = (conclusion) => {
        setConclusion(conclusion);
        setDeleteConclusionDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditConclusionDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" className="" onClick={() => confirmDeleteConclusion(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des conclusions" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewConclusionDialog} />
            </div>
        );
    };
    // Ajoutez cette fonction dans le composant
const saveConclusion = () => {
    if (!conclusion.name.trim()) {
        toast.current.show({ 
            severity: 'warn', 
            summary: 'Attention', 
            detail: 'Le nom de la conclusion est requis', 
            life: 3000 
        });
        return;
    }

    if (conclusion.id) {
        // Modification
        setConclusions(conclusions.map(c => 
            c.id === conclusion.id ? { ...c, name: conclusion.name } : c
        ));
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Conclusion modifiée', 
            life: 3000 
        });
    } else {
        // Création
        const maxId = conclusions.length > 0 ? Math.max(...conclusions.map(c => c.id)) : 0;
        const newConclusion = { id: maxId + 1, name: conclusion.name };
        setConclusions([...conclusions, newConclusion]);
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Conclusion ajoutée', 
            life: 3000 
        });
    }
    setConclusionDialog(false);
    setConclusion({ id: null, name: '' });
};

// Modifiez le footer du dialog
const conclusionDialogFooter = (
    <>
        <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveConclusion} />
    </>
);

    const deleteConclusionDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteConclusionDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteConclusion} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-copy" /> &nbsp;&nbsp;Liste des conclusions</span>
            <DataTable
                ref={dt}
                value={conclusions}
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} conclusions"
            >
                <Column field="name" header="Nom de la conclusion" body={conclusionTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '85%' }} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>

            <Dialog visible={deleteConclusionDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteConclusionDialogFooter} onHide={() => setDeleteConclusionDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {conclusion && <span>Confirmez-vous la suppression de cette conclusion ?</span>}
                </div>
            </Dialog>

            <Dialog visible={conclusionDialog} style={{ width: '450px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{conclusion.id ? "Modifier la conclusion" : "Ajouter une conclusion"}</span>} modal className="p-fluid" footer={conclusionDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nom de la conclusion</label>
                    <InputText id="name" value={conclusion.name} onChange={(e) => setConclusion({ ...conclusion, name: e.target.value })} required autoFocus />
                </div>
            </Dialog>
        </div>
    );
}

export default List;
