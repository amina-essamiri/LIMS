import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { FilterMatchMode } from 'primereact/api';

// Simulated service pour Moyennes de Prélèvement
const MoyennePrelevementService = {
    getMoyennes: () => Promise.resolve([
        { id: 1, name: 'Moyenne microbiologique zone RCP', surface_moyennePrelevement: true },
        { id: 2, name: 'Moyenne charge bactérienne robinet', surface_moyennePrelevement: false },
        { id: 3, name: 'Moyenne contamination salle MP', surface_moyennePrelevement: true },
        { id: 4, name: 'Moyenne qualité eau sortie osmoseur', surface_moyennePrelevement: false },
        { id: 5, name: 'Moyenne spores aérosolisées sterifood', surface_moyennePrelevement: false },
        { id: 6, name: 'Moyenne résidus désinfectant surface', surface_moyennePrelevement: true },
        { id: 7, name: 'Moyenne turbidité prélèvement robinet', surface_moyennePrelevement: false },
        { id: 8, name: 'Moyenne biocharge zone production', surface_moyennePrelevement: true },
    ]),
    deleteMoyenne: (id) => Promise.resolve({ success: true }),
};

export default function MoyennePrelevementList() {
    const [moyennes, setMoyennes] = useState([]);
    const [moyenne, setMoyenne] = useState({ id: null, name: '', surface_moyennePrelevement: false });
    const [dialogVisible, setDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        MoyennePrelevementService.getMoyennes()
            .then(data => {
                setMoyennes(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Erreur chargement des moyennes' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS }
        });
    };

   const surfaceTemplate = (rowData) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {rowData.surface_moyennePrelevement ? (
        <>
            <i className="pi pi-check-circle" style={{ color: '#328E6E', fontSize: '1.5rem' }} />
            <span style={{ color: '#328E6E', fontWeight: 'bold' }}>Oui</span>
        </>
        ) : (
        <>
            <i className="pi pi-times-circle" style={{ color: '#E55050', fontSize: '1.5rem' }} />
            <span style={{ color: '#E55050', fontWeight: 'bold' }}>Non</span>
        </>
        )}
    </div>
    );


    const iconTemplate = () => (
        <i className="pi pi-clone" style={{ fontSize: '1.2rem', color: 'var(--primary-color)' }} />
    );

    const openNewDialog = () => {
        setMoyenne({ id: null, name: '', surface_moyennePrelevement: false });
        setDialogVisible(true);
    };

    const openEditDialog = (data) => {
        setMoyenne(data);
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const saveMoyenne = () => {
    if (!moyenne.name.trim()) {
        toast.current.show({
            severity: 'warn',
            summary: 'Attention',
            detail: 'Le nom de la moyenne est requis',
            life: 3000
        });
        return;
    }

    if (moyenne.id) {
        // Modification
        setMoyennes(moyennes.map(m => (m.id === moyenne.id ? moyenne : m)));
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Moyenne modifiée' });
    } else {
        // Création
        const newId = moyennes.length > 0 ? Math.max(...moyennes.map(m => m.id)) + 1 : 1;
        const newMoyenne = { ...moyenne, id: newId };
        setMoyennes([...moyennes, newMoyenne]);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Moyenne ajoutée' });
    }
    setDialogVisible(false);
    setMoyenne({ id: null, name: '', surface_moyennePrelevement: false });
};


    const confirmDelete = (data) => {
        setMoyenne(data);
        setDeleteDialogVisible(true);
    };
const deleteMoyenne = () => {
    setMoyennes(moyennes.filter(m => m.id !== moyenne.id));
    setDeleteDialogVisible(false);
    toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Moyenne supprimée' });
};


    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditDialog(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDelete(rowData)} />
        </>
    );

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span className="p-input-icon-left w-full sm:w-20rem">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher une moyenne" className="w-full" />
            </span>
            <Button icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} rounded outlined onClick={openNewDialog} />
        </div>
    );
const dialogFooter = (
    <>
        <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveMoyenne} />
    </>
);


    const deleteDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteDialogVisible(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteMoyenne} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700">
                <i className="pi pi-clone" /> &nbsp;Liste des moyennes de prélèvement
            </span>
            <DataTable
                ref={dt}
                value={moyennes}
                paginator
                rows={10}
                responsiveLayout="scroll"
                filters={filters}
                globalFilterFields={['name']}
                filterDisplay="menu"
                loading={loading}
                header={header}
                size="small"
                rowsPerPageOptions={[10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} moyennes"
            >
                <Column body={iconTemplate} headerStyle={{ width: '2rem' }} />
                <Column field="name" header="Nom de la moyenne" sortable style={{ minWidth: '60%' }} />
                <Column field="surface_moyennePrelevement" header="Prélèvement sur surface ?" body={surfaceTemplate}  style={{ minWidth: '15%' }} />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
            </DataTable>

            <Dialog
                visible={dialogVisible}
                style={{ width: '450px' }}
                header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{moyenne.id ? "Modifier une moyenne" : "Ajouter une moyenne"}</span>}
                modal
                className="p-fluid"
                footer={dialogFooter}
                onHide={hideDialog}
                >
                <div className="field">
                    <label htmlFor="name">Nom de la moyenne</label>
                    <InputText
                    id="name"
                    value={moyenne.name}
                    onChange={e => setMoyenne({ ...moyenne, name: e.target.value })}
                    required
                    autoFocus
                    />
                </div>
                <div className="field mt-3">
                    <label className="flex align-items-center gap-2">
                    <input
                        type="checkbox"
                        checked={moyenne.surface_moyennePrelevement}
                        onChange={e => setMoyenne({ ...moyenne, surface_moyennePrelevement: e.target.checked })}
                    />
                    <span>Moyenne calculée sur surface ?</span>
                    </label>
                </div>
            </Dialog>


            <Dialog visible={deleteDialogVisible} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteDialogFooter} onHide={() => setDeleteDialogVisible(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Voulez-vous vraiment supprimer cette moyenne?</span>
                </div>
            </Dialog>
        </div>
    );
}
