import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated Department Service
const DepartmentService = {
    getDepartments: () => {
        return Promise.resolve([
            { id: 1, name: 'Biologie' },
            { id: 2, name: 'Chimie' },
            { id: 3, name: 'Microbiologie' },
            { id: 4, name: 'Physique' },
            { id: 5, name: 'Laboratoire de contrôle' },
            { id: 6, name: 'Informatique' },
            { id: 7, name: 'Méthodes analytiques' },
        ]);
    },
    deleteDepartment: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState({ id: null, name: '' });
    const [departmentDialog, setDepartmentDialog] = useState(false);
    const [deleteDepartmentDialog, setDeleteDepartmentDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        DepartmentService.getDepartments()
            .then((data) => {
                setDepartments(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des départements' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const departmentTemplate = (rowData) => (
        <span><i className="pi pi-window-minimize" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );

    const openNewDepartmentDialog = () => {
        setDepartment({ id: null, name: '' });
        setDepartmentDialog(true);
    };

    const openEditDepartmentDialog = (department) => {
        setDepartment(department); // Prefill the dialog with department data for editing
        setDepartmentDialog(true);
    };

    const hideDialog = () => {
        setDepartmentDialog(false);
    };

    const deleteDepartment = () => {
        setDeleteDepartmentDialog(false);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Département supprimé', life: 3000 });
    };

    const confirmDeleteDepartment = (department) => {
        setDepartment(department);
        setDeleteDepartmentDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditDepartmentDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" className="" onClick={() => confirmDeleteDepartment(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des départements" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewDepartmentDialog} />
            </div>
        );
    };

    const departmentDialogFooter = (
        <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" />
        </>
    );

    const deleteDepartmentDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteDepartmentDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteDepartment} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-window-minimize" /> &nbsp;&nbsp;Liste des départements</span>
            <DataTable
                ref={dt}
                value={departments}
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} départements"
            >
                <Column field="name" header="Nom du département" body={departmentTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '85%' }} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>

            <Dialog visible={deleteDepartmentDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteDepartmentDialogFooter} onHide={() => setDeleteDepartmentDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {department && <span>Confirmez-vous la suppression de ce département ?</span>}
                </div>
            </Dialog>

            <Dialog visible={departmentDialog} style={{ width: '450px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{department.id ? "Modifier le département" : "Ajouter un département"}</span>} modal className="p-fluid" footer={departmentDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nom du département</label>
                    <InputText id="name" value={department.name} onChange={(e) => setDepartment({ ...department, name: e.target.value })} required autoFocus />
                </div>
            </Dialog>
        </div>
    );
}

export default List;
