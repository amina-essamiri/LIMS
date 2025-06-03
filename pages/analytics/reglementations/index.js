import { useRouter } from 'next/router'; 
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { Badge } from 'primereact/badge';

import React, { useEffect, useRef, useState } from 'react';

const ReglementationService = {
    getReglementations: () => {
        return Promise.resolve([
            {
                id: 1,
                nom: 'Arrêté n° 1276-01',
                version: '2002',
                dateApplication: new Date('2002-10-17'),
                description: "ARRETE CONJOINT DU MINISTRE DE L’EQUIPEMENT ET DU MINISTRE CHARGE DE L'AMENAGEMENT DU TERRITOIRE.",
                statutActivation: true,
                obsolete: false,
            },
            {
                id: 2,
                nom: 'Luxembourg',
                version: '2018',
                dateApplication: new Date('2018-01-01'),
                description: "Critères microbiologiques applicables aux denrées alimentaires Lignes directrices pour l’interprétation",
                statutActivation: true,
                obsolete: false,
            },
            {
                id: 3,
                nom: 'Quebec',
                version: '2019',
                dateApplication: new Date('2019-01-01'),
                description: "LIGNES DIRECTRICES ET NORMES POUR L'INTERPRÉTATION DES RÉSULTATS ANALYTIQUES EN MICROBIOLOGIE ALIMENTAIRE",
                statutActivation: false,
                obsolete: true,
            },
            {
                id: 4,
                nom: 'VLSR-PEINTURE',
                version: '2020',
                dateApplication: new Date('2020-06-01'),
                description: "Normes sur les émissions et sécurité dans les peintures industrielles",
                statutActivation: false,
                obsolete: true,
            },
            {
                id: 5,
                nom: 'Directive Européenne 2015/2193',
                version: '2015',
                dateApplication: new Date('2015-12-17'),
                description: "Directive sur la limitation des émissions de certains polluants dans l'air ambiant",
                statutActivation: true,
                obsolete: false,
            },
            {
                id: 6,
                nom: 'Norme ISO 14001',
                version: '2015',
                dateApplication: new Date('2015-09-15'),
                description: "Systèmes de management environnemental - Exigences et lignes directrices",
                statutActivation: true,
                obsolete: false,
            },
            {
                id: 7,
                nom: 'Code de l’environnement Maroc',
                version: '2018',
                dateApplication: new Date('2018-07-01'),
                description: "Réglementation nationale sur la protection de l'environnement au Maroc",
                statutActivation: true,
                obsolete: false,
            },
            {
                id: 8,
                nom: 'Arrêté Ministériel n° 345',
                version: '2017',
                dateApplication: new Date('2017-03-20'),
                description: "Normes relatives à la qualité de l'air intérieur dans les établissements publics",
                statutActivation: false,
                obsolete: true,
            },
            {
                id: 9,
                nom: 'Règlement REACH',
                version: '2007',
                dateApplication: new Date('2007-06-01'),
                description: "Enregistrement, évaluation et autorisation des substances chimiques dans l’UE",
                statutActivation: true,
                obsolete: false,
            },
            {
                id: 10,
                nom: 'Arrêté n° 2234/2021',
                version: '2021',
                dateApplication: new Date('2021-11-11'),
                description: "Normes relatives au traitement des eaux usées industrielles",
                statutActivation: true,
                obsolete: false,
            },
        ]);
    },
    deleteReglementation: (id) => Promise.resolve({ success: true }),
};


