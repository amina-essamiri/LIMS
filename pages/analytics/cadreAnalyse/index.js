import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

const CadreAnalyseService = {
    getCadres: () => {
        return Promise.resolve([
            'Contrôle officiel',
            'Autocontrôle',
        ].map((nom, i) => ({
            id: i + 1,
            nom,
            statutActivation: true
        })));
    }
};

export default function CadreAnalyseList() {
    const [cadres, setCadres] = useState([]);
    const [cadre, setCadre] = useState({ id: null, nom: '', statutActivation: true });
    const [cadreDialog, setCadreDialog] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteCadreDialog, setDeleteCadreDialog] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        CadreAnalyseService.getCadres().then(setCadres);
        setLoading(false);
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS }
        });
    };

    const openNewDialog = () => {
        setCadre({ id: null, nom: '', statutActivation: true });
        setCadreDialog(true);
    };

    const hideDialog = () => setCadreDialog(false);
const saveCadre = () => {
        if (!cadre.nom.trim()) {
            toast.current.show({
                severity: 'warn',
                summary: 'Attention',
                detail: 'Le nom du cadre est requis',
                life: 3000
            });
            return;
        }

        if (cadre.id) {
            // Modification
            setCadres(cadres.map(c => (c.id === cadre.id ? cadre : c)));
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'Cadre modifié',
                life: 3000
            });
        } else {
            // Création
            const maxId = cadres.length > 0 ? Math.max(...cadres.map(c => c.id)) : 0;
            const newCadre = { ...cadre, id: maxId + 1 };
            setCadres([...cadres, newCadre]);
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'Cadre ajouté',
                life: 3000
            });
        }
        setCadreDialog(false);
    };

    const confirmEdit = (c) => {
        setCadre({ ...c });
        setCadreDialog(true);
    };
    const confirmDelete = (c) => {
        setCadre(c);
        setDeleteCadreDialog(true);
    };
    

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" onClick={() => confirmEdit(rowData)} className="mr-2" />
            <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDelete(rowData)} />
        </>
    );

    const nomTemplate = (rowData) => (
        <span><i className="pi pi-ticket text-primary" />&nbsp;{rowData.nom}</span>
    );

    const statusBodyTemplate = (rowData) => (
        <span className={`p-badge ${rowData.statutActivation ? 'p-badge-info' : 'p-badge-secondary'}`} style={{ padding: '0.5rem 1rem', borderRadius: '1rem' }}>
            <i className={`pi ${rowData.statutActivation ? 'pi-lock-open' : 'pi-lock'}`} />
            &nbsp;{rowData.statutActivation ? 'Activé' : 'Désactivé'}
        </span>
    );
    const deleteCadre = () => {
        setCadres(cadres.filter(c => c.id !== cadre.id));
        setDeleteCadreDialog(false);
        toast.current.show({
            severity: 'success',
            summary: 'Succès',
            detail: 'Cadre supprimé',
            life: 3000
        });
    };

    const deleteCadreDialogFooter = (
            <>
                <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteCadreDialog(false)} />
                <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteCadre} />
            </>
        );
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                    <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                        <i className="pi pi-search"></i>
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des cadres" className="w-full" />
                    </span>
                    <Button
                        type="button"
                        rounded
                        outlined
                        icon="pi pi-plus"
                        tooltip="Ajouter"
                        tooltipOptions={{ position: 'top' }}
                        className="p-button-outlined"
                        onClick={openNewDialog}
                    />
            </div>
    );
    
    const cadreDialogFooter = (
        <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveCadre} />
        </>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700">
                <i className="pi pi-ticket" /> &nbsp;&nbsp;Liste des Cadres d&apos;analyse
            </span>
            <h2 className="mb-4"></h2>
            <DataTable ref={dt} value={cadres} paginator rows={7} rowsPerPageOptions={[5, 10, 20]}
                filters={filters} filterDisplay="menu" globalFilterFields={['nom']}
                header={header} emptyMessage="Aucun cadre trouvé."
                loading={loading}
                size="small"
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} méthodes d'analyse">
                <Column field="nom" header="Nom du cadre" body={nomTemplate} sortable headerClassName="white-space-nowrap" size="small" style={{ width: '85%' }} />
                {/* <Column field="statutActivation" header="Statut" body={statusBodyTemplate} /> */}
                <Column body={actionBodyTemplate}  headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }}/>
            </DataTable>
            <Dialog visible={deleteCadreDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteCadreDialogFooter} onHide={() => setDeleteCadreDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {cadre && <span>Confirmez-vous la suppression de ce cadre ?</span>}
                </div>
            </Dialog>
            <Dialog visible={cadreDialog} style={{ width: '450px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{cadre.id ? "Modifier le cadre d'analyse" : "Ajouter un cadre d'analyse"}</span>} modal className="p-fluid" footer={cadreDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="nom">Nom du cadre</label>
                    <InputText id="nom" value={cadre.nom} onChange={(e) => setCadre({ ...cadre, nom: e.target.value })} autoFocus />
                </div>
            </Dialog>
        </div>
    );
}
