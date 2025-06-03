import { useRouter } from 'next/router';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';


// import { Text } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { Badge } from 'primereact/badge';
import { RadioButton } from 'primereact/radiobutton';

import React, { useEffect, useRef, useState } from 'react';

const MethodeAnalyseService = {
    getMethodes: () => {
        return Promise.resolve([
            {
                id: 1,
                nom: 'AOAC 2007.1',
                version: '2007',
                dateApplication: new Date('2007-01-01'), // Date approximative année
                description: 'Pesticide Residues in Foods by Acetonitrile Extraction and Partitioning with Magnesium Sulfate',
                statutActivation: true,
                obsolete: false,
            },
            {
                id: 2,
                nom: 'COI/T.20/Doc.n°19/Rév.5',
                version: '2019',
                dateApplication: new Date('2019-01-01'),
                description: 'ANALYSE SPECTROPHOTOMÉTRIQUE DANS L’ULTRAVIOLET',
                statutActivation: false,
                obsolete: true,
            },
            {
                id: 3,
                nom: 'Follin-Ciocalteux',
                version: '1995',
                dateApplication: new Date('1995-01-01'),
                description: "Qualité du sol — Dosage du sulfate soluble dans l'eau et dans l'acide",
                statutActivation: true,
                obsolete: false,
            },
            {
                id: 4,
                nom: 'ISO 11048',
                version: '1995',
                dateApplication: new Date('1995-01-01'),
                description: "Qualité du sol — Dosage du sulfate soluble dans l'eau et dans l'acide",
                statutActivation: true,
                obsolete: false,
            },
            {
                id: 5,
                nom: 'ISO 14189',
                version: '2024',
                dateApplication: new Date('2024-01-01'),
                description: "Qualité de l'eau — Dénombrement de Clostridium perfringens — Méthode par filtration sur membrane",
                statutActivation: true,
                obsolete: false,
            },
            {
                id: 6,
                nom: 'ISO 14235',
                version: '1998',
                dateApplication: new Date('1998-01-01'),
                description: "Qualité du sol — Dosage du carbone organique par oxydation sulfochromique",
                statutActivation: true,
                obsolete: false,
            },
            {
                id: 7,
                nom: 'ISO 15705',
                version: '2002',
                dateApplication: new Date('2002-01-01'),
                description: "Qualité de l'eau — Détermination de l'indice de demande chimique en oxygène (ST-DCO) — Méthode à petite échelle en tube fermé",
                statutActivation: true,
                obsolete: false,
            },
            {
                id: 8,
                nom: 'MOSuMB03',
                version: '2024',
                dateApplication: new Date('2024-01-01'),
                description: "Méthode pour le dénombrement des Escherichia coli β-glucuronidase positive. Technique de comptage des colonies à 44 °C au moyen de bromo-5-chloro-4-indolyl-3 β-Dglucuronate",
                statutActivation: true,
                obsolete: false,
            },
            {
                id: 9,
                nom: 'NF EN 16502',
                version: '2014',
                dateApplication: new Date('2014-01-01'),
                description: "Méthode d'essai pour la détermination du degré d'acidité des sols selon Baumann-Gully",
                statutActivation: false,
                obsolete: true,
            },
        ]);
    },
    deleteMethode: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [methodes, setMethodes] = useState([]);
    const [methode, setMethode] = useState({
        id: null,
        nom: '',
        version: '',
        dateApplication: null,
        description: '',
        statutActivation: true,
        obsolete: false,
    });
    const [methodeDialog, setMethodeDialog] = useState(false);
    const [deleteMethodeDialog, setDeleteMethodeDialog] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);
    const router = useRouter();

    useEffect(() => {
        MethodeAnalyseService.getMethodes()
            .then(data => {
                setMethodes(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des méthodes d\'analyse' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const methodeTemplate = (rowData) => (
        <span><i className="pi pi-stop" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.nom}</span>
    );

    const formatDate = (value) => {
        if (!value) return '';
        return new Date(value).toLocaleDateString('fr-FR');
    };

    const openNewMethodeDialog = () => {
        setMethode({
            id: null,
            nom: '',
            version: '',
            dateApplication: null,
            description: '',
            statutActivation: true,
            obsolete: false,
        });
        setMethodeDialog(true);
    };

    const openEditMethodeDialog = (methode) => {
        setMethode({ ...methode });
        setMethodeDialog(true);
    };

    const hideDialog = () => {
        setMethodeDialog(false);
    };

    const deleteMethode = () => {
        setDeleteMethodeDialog(false);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Méthode d\'analyse supprimée', life: 3000 });
        // Ici, tu peux appeler l'API delete et mettre à jour la liste
        setMethodes(methodes.filter(m => m.id !== methode.id));
    };

    const confirmDeleteMethode = (methode) => {
        setMethode(methode);
        setDeleteMethodeDialog(true);
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button
                    icon="pi pi-pencil"
                    rounded
                    text
                    severity="success"
                    className="mr-2"
                    onClick={() => router.push(`/analytics/methodeAnalyse/edit`)}
                />
            <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDeleteMethode(rowData)} />
        </>
    );

    const renderHeader = () => (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                <i className="pi pi-search"></i>
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Rechercher des méthodes"
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
                onClick={()=>{router.push('/analytics/methodeAnalyse/create')}}
            />
        </div>
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


    const methodeDialogFooter = (
        <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={() => {
                // Ici tu peux gérer la sauvegarde (ajout/modification)
                if (methode.id) {
                    // modifier
                    setMethodes(methodes.map(m => (m.id === methode.id ? methode : m)));
                    toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Méthode modifiée', life: 3000 });
                } else {
                    // créer : générer un id simple pour exemple
                    const newMethode = { ...methode, id: Math.max(...methodes.map(m => m.id)) + 1 };
                    setMethodes([...methodes, newMethode]);
                    toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Méthode ajoutée', life: 3000 });
                }
                hideDialog();
            }} />
        </>
    );

    const deleteMethodeDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteMethodeDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteMethode} />
        </>
    );
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
                <i className="pi pi-stop" /> &nbsp;&nbsp;Liste des méthodes d&apos;analyse
            </span>

            <DataTable
                ref={dt}
                value={methodes}
                header={renderHeader()}
                paginator
                rows={10}
                responsiveLayout="scroll"
                rowsPerPageOptions={[10, 25, 50]}
                filters={filters}
                loading={loading}
                size="small"
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} méthodes d'analyse"
            >
                <Column
                    field="nom"
                    header="Nom de la méthode"
                    body={methodeTemplate}
                    headerClassName="white-space-nowrap"
                    size="small"
                    style={{ width: '20%' }}
                    sortable
                />
                <Column field="version" header="Version" size="small" style={{ width: '10%' }} sortable />
                <Column
                    field="dateApplication"
                    header="Date d'application"
                    body={(row) => formatDate(row.dateApplication)}
                    size="small"
                    style={{ width: '15%' }}
                    sortable
                />
                <Column
                    field="obsolete"
                    header="Méthode obsolète"
                    body={obsoleteBodyTemplate}
                    size="small"
                    style={{ width: '10%' }}
                />
                <Column field="description" header="Description" size="small" style={{ width: '35%' }} />
                
                <Column
                field="statutActivation"
                header="Statut Activation"
                body={statusBodyTemplate}
                size="small"
                style={{ width: '15%' }}
                />




                <Column
                    body={actionBodyTemplate}
                    headerStyle={{ minWidth: '10rem' }}
                    bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                />
            </DataTable>

            {/* Dialog suppression */}
            <Dialog
                visible={deleteMethodeDialog}
                style={{ width: '450px' }}
                header="Confirmer la suppression"
                modal
                footer={deleteMethodeDialogFooter}
                onHide={() => setDeleteMethodeDialog(false)}
            >
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {methode && <span>Confirmez-vous la suppression de cette méthode?</span>}
                </div>
            </Dialog>

            {/* Dialog création/modification */}
        

        </div>
    );
}

export default List;