function List() {
    const [reglementations, setReglementations] = useState([]);
    const [reglementation, setReglementation] = useState({
        id: null,
        nom: '',
        version: '',
        dateApplication: null,
        description: '',
        statutActivation: true,
    });
    const [reglementationDialog, setReglementationDialog] = useState(false);
    const [deleteReglementationDialog, setDeleteReglementationDialog] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);
    const router = useRouter();
    const [versionManuelle, setVersionManuelle] = useState(false);


    useEffect(() => {
        ReglementationService.getReglementations()
            .then(data => {
                setReglementations(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des réglementations' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({ global: { value, matchMode: FilterMatchMode.CONTAINS } });
    };

    const nomTemplate = (rowData) => (
        <span><i className="pi pi-sliders-h" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.nom}</span>
    );

    const formatDate = (value) => value ? new Date(value).toLocaleDateString('fr-FR') : '';

    const openNewReglementationDialog = () => {
        setReglementation({
            id: null,
            nom: '',
            version: '',
            dateApplication: null,
            description: '',
            statutActivation: true,
        });
        setReglementationDialog(true);
    };

    const openEditReglementationDialog = (item) => {
        setReglementation({ ...item });
        setReglementationDialog(true);
    };

    const hideDialog = () => setReglementationDialog(false);

    const deleteReglementation = () => {
        setDeleteReglementationDialog(false);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Réglementation supprimée', life: 3000 });
        setReglementations(reglementations.filter(r => r.id !== reglementation.id));
    };

    const confirmDeleteReglementation = (item) => {
        setReglementation(item);
        setDeleteReglementationDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2"  onClick={() => router.push(`/analytics/reglementations/edit`)} />
            <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDeleteReglementation(rowData)} />
        </>
    );

    const reglementationDialogFooter = (
        <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={() => {
                if (reglementation.id) {
                    setReglementations(reglementations.map(r => (r.id === reglementation.id ? reglementation : r)));
                    toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Réglementation modifiée', life: 3000 });
                } else {
                    const newItem = { ...reglementation, id: Math.max(...reglementations.map(r => r.id)) + 1 };
                    setReglementations([...reglementations, newItem]);
                    toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Réglementation ajoutée', life: 3000 });
                }
                hideDialog();
            }} />
        </>
    );

    const deleteReglementationDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteReglementationDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteReglementation} />
        </>
    );
    const statusBodyTemplate = (rowData) => {
        return (
            <span
                className={`p-badge p-component ${rowData.statutActivation ? 'p-badge-info' : 'p-badge-secondary'}`}
                style={{
                    borderRadius: '12px',
                    padding: '16px 16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
            >
                <i
                    className={`pi ${rowData.statutActivation ? 'pi-lock-open' : 'pi-lock'}`}
                    style={{ fontSize: '16px' }}
                ></i>
                {rowData.statutActivation ? 'Activé' : 'Désactivé'}
            </span>
        );
};
    const obsoleteBodyTemplate = (rowData) => {
    return (
        <span>
            <Badge
                value={rowData.obsolete ? 'Oui' : 'Non'}
                severity={rowData.obsolete ? 'success' : 'secondary'}
                style={{
                    borderRadius: '12px',
                    padding: '16px 16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
            />
        </span>
    );
};


    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700">
                <i className="pi pi-sliders-h" /> &nbsp;&nbsp;Liste des réglementations
            </span>

            <DataTable
                ref={dt}
                value={reglementations}
                header={
                    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                            <i className="pi pi-search" />
                            <InputText
                                value={globalFilterValue}
                                onChange={onGlobalFilterChange}
                                placeholder="Rechercher des réglementations"
                                className="w-full"
                            />
                        </span>
                        <Button
                            type="button"
                            rounded
                            outlined
                            icon="pi pi-plus"
                            tooltip="Ajouter"
                            tooltipOptions={{ position: 'top' }}
                            className="p-button-outlined"
                            onClick={()=>{router.push('/analytics/reglementations/create')}}

                        />
                    </div>
                }
                paginator
                rows={10}
                responsiveLayout="scroll"
                rowsPerPageOptions={[10, 25, 50]}
                filters={filters}
                loading={loading}
                size="small"
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} réglementations"
            >
                <Column field="nom" header="Nom" body={nomTemplate} style={{ width: '20%' }} sortable />
                <Column field="version" header="Version" style={{ width: '10%' }} sortable />
                <Column field="dateApplication" header="Date d'application" body={(row) => formatDate(row.dateApplication)} style={{ width: '15%' }} sortable />
                <Column
                    field="obsolete"
                    header="Réglementation obsolète"
                    body={obsoleteBodyTemplate}
                    size="small"
                    style={{ width: '10%' }}
                />
                <Column field="description" header="Description" style={{ width: '35%' }} />
                <Column field="statutActivation" header="Statut" body={statusBodyTemplate} style={{ width: '15%' }} />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>

            <Dialog visible={deleteReglementationDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteReglementationDialogFooter} onHide={() => setDeleteReglementationDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {reglementation && <span>Confirmez-vous la suppression de cette réglementation?</span>}
                </div>
            </Dialog>

            <Dialog visible={reglementationDialog} style={{ width: '550px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{reglementation.id ? "Modifier la réglementation" : "Ajouter une réglementation"}</span>} modal className="p-fluid" footer={reglementationDialogFooter} onHide={hideDialog}>

                <div className="field">
                    <label htmlFor="nom">Nom de la réglementation</label>
                    <InputText id="nom" value={reglementation.nom} onChange={(e) => setReglementation({ ...reglementation, nom: e.target.value })} required autoFocus />
                </div>
                <div className="field">
                    <label htmlFor="dateApplication">Date d&apos;application</label>
                    <Calendar
                        id="dateApplication"
                        value={reglementation.dateApplication}
                        onChange={(e) => {
                            const newDate = e.value;
                            const year = newDate ? newDate.getFullYear().toString() : '';
                            setReglementation((prev) => ({
                                ...prev,
                                dateApplication: newDate,
                                version: versionManuelle ? prev.version : year,
                            }));
                        }}
                        dateFormat="dd/mm/yy"
                        showIcon
                        required
                    />
                </div>

                <div className="field">
                    <label htmlFor="version">Version</label>
                    <InputText
                        id="version"
                        value={reglementation.version}
                        onChange={(e) => {
                            setVersionManuelle(true); // utilisateur modifie manuellement
                            setReglementation({ ...reglementation, version: e.target.value });
                        }}
                        required
                    />
                </div>
                {/* Statut d'activation radio buttons */}
                <div className="field">
                    <label>Statut d&apos;activation</label>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <div>
                            <input type="radio" id="active" name="statutActivation" value="true" checked={reglementation.statutActivation === true} onChange={() => setReglementation({ ...reglementation, statutActivation: true })} />
                            <label htmlFor="active" style={{ marginLeft: '0.25rem' }}>Activé</label>
                        </div>
                        <div>
                            <input type="radio" id="inactive" name="statutActivation" value="false" checked={reglementation.statutActivation === false} onChange={() => setReglementation({ ...reglementation, statutActivation: false })} />
                            <label htmlFor="inactive" style={{ marginLeft: '0.25rem' }}>Désactivé</label>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={reglementation.description} onChange={(e) => setReglementation({ ...reglementation, description: e.target.value })} required rows={4} autoResize />
                </div>
                
            </Dialog>
        </div>
    );
}

export default List;
