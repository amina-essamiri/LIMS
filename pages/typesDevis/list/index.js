import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated TypeDevis Service
const TypeDevisService = {
    getTypes: () => {
        return Promise.resolve([
            { id: 1, name: 'Paramètre lié au réglementation' },
            { id: 2, name: 'Paramètres libres' },
            { id: 3, name: 'Pack instantané' },
            { id: 4, name: 'Pack' },
            { id: 5, name: 'Forfait' },
        ]);
    },
    deleteType: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [typesDevis, setTypesDevis] = useState([]);
    const [typeDevis, setTypeDevis] = useState({ id: null, name: '' });
    const [typeDevisDialog, setTypeDevisDialog] = useState(false);
    const [deleteTypeDevisDialog, setDeleteTypeDevisDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        TypeDevisService.getTypes()
            .then((data) => {
                setTypesDevis(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des types de devis' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const typeDevisTemplate = (rowData) => (
        <span><i className="pi pi-credit-card" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );

    const openNewTypeDevisDialog = () => {
        setTypeDevis({ id: null, name: '' });
        setTypeDevisDialog(true);
    };

    const openEditTypeDevisDialog = (typeDevis) => {
        setTypeDevis(typeDevis); // Prefill the dialog with the typeDevis data for editing
        setTypeDevisDialog(true);
    };

    const hideDialog = () => {
        setTypeDevisDialog(false);
    };

    const deleteTypeDevis = () => {
        setDeleteTypeDevisDialog(false);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Type de devis supprimé', life: 3000 });
    };

    const confirmDeleteTypeDevis = (typeDevis) => {
        setTypeDevis(typeDevis);
        setDeleteTypeDevisDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditTypeDevisDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" className="" onClick={() => confirmDeleteTypeDevis(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des types" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewTypeDevisDialog} />
            </div>
        );
    };

    const typeDevisDialogFooter = (
        <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" />
        </>
    );

    const deleteTypeDevisDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteTypeDevisDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteTypeDevis} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-credit-card" /> &nbsp;&nbsp;Liste des types de devis</span>
            <DataTable
                ref={dt}
                value={typesDevis}
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} types"
            >
                <Column field="name" header="Type de devis" body={typeDevisTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '85%' }} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible'}} />
            </DataTable>

            <Dialog visible={deleteTypeDevisDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteTypeDevisDialogFooter} onHide={() => setDeleteTypeDevisDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {typeDevis && <span>Confirmez-vous la suppression de ce type devis?</span>}
                </div>
            </Dialog>

            <Dialog visible={typeDevisDialog}
            style={{ width: '450px' }} 
            header={
                <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                    {typeDevis.id ? "Modifier le type de devis" : "Créer un nouveau type de devis"}
                </span>
              }
             modal className="p-fluid" footer={typeDevisDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Type de devis</label>
                    <InputText 
                        id="name" 
                        value={typeDevis.name} 
                        onChange={(e) => setTypeDevis({ ...typeDevis, name: e.target.value })}
                        required 
                        autoFocus
                    />
                </div>
            </Dialog>
        </div>
    );
}

export default List;
