    import { useRouter } from 'next/router';
    import { FilterMatchMode, FilterOperator } from 'primereact/api';
    import { Button } from 'primereact/button';
    import { Column } from 'primereact/column';
    import { DataTable } from 'primereact/datatable';
    import { InputText } from 'primereact/inputtext';
    import { Dialog } from 'primereact/dialog';
    import { Toast } from 'primereact/toast';
    import React, { useEffect, useRef, useState } from 'react';

    // Simulated data for Postes
    const postesData = [
    { id: 1, name: 'Gestionnaire' },
    { id: 2, name: 'Employé' },
    { id: 3, name: 'Directeur' },
    { id: 4, name: 'Assistant' },
    { id: 5, name: 'Ressources humaines' },
    { id: 6, name: 'Technologies de l\'information' },
    { id: 7, name: 'Finance' },
    { id: 8, name: 'Marketing' },
    ];

    function List() {
        const [postes, setPostes] = useState(postesData); // Initial postes data
        const [poste, setPoste] = useState({ id: null, name: '' });
        const [dialogVisible, setDialogVisible] = useState(false);
        const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
        const [posteToDelete, setPosteToDelete] = useState(null);
        const [filters, setFilters] = useState(null);
        const [globalFilter, setGlobalFilter] = useState('');
        const toast = useRef(null);
        const dt = useRef(null);

    useEffect(() => {
        setFilters({
        global: { value: globalFilter, matchMode: FilterMatchMode.CONTAINS },
        });
    }, [globalFilter]);

    const openNewPosteDialog = () => {
        setPoste({ id: null, name: '' });
        setDialogVisible(true);
    };

    const openEditPosteDialog = (poste) => {
        setPoste(poste);
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const hideDeleteDialog = () => {
        setDeleteDialogVisible(false);
    };

    const deletePoste = () => {
        setPostes(postes.filter((p) => p.id !== posteToDelete.id));
        setDeleteDialogVisible(false);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Poste supprimé', life: 3000 });
    };

    const actionBodyTemplate = (rowData) => (
        <>
        <Button
            icon="pi pi-pencil"
            rounded text severity="success"
            className="mr-2"
            onClick={() => openEditPosteDialog(rowData)}
        />
        <Button
            icon="pi pi-trash"
            rounded text severity="danger"
            className=""
            onClick={() => {
            setPosteToDelete(rowData);
            setDeleteDialogVisible(true);
            }}
        />
        </>
    );

    const onGlobalFilterChange = (e) => {
        setGlobalFilter(e.target.value);
    };
    const savePoste = () => {
    if (!poste.name.trim()) {
        toast.current.show({ severity: 'warn', summary: 'Attention', detail: 'Le nom du poste est requis', life: 3000 });
        return;
    }

    if (poste.id) {
        // Modification
        setPostes(postes.map(p => (p.id === poste.id ? { ...p, name: poste.name } : p)));
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Poste modifié', life: 3000 });
    } else {
        // Création
        const maxId = postes.length > 0 ? Math.max(...postes.map(p => p.id)) : 0;
        const newPoste = { id: maxId + 1, name: poste.name };
        setPostes([...postes, newPoste]);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Poste ajouté', life: 3000 });
    }
    setDialogVisible(false);
    setPoste({ id: null, name: '' });
};

const posteDialogFooter = (
    <>
        <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={savePoste} />
    </>
);


    const deletePosteDialogFooter = (
        <>
        <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
        <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deletePoste} />
        </>
    );

    const renderHeader = () => (
        <div className="flex justify-content-between">
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText value={globalFilter} onChange={onGlobalFilterChange} placeholder="Rechercher un poste" />
        </span>
        <Button
            type="button"
            icon="pi pi-plus"
            // label="Ajouter"
            rounded outlined
            tooltip="Ajouter"
            tooltipOptions={{ position: 'top' }}
            className="p-button-outlined"
            onClick={openNewPosteDialog}
        />
        </div>
    );

    const posteTemplate = (rowData) => <span><i className="pi pi-briefcase" style={{ color: 'var(--primary-color)' }} />&nbsp;&nbsp;{rowData.name}</span>;
    


    return (
        <div className="card">
        <Toast ref={toast} />
        <span className="text-900 text-xl font-bold mb-4 block text-blue-700">
            <i className="pi pi-briefcase" /> &nbsp;&nbsp;Liste des postes
        </span>
        <DataTable
            ref={dt}
            value={postes}
            header={renderHeader()}
            paginator
            rows={10}
            size='small'
            responsiveLayout="scroll"
            rowsPerPageOptions={[10, 25, 50]}
            filters={filters}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} postes"
        >
            <Column field="name" header="Poste" body={posteTemplate} style={{ width: '85%' }} sortable />
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible'}} />
        </DataTable>

        <Dialog
            visible={deleteDialogVisible}
            style={{ width: '450px' }}
            header="Confirmer la suppression"
            modal
            footer={deletePosteDialogFooter}
            onHide={hideDeleteDialog}
        >
            <div className="flex align-items-center justify-content-center">
            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
            {posteToDelete && <span>Confirmez-vous la suppression de cet élément ?</span>}
            </div>
        </Dialog>

        <Dialog
            visible={dialogVisible}
            style={{ width: '450px' }}
            header={
                <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                    {poste.id ? 'Modifier le poste' : 'Ajouter un poste'}
                </span>
              }
            modal
            className="p-fluid"
            footer={posteDialogFooter}
            onHide={hideDialog}
        >
            <div className="field">
            <label htmlFor="name">Nom du poste</label>
            <InputText
                id="name"
                value={poste.name}
                onChange={(e) => setPoste({ ...poste, name: e.target.value })}
                required
                autoFocus
            />
            </div>
        </Dialog>
        </div>
    );
    }

    export default List;
