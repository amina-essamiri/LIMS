import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated Groupe d'Analyse Service
const AnalyseService = {
    getGroupes: () => {
        return Promise.resolve([
            { id: 1, name: 'Physico-chimie' },
            { id: 2, name: 'Parasitologie' },
            { id: 3, name: 'Organoleptique' },
            { id: 4, name: 'Biologie' },
            { id: 5, name: 'Microbiologie' },
        ]);
    },
    deleteGroupe: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [groupes, setGroupes] = useState([]);
    const [groupe, setGroupe] = useState({ id: null, name: '' });
    const [groupeDialog, setGroupeDialog] = useState(false);
    const [deleteGroupeDialog, setDeleteGroupeDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        AnalyseService.getGroupes()
            .then((data) => {
                setGroupes(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des groupes d\'analyse' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const groupeTemplate = (rowData) => (
        <span><i className="pi pi-table" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );

    const openNewGroupeDialog = () => {
        setGroupe({ id: null, name: '' });
        setGroupeDialog(true);
    };

    const openEditGroupeDialog = (groupe) => {
        setGroupe(groupe); // Prefill the dialog with groupe data for editing
        setGroupeDialog(true);
    };

    const hideDialog = () => {
        setGroupeDialog(false);
    };
// Corrigez la fonction de suppression
const deleteGroupe = () => {
    setGroupes(groupes.filter(g => g.id !== groupe.id));
    setDeleteGroupeDialog(false);
    toast.current.show({ 
        severity: 'success', 
        summary: 'Succès', 
        detail: 'Groupe supprimé', 
        life: 3000 
    });
};

    const confirmDeleteGroupe = (groupe) => {
        setGroupe(groupe);
        setDeleteGroupeDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditGroupeDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" className="" onClick={() => confirmDeleteGroupe(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des groupes" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewGroupeDialog} />
            </div>
        );
    };
    // Ajoutez cette fonction dans le composant
const saveGroupe = () => {
    if (!groupe.name.trim()) {
        toast.current.show({ 
            severity: 'warn', 
            summary: 'Attention', 
            detail: 'Le nom du groupe est requis', 
            life: 3000 
        });
        return;
    }

    if (groupe.id) {
        // Modification
        setGroupes(groupes.map(g => 
            g.id === groupe.id ? { ...g, name: groupe.name } : g
        ));
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Groupe modifié', 
            life: 3000 
        });
    } else {
        // Création
        const maxId = groupes.length > 0 ? Math.max(...groupes.map(g => g.id)) : 0;
        const newGroupe = { id: maxId + 1, name: groupe.name };
        setGroupes([...groupes, newGroupe]);
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Groupe ajouté', 
            life: 3000 
        });
    }
    setGroupeDialog(false);
    setGroupe({ id: null, name: '' });
};

    // Modifiez le footer du dialog
const groupeDialogFooter = (
    <>
        <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveGroupe} />
    </>
);

    const deleteGroupeDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteGroupeDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteGroupe} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-table" /> &nbsp;&nbsp;Liste des groupes d&apos;analyse</span>
            <DataTable
                ref={dt}
                value={groupes}
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} groupes"
            >
                <Column field="name" header="Nom du groupe" body={groupeTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '85%' }} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>

            <Dialog visible={deleteGroupeDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteGroupeDialogFooter} onHide={() => setDeleteGroupeDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {groupe && <span>Confirmez-vous la suppression de ce groupe?</span>}
                </div>
            </Dialog>

            <Dialog visible={groupeDialog} style={{ width: '450px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{groupe.id ? "Modifier le groupe d'analyse" : "Ajouter un groupe d'analyse"}</span>} modal className="p-fluid" footer={groupeDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nom du groupe</label>
                    <InputText id="name" value={groupe.name} onChange={(e) => setGroupe({ ...groupe, name: e.target.value })} required autoFocus />
                </div>
            </Dialog>
        </div>
    );
}

export default List;
