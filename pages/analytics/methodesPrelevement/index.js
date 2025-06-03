import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated Prelevement Method Service
const PrelevementService = {
    getMethods: () => {
        return Promise.resolve([
            { id: 1, name: 'Sédimentation' },
            { id: 2, name: 'Ponctuel' },
            { id: 3, name: 'Composite de 24h' },
            { id: 4, name: 'Biocollecteur d\'air' },
            { id: 5, name: 'Composite' },
            { id: 6, name: 'NM ISO 18593:2019' },
        ]);
    },
    deleteMethod: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [methods, setMethods] = useState([]);
    const [method, setMethod] = useState({ id: null, name: '' });
    const [methodDialog, setMethodDialog] = useState(false);
    const [deleteMethodDialog, setDeleteMethodDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        PrelevementService.getMethods()
            .then((data) => {
                setMethods(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des méthodes de prélèvement' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const methodTemplate = (rowData) => (
        <span><i className="pi pi-palette" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );

    const openNewMethodDialog = () => {
        setMethod({ id: null, name: '' });
        setMethodDialog(true);
    };

    const openEditMethodDialog = (method) => {
        setMethod(method); // Prefill the dialog with method data for editing
        setMethodDialog(true);
    };

    const hideDialog = () => {
        setMethodDialog(false);
    };

const deleteMethod = () => {
    setMethods(methods.filter(m => m.id !== method.id));
    setDeleteMethodDialog(false);
    toast.current.show({ 
        severity: 'success', 
        summary: 'Succès', 
        detail: 'Méthode de prélèvement supprimée', 
        life: 3000 
    });
};


    const confirmDeleteMethod = (method) => {
        setMethod(method);
        setDeleteMethodDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditMethodDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" className="" onClick={() => confirmDeleteMethod(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des méthodes" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewMethodDialog} />
            </div>
        );
    };
    const saveMethod = () => {
    if (!method.name.trim()) {
        toast.current.show({ 
            severity: 'warn', 
            summary: 'Attention', 
            detail: 'Le nom de la méthode est requis', 
            life: 3000 
        });
        return;
    }

    if (method.id) {
        // Modification
        setMethods(methods.map(m => 
            m.id === method.id ? { ...m, name: method.name } : m
        ));
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Méthode modifiée', 
            life: 3000 
        });
    } else {
        // Création
        const maxId = methods.length > 0 ? Math.max(...methods.map(m => m.id)) : 0;
        const newMethod = { id: maxId + 1, name: method.name };
        setMethods([...methods, newMethod]);
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Méthode ajoutée', 
            life: 3000 
        });
    }
    setMethodDialog(false);
    setMethod({ id: null, name: '' });
};

const methodDialogFooter = (
    <>
        <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveMethod} />
    </>
);


    const deleteMethodDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteMethodDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteMethod} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-palette" /> &nbsp;&nbsp;Liste des méthodes de prélèvement</span>
            <DataTable
                ref={dt}
                value={methods}
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} méthodes"
            >
                <Column field="name" header="Nom de la méthode" body={methodTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '85%' }} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>

            <Dialog visible={deleteMethodDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteMethodDialogFooter} onHide={() => setDeleteMethodDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {method && <span>Confirmez-vous la suppression de cette méthode de prélèvement ?</span>}
                </div>
            </Dialog>

            <Dialog visible={methodDialog} style={{ width: '450px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{method.id ? "Modifier la méthode de prélèvement" : "Ajouter une méthode de prélèvement"}</span>} modal className="p-fluid" footer={methodDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nom de la méthode</label>
                    <InputText id="name" value={method.name} onChange={(e) => setMethod({ ...method, name: e.target.value })} required autoFocus />
                </div>
            </Dialog>
        </div>
    );
}

export default List;
