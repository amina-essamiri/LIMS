import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated Lieu de Prelevement Service
const LieuPrelevementService = {
    getLieus: () => {
        return Promise.resolve([
            { id: 1, name: 'Zone de production / vanne sortie de l\'osmoseur' },
            { id: 2, name: 'Zone de production' },
            { id: 3, name: 'Robinet salle de cuisson' },
            { id: 4, name: 'Robinet à l\'entrée d\'usine' },
            { id: 5, name: 'Départ de boucle d\'alimentation du générateur' },
            { id: 6, name: 'Laboratoire II' },
            { id: 7, name: '1ère Robinet d\'écloserie' },
            { id: 8, name: 'Robinet salle de production unité arôme alimentaire poudre' },
            { id: 9, name: 'Robinet salle de production unité arôme alimentaire liquide' },
            { id: 10, name: 'Zone de production RCP' },
            { id: 11, name: 'zone de production RCP' },
            { id: 12, name: 'sterifood 2/Salle de production' },
            { id: 13, name: 'sterifood 2/salle MP' },
            { id: 14, name: 'ligne D /Production' },
        ]);
    },
    deleteLieu: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [lieus, setLieus] = useState([]);
    const [lieu, setLieu] = useState({ id: null, name: '' });
    const [lieuDialog, setLieuDialog] = useState(false);
    const [deleteLieuDialog, setDeleteLieuDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        LieuPrelevementService.getLieus()
            .then((data) => {
                setLieus(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des lieux de prélèvement' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const lieuTemplate = (rowData) => (
        <span><i className="pi pi-map-marker" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );

    const openNewLieuDialog = () => {
        setLieu({ id: null, name: '' });
        setLieuDialog(true);
    };

    const openEditLieuDialog = (lieu) => {
        setLieu(lieu); // Prefill the dialog with lieu data for editing
        setLieuDialog(true);
    };

    const hideDialog = () => {
        setLieuDialog(false);
    };

// Corrigez la fonction de suppression
const deleteLieu = () => {
    setLieus(lieus.filter(l => l.id !== lieu.id));
    setDeleteLieuDialog(false);
    toast.current.show({ 
        severity: 'success', 
        summary: 'Succès', 
        detail: 'Lieu supprimé', 
        life: 3000 
    });
};

    const confirmDeleteLieu = (lieu) => {
        setLieu(lieu);
        setDeleteLieuDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditLieuDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" className="" onClick={() => confirmDeleteLieu(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des lieux" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewLieuDialog} />
            </div>
        );
    };// Ajoutez cette fonction dans le composant
const saveLieu = () => {
    if (!lieu.name.trim()) {
        toast.current.show({ 
            severity: 'warn', 
            summary: 'Attention', 
            detail: 'Le nom du lieu est requis', 
            life: 3000 
        });
        return;
    }

    if (lieu.id) {
        // Modification
        setLieus(lieus.map(l => 
            l.id === lieu.id ? { ...l, name: lieu.name } : l
        ));
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Lieu modifié', 
            life: 3000 
        });
    } else {
        // Création
        const maxId = lieus.length > 0 ? Math.max(...lieus.map(l => l.id)) : 0;
        const newLieu = { id: maxId + 1, name: lieu.name };
        setLieus([...lieus, newLieu]);
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Lieu ajouté', 
            life: 3000 
        });
    }
    setLieuDialog(false);
    setLieu({ id: null, name: '' });
};


// Modifiez le footer du dialog
const lieuDialogFooter = (
    <>
        <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveLieu} />
    </>
);

    const deleteLieuDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteLieuDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteLieu} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-map-marker" /> &nbsp;&nbsp;Liste des lieux de prélèvement</span>
            <DataTable
                ref={dt}
                value={lieus}
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} lieux"
            >
                <Column field="name" header="Nom du lieu de prélèvement" body={lieuTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '85%' }} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>

            <Dialog visible={deleteLieuDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteLieuDialogFooter} onHide={() => setDeleteLieuDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {lieu && <span>Confirmez-vous la suppression de ce lieu?</span>}
                </div>
            </Dialog>

            <Dialog visible={lieuDialog} style={{ width: '450px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{lieu.id ? "Modifier le lieu de prélèvement" : "Ajouter un lieu de prélèvement"}</span>} modal className="p-fluid" footer={lieuDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nom du lieu</label>
                    <InputText id="name" value={lieu.name} onChange={(e) => setLieu({ ...lieu, name: e.target.value })} required autoFocus />
                </div>
            </Dialog>
        </div>
    );
}

export default List;
