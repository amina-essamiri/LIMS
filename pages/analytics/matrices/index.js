import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated Matrix Service
const MatrixService = {
    getMatrices: () => {
        return Promise.resolve([
            { id: 1, name: 'Eau' },
            { id: 2, name: 'Air' },
            { id: 3, name: 'Surface' },
            { id: 4, name: 'Aliments' },
            { id: 5, name: 'Entiséptiques et désinféctants' },
            { id: 6, name: 'Cosmétiques' },
            { id: 7, name: 'Sols et sédiments' },
        ]);
    },
    deleteMatrix: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [matrices, setMatrices] = useState([]);
    const [matrix, setMatrix] = useState({ id: null, name: '' });
    const [matrixDialog, setMatrixDialog] = useState(false);
    const [deleteMatrixDialog, setDeleteMatrixDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        MatrixService.getMatrices()
            .then((data) => {
                setMatrices(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des matrices' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const matrixTemplate = (rowData) => (
        <span><i className="pi pi-qrcode" style={{ color: 'var(--primary-color)' }} />&nbsp;&nbsp;{rowData.name}</span>
    );

    const openNewMatrixDialog = () => {
        setMatrix({ id: null, name: '' });
        setMatrixDialog(true);
    };

    const openEditMatrixDialog = (matrix) => {
        setMatrix(matrix); // Prefill the dialog with matrix data for editing
        setMatrixDialog(true);
    };

    const hideDialog = () => {
        setMatrixDialog(false);
    };

    const deleteMatrix = () => {
        setDeleteMatrixDialog(false);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Matrice supprimée', life: 3000 });
    };

    const confirmDeleteMatrix = (matrix) => {
        setMatrix(matrix);
        setDeleteMatrixDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditMatrixDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" className="" onClick={() => confirmDeleteMatrix(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des matrices" className="w-full" />
                </span>
                <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={openNewMatrixDialog} />
            </div>
        );
    };

    const matrixDialogFooter = (
        <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" />
        </>
    );

    const deleteMatrixDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteMatrixDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteMatrix} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-qrcode" /> &nbsp;&nbsp;Liste des matrices</span>
            <DataTable
                ref={dt}
                value={matrices}
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} matrices"
            >
                <Column field="name" header="Nom de matrice" body={matrixTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '85%' }} sortable />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>

            <Dialog visible={deleteMatrixDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteMatrixDialogFooter} onHide={() => setDeleteMatrixDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {matrix && <span>Confirmez-vous la suppression de cette matrice ?</span>}
                </div>
            </Dialog>

            <Dialog visible={matrixDialog} style={{ width: '450px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{matrix.id ? "Modifier la matrice" : "Ajouter une matrice"}</span>} modal className="p-fluid" footer={matrixDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nom de la matrice</label>
                    <InputText id="name" value={matrix.name} onChange={(e) => setMatrix({ ...matrix, name: e.target.value })} required autoFocus />
                </div>
            </Dialog>
        </div>
    );
}

export default List;
