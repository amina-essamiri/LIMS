import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated Moment de Prelevement Service
const MomentPrelevementService = {
    getMoments: () => {
        return Promise.resolve([
            { id: 1, name: 'Après la production' },
            { id: 2, name: 'Après le nettoyage' },
            { id: 3, name: 'Après le nettoyage et désinfection' },
            { id: 4, name: 'Pendant la production' },
        ]);
    },
    deleteMoment: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [moments, setMoments] = useState([]);
    const [moment, setMoment] = useState({ id: null, name: '' });
    const [momentDialog, setMomentDialog] = useState(false);
    const [deleteMomentDialog, setDeleteMomentDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        MomentPrelevementService.getMoments()
            .then((data) => {
                setMoments(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des moments de prélèvement' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const momentTemplate = (rowData) => (
        <span><i className="pi pi-clock" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );

    const openNewMomentDialog = () => {
        setMoment({ id: null, name: '' });
        setMomentDialog(true);
    };

    const openEditMomentDialog = (moment) => {
        setMoment(moment); // Prefill the dialog with moment data for editing
        setMomentDialog(true);
    };

    const hideDialog = () => {
        setMomentDialog(false);
    };
const deleteMoment = () => {
    setMoments(moments.filter(m => m.id !== moment.id));
    setDeleteMomentDialog(false);
    toast.current.show({
        severity: 'success',
        summary: 'Succès',
        detail: 'Moment de prélèvement supprimé',
        life: 3000
    });
};


    const confirmDeleteMoment = (moment) => {
        setMoment(moment);
        setDeleteMomentDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditMomentDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" className="" onClick={() => confirmDeleteMoment(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des moments" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewMomentDialog} />
            </div>
        );
    };
    const saveMoment = () => {
    if (!moment.name.trim()) {
        toast.current.show({
            severity: 'warn',
            summary: 'Attention',
            detail: 'Le nom du moment est requis',
            life: 3000
        });
        return;
    }

    if (moment.id) {
        // Modification
        setMoments(moments.map(m => 
            m.id === moment.id ? { ...m, name: moment.name } : m
        ));
        toast.current.show({
            severity: 'success',
            summary: 'Succès',
            detail: 'Moment modifié',
            life: 3000
        });
    } else {
        // Création
        const maxId = moments.length > 0 ? Math.max(...moments.map(m => m.id)) : 0;
        const newMoment = { id: maxId + 1, name: moment.name };
        setMoments([...moments, newMoment]);
        toast.current.show({
            severity: 'success',
            summary: 'Succès',
            detail: 'Moment ajouté',
            life: 3000
        });
    }
    setMomentDialog(false);
    setMoment({ id: null, name: '' });
};


const momentDialogFooter = (
    <>
        <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveMoment} />
    </>
);


    const deleteMomentDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteMomentDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteMoment} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-clock" /> &nbsp;&nbsp;Liste des moments de prélèvement</span>
            <DataTable
                ref={dt}
                value={moments}
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} moments"
            >
                <Column field="name" header="Nom du moment de prélèvement" body={momentTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '85%' }} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>

            <Dialog visible={deleteMomentDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteMomentDialogFooter} onHide={() => setDeleteMomentDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {moment && <span>Confirmez-vous la suppression de ce moment?</span>}
                </div>
            </Dialog>

            <Dialog visible={momentDialog} style={{ width: '450px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{moment.id ? "Modifier le moment de prélèvement" : "Ajouter un moment de prélèvement"}</span>} modal className="p-fluid" footer={momentDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nom du moment</label>
                    <InputText id="name" value={moment.name} onChange={(e) => setMoment({ ...moment, name: e.target.value })} required autoFocus />
                </div>
            </Dialog>
        </div>
    );
}

export default List;