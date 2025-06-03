import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated Validité Devis Service
const ValiditeDevisService = {
    getValidites: () => {
        return Promise.resolve([
            { id: 1, months: 12 },
            { id: 2, months: 9 },
            { id: 3, months: 6 },
            { id: 4, months: 3 },
        ]);
    },
    deleteValidite: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [validites, setValidites] = useState([]);
    const [validite, setValidite] = useState({ id: null, months: 3 });
    const [validiteDialog, setValiditeDialog] = useState(false);
    const [deleteValiditeDialog, setDeleteValiditeDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        ValiditeDevisService.getValidites()
            .then((data) => {
                setValidites(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des périodes de validité' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const validiteTemplate = (rowData) => (
        <span><i className="pi pi-calendar" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.months} Mois</span>
    );

    const openNewValiditeDialog = () => {
        setValidite({ id: null, months: 3 }); // Start at 3 months by default
        setValiditeDialog(true);
    };

    const openEditValiditeDialog = (validite) => {
        setValidite(validite); // Prefill the dialog with the validite data for editing
        setValiditeDialog(true);
    };

    const hideDialog = () => {
        setValiditeDialog(false);
    };

// Corrigez la fonction de suppression
const deleteValidite = () => {
    setValidites(validites.filter(v => v.id !== validite.id));
    setDeleteValiditeDialog(false);
    toast.current.show({ 
        severity: 'success', 
        summary: 'Succès', 
        detail: 'Période supprimée', 
        life: 3000 
    });
};

    const confirmDeleteValidite = (validite) => {
        setValidite(validite);
        setDeleteValiditeDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditValiditeDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" className="" onClick={() => confirmDeleteValidite(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des périodes" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewValiditeDialog} />
            </div>
        );
    };
    // Ajoutez cette fonction dans le composant
const saveValidite = () => {
    const monthsValue = parseInt(validite.months);
    
    if (isNaN(monthsValue) || monthsValue < 1) {
        toast.current.show({ 
            severity: 'warn', 
            summary: 'Attention', 
            detail: 'La période doit être existante', 
            life: 3000 
        });
        return;
    }

    if (validite.id) {
        // Modification
        setValidites(validites.map(v => 
            v.id === validite.id ? { ...v, months: monthsValue } : v
        ));
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Période modifiée', 
            life: 3000 
        });
    } else {
        // Création
        const maxId = validites.length > 0 ? Math.max(...validites.map(v => v.id)) : 0;
        const newValidite = { id: maxId + 1, months: monthsValue };
        setValidites([...validites, newValidite]);
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Période ajoutée', 
            life: 3000 
        });
    }
    setValiditeDialog(false);
    setValidite({ id: null, months: 3 });
};

    // Modifiez le footer du dialog
const validiteDialogFooter = (
    <>
        <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveValidite} />
    </>
);

    const deleteValiditeDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteValiditeDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteValidite} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-calendar" /> &nbsp;&nbsp;Liste des périodes de validité</span>
            <DataTable
                ref={dt}
                value={validites}
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} périodes"
            >
                <Column field="months" header="Période de validité" body={validiteTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '85%' }} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible'}} />
            </DataTable>

            <Dialog visible={deleteValiditeDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteValiditeDialogFooter} onHide={() => setDeleteValiditeDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {validite && <span>Confirmez-vous la suppression de cette période ?</span>}
                </div>
            </Dialog>

            <Dialog visible={validiteDialog}
            style={{ width: '450px' }} 
            header={
                <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                    {validite.id ? "Modifier la période de validité" : "Créer une nouvelle période de validité"}
                </span>
              }
             modal className="p-fluid" footer={validiteDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="months">Période de validité (Mois)</label>
                    <InputText 
                        id="months" 
                        value={validite.months} 
                        onChange={(e) => setValidite({ ...validite, months: e.target.value })}
                        required 
                        autoFocus
                        type="number"
                        min="1" 
                    />
                    {/* <br />
                    <p className='mt-3'> Mois</p> */}
                </div>
            </Dialog>
        </div>
    );
}

export default List;
