import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { TabMenu } from 'primereact/tabmenu';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

export default function BlogEdit() {
    const router = useRouter();
    const toast = useRef(null);
    const [dateApplication, setDateApplication] = useState(null);
    const [version, setVersion] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [selectedMethode, setSelectedMethode] = useState(null);
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [nomVersion, setNomVersion] = useState('');
    const [errors, setErrors] = useState({});
    //partie de parametre 
    const [parameters, setParameters] = useState([]);
    const [parameter, setParameter] = useState({ id: null, name: '', abbreviation: '', family: [] });
    const [parameterDialog, setParameterDialog] = useState(false);
    const [deleteParameterDialog, setDeleteParameterDialog] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    // Dans le state du composant
    const [familleParamètre, setFamilleParamètre] = useState([]);
    const [familleParamètreOptions] = useState([
    'Algues', 
    'Chlorophytes (bacillarioph) en %',
    'Chlorophytes en %',
    'Cyanophytes en %',
    'Elément figurés',
    'Elément morts',
    'Vitamines',
    'Pesticides',
    'Toxines',
    'Profil des acides gras',
]);
const familleParamètreDropdownOptions = familleParamètreOptions.map(f => ({
    label: f,
    value: f
}));
const [selectedFamilleParamètre, setSelectedFamilleParamètre] = useState([]);

    // Synchroniser la sélection avec l'objet parameter
    const handleFamilleChange = (e) => {
        setSelectedFamilleParamètre(e.value);
        setParameter({ ...parameter, family: e.value });
    };

    // Mise à jour : 3 onglets
    const tabs = [
        { label: "Méthodes d'analyse" },
        { label: "Versions" },
        { label: "Paramètres" }
    ];

    const onDateChange = (e) => {
        const selectedDate = e.value;
        setDateApplication(selectedDate);
        selectedDate ? setVersion(selectedDate.getFullYear().toString()) : setVersion('');
    };
    const [methodes, setMethodes] = useState([
        {
            id: 1,
            nom: 'AOAC 2007.1',
            version: '2007',
            dateApplication: new Date('2007-01-01'),
            statutActivation: true
        }
    ]);
    const handleEditMethode = () => {
        if (selectedMethode) {
            setMethodes(prev => 
                prev.map(m => 
                    m.id === selectedMethode.id ? selectedMethode : m
                )
            );
            toast.current.show({
                severity: 'success',
                summary: 'Mise à jour réussie',
                detail: 'Version modifiée',
                life: 3000
            });
            setEditDialogVisible(false);
        }
    };

    const onRowEditComplete = (e) => {
        let updatedMethodes = [...methodes];
        updatedMethodes[e.index] = e.newData;
        setMethodes(updatedMethodes);
    };
    // Formatage de la date pour l'affichage
    const formatDate = (value) => {
        if (!value) return '';
        return new Date(value).toLocaleDateString('fr-FR');
    };

    // Badge statut
    const statusBodyTemplate = (rowData) => (
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
            }}
        >
            <i className={`pi ${rowData.statutActivation ? 'pi-lock-open' : 'pi-lock'}`} style={{ fontSize: '16px' }}></i>
            {rowData.statutActivation ? 'Activé' : 'Désactivé'}
        </span>
    );
    const actionBodyTemplate = (rowData) => (
        <div className="flex gap-1">
            <Button 
                icon="pi pi-pencil" 
                rounded 
                text 
                severity="success" 
                onClick={() => {
                    setSelectedMethode(rowData);
                    setEditDialogVisible(true);
                }}
            />
            <Button 
                icon="pi pi-trash" 
                rounded 
                text 
                severity="danger" 
                onClick={() => {
                    setSelectedMethode(rowData);
                    setDeleteDialogVisible(true);
                }}
            />
        </div>
    );
    const deleteMethode = () => {
        setMethodes(methodes.filter(m => m.id !== selectedMethode.id));
        setDeleteDialogVisible(false);
        toast.current.show({
            severity: 'success',
            summary: 'Suppression réussie',
            detail: 'Méthode supprimée',
            life: 3000
        });
    };
    const deleteDialogFooter = (
        <>
            <Button 
                label="Non" 
                icon="pi pi-times" 
                className="p-button-text" 
                onClick={() => setDeleteDialogVisible(false)} 
            />
            <Button 
                label="Oui" 
                icon="pi pi-check" 
                className="p-button-text" 
                onClick={deleteMethode} 
            />
        </>
    );

    const editDialogFooter = (
        <>
            <Button 
                label="Annuler" 
                icon="pi pi-times" 
                className="p-button-text" 
                onClick={() => setEditDialogVisible(false)} 
            />
            <Button 
                label="Enregistrer" 
                icon="pi pi-check" 
                className="p-button-text" 
                onClick={() => {
                    // Logique de mise à jour ici
                    setEditDialogVisible(false);
                }} 
            />
        </>
    );
    // ======================================================
    // Partie de parametres 
    // ======================================================
    const exempleMethode = {
    nom: 'AOAC 2007.1',
    description: 'Méthode officielle pour la détermination de la teneur en humidité.',
    statutActivation: true
};
    // Chargement simulé des paramètres
    useEffect(() => {
        setLoading(true);
        Promise.resolve([
            { id: 1, name: '% Extrait sec', abbreviation: 'ES', family: ['COHV'] },
            { id: 10, name: 'Somme Toxines (T2+HT2)', abbreviation: 'Tox. T2+HT2', family: ['Toxines'] },
            { id: 11, name: 'Diflufenican', abbreviation: 'DIF', family: ['Pesticides'] },
            { id: 12, name: 'Metamitrone', abbreviation: 'MET', family: ['Pesticides'] },
        ]).then((data) => {
            setParameters(data);
            setLoading(false);
        });
    }, []);
    useEffect(() => {
    // À adapter selon la logique de chargement de la méthode à éditer
    setNom(exempleMethode.nom);
    setDescription(exempleMethode.description);
    setDateApplication(exempleMethode.dateApplication);
    setVersion(exempleMethode.version);
    // Pour le statut d'activation, il faut aussi gérer l’état sélectionné du radio bouton
    // Par exemple, ajouter un state statutActivation et l'utiliser dans le formulaire
}, []);




    const hideDialog = () => {
        setParameterDialog(false);
    };

    const confirmDeleteParameter = (parameter) => {
        setParameter(parameter);
        setDeleteParameterDialog(true);
    };

    const deleteParameter = () => {
        setParameters(parameters.filter((p) => p.id !== parameter.id));
        setDeleteParameterDialog(false);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Paramètre supprimé', life: 3000 });
    };

    // Templates
    const parameterTemplate = (rowData) => (
        <span><i className="pi pi-link" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );
    const editParameter = (parameter) => {
        setParameter(parameter);
        setSelectedFamilleParamètre(parameter.family); // Si besoin de préremplir le dropdown
        setParameterDialog(true);
    };

    const actionBodyTemplate1 = (rowData) => (
        <React.Fragment>
            <Button
                icon="pi pi-pencil"
                rounded 
                text 
                severity="success"
                onClick={() => editParameter(rowData)}
            />
            <Button
                icon="pi pi-trash"
                rounded 
                text 
                severity="danger"
                onClick={() => confirmDeleteParameter(rowData)}
            />
        </React.Fragment>
    );
    const saveParameter = () => {
    if (parameter.id) {
        setParameters(prev => 
            prev.map(p => 
                p.id === parameter.id 
                ? { ...parameter, family: selectedFamilleParamètre } 
                : p
            )
        );
    }
    setParameterDialog(false);
};


    const parameterDialogFooter = (
    <>
        <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveParameter} />
    </>
    );
    const openEditParameterDialog = (parameter) => {
        setParameter(parameter);
        setSelectedFamilleParamètre(parameter.family);
        setParameterDialog(true);
    };

    const deleteParameterDialogFooter = (
        <>
            <button className="p-button p-button-text" onClick={() => setDeleteParameterDialog(false)}>
                <i className="pi pi-times" /> Non
            </button>
            <button className="p-button p-button-text" onClick={deleteParameter}>
                <i className="pi pi-check" /> Oui
            </button>
        </>
    );
    const validateForm = () => {
    let newErrors = {};

    if (!nom || nom.trim() === "") {
        newErrors.nom = "Le nom de la méthode est obligatoire.";
    }
    if (!dateApplication) {
        newErrors.dateApplication = "La date d'application est obligatoire.";
    }
    if (!version || version.trim() === "") {
        newErrors.version = "Le nom de version est obligatoire.";
    } else if (!/^\d+$/.test(version)) {
        newErrors.version = "Le nom de version doit être un nombre.";
    }
    // Ajoutez d'autres validations si besoin

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
    return (
        <div className="card">
            <Toast ref={toast} position="top-right" />
            <span className="block text-900 text-xl font-bold mb-4 text-blue-700">
                <i className="pi pi-stop" />&nbsp;&nbsp;Modifier la méthode d&apos;analyse
            </span>

            <TabMenu
                model={tabs}
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
                className="mb-4"
            />

            {/* Contenu vide pour chaque onglet */}
            <div className="flex justify-content-between">
                {activeIndex === 0 && <div className="col-12">
                            <div className="flex justify-content-between">
                                <div className="col-6">
                                    <div className="border-1 surface-border border-round p-fluid mb-4">
                                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Modifier la méthode d&apos;analyse </span>
                                        <div className="p-3">
                                            {/* Nom */}
                                            <div className="mb-4">
                                                <InputText
                                                    id="nom"
                                                    value={nom}
                                                    placeholder='Nom de la méthode *'
                                                    onChange={(e) => setNom(e.target.value)}
                                                />
                                                {errors.nom && <small style={{ color: 'red' }}>{errors.nom}</small>}
                                            </div>
                                            <div className="mb-4">
                                                <InputTextarea
                                                    id="nom"
                                                    value={description}
                                                    placeholder='Description de la méthode'
                                                    onChange={(e) => setDescription(e.target.value)}
                                                ></InputTextarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="border-1 surface-border border-round p-fluid mb-4">
                                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Créer une nouvelle version </span>
                                        <div className="p-3">
                
                                            <div className="mb-4">
                                                <Calendar
                                                    id="dateApplication"
                                                    placeholder="Date d'application *"
                                                    dateFormat="dd/mm/yy"
                                                    showIcon
                                                    required
                                                    value={dateApplication}
                                                    onChange={onDateChange}
                                                />
                                                {errors.dateApplication && <small style={{ color: 'red' }}>{errors.dateApplication}</small>}
                                            </div>
                                            <div className="mb-4">
                                                <InputText
                                                    id="version"
                                                    placeholder='Nom de version *'
                                                    value={version}
                                                    onChange={(e) => setVersion(e.target.value)}
                                                />
                                                {errors.version && <small style={{ color: 'red' }}>{errors.version}</small>}
                                                <br />
                                                <small id="version-help" className="p-d-block">
                                                    Saisissez uniquement l&apos;année (exemple : 2025)
                                                </small>
                
                                            </div>
                                            <div className="mb-4">
                                                <label>Statut d&apos;activation</label>
                                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                                        <div>
                                                            <input
                                                                type="radio"
                                                                id="active"
                                                                name="statutActivation"
                                                                value="true"
                                                            />
                                                            <label htmlFor="active" style={{ marginLeft: '0.25rem' }}>Activé</label>
                                                        </div>
                                                        <div>
                                                            <input
                                                                type="radio"
                                                                id="inactive"
                                                                name="statutActivation"
                                                                value="false"
                                                            />
                                                            <label htmlFor="inactive" style={{ marginLeft: '0.25rem' }}>Désactivé</label>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '50px' }}>
                                        <Button
                                            className="p-button-danger p-button-outlined p-3"
                                            label="Annuler"
                                            icon="pi pi-fw pi-times"
                                            onClick={() => { router.push(`/analytics/methodeAnalyse`); }}
                                            style={{ maxWidth: '200px' }}
                                        />
                                        <Button
                                            className="p-button-primary p-3"
                                            label="Enregistrer"
                                            icon="pi pi-fw pi-save"
                                            style={{ maxWidth: '200px' }}
                                            onClick={() => {
                                                if (validateForm()) {
                                                    // Ici, appelez votre fonction d’enregistrement réelle
                                                    // handleSave();
                                                    // Affichage du toast de succès
                                                    if (toast.current) {
                                                        toast.current.show({
                                                            severity: 'success',
                                                            summary: 'Succès',
                                                            detail: 'Méthode enregistrée avec succès.',
                                                            life: 4000
                                                        });
                                                    }
                                                } else {
                                                    if (toast.current) {
                                                        toast.current.show({
                                                            severity: 'error',
                                                            summary: 'Erreur de validation',
                                                            detail: 'Veuillez remplir tous les champs obligatoires correctement.',
                                                            life: 4000
                                                        });
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                
                                </div>
                            </div>
                    </div>}
                {activeIndex === 1 && (
                    <div className="col-12">
                        <DataTable
                            value={methodes}
                            paginator
                            rows={5}
                            responsiveLayout="scroll"
                            className="datatable-responsive"
                            rowsPerPageOptions={[10, 25, 50]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} versions"
                        >
                            <Column field="version" header="Version" style={{ width: '10%' }} sortable />
                            <Column
                                field="dateApplication"
                                header="Date d'application"
                                body={(row) => formatDate(row.dateApplication)}
                                style={{ width: '25%' }}
                                sortable
                            />
                            
                            <Column
                                field="statutActivation"
                                header="Statut Activation"
                                body={statusBodyTemplate}
                                style={{ width: '25%' }}
                                sortable
                            />
                            <Column body={actionBodyTemplate}  style={{ width: '15%' }} />
                            </DataTable>
                            {/* Dialog Suppression */}
            <Dialog
                visible={deleteDialogVisible}
                style={{ width: '450px' }}
                header="Confirmer la suppression"
                modal
                footer={deleteDialogFooter}
                onHide={() => setDeleteDialogVisible(false)}
            >
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedMethode && <span>Confirmez-vous la suppression de la version ?</span>}
                </div>
            </Dialog>

            <Dialog
                visible={editDialogVisible}
                header="Modifier la version"
                style={{ width: '450px' }}
                onHide={() => setEditDialogVisible(false)}
                footer={
                    <>
                        <Button label="Annuler" icon="pi pi-times" onClick={() => setEditDialogVisible(false)} />
                        <Button label="Enregistrer" icon="pi pi-check" onClick={handleEditMethode} />
                    </>
                }
            >
                <div className="p-fluid">
                    <div className="field">
                        <label>Date d&apos;application</label>
                        <Calendar
                            value={selectedMethode?.dateApplication}
                            dateFormat="dd/mm/yy"
                            showIcon
                            onChange={(e) => setSelectedMethode({
                                ...selectedMethode,
                                dateApplication: e.value,
                                version: e.value.getFullYear().toString()
                            })}
                        />
                    </div>
                    <div className="field">
                        <label>Nom de version</label>
                        <InputText
                            value={selectedMethode?.version}
                            onChange={(e) => setSelectedMethode({
                                ...selectedMethode,
                                version: e.target.value
                            })}
                        />
                        {errors.version && <small style={{ color: 'red' }}>{errors.version}</small>}
                        <br />
                        <small id="version-help" className="p-d-block">
                            Saisissez uniquement l&apos;année (exemple : 2025)
                        </small>
                    </div>
                </div>
            </Dialog>
            </div>
                )}
                {activeIndex === 2 && <div className="col-12">
                    <DataTable
                        value={parameters}
                        globalFilterFields={['name', 'abbreviation', 'family']} // Ajout de 'family'
                        paginator
                        rows={10}
                        responsiveLayout="scroll"
                        rowsPerPageOptions={[10, 25, 50]}
                        loading={loading}
                        size='small'
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} paramètres"
            >
                <Column field="name" header="Nom" body={parameterTemplate} style={{ width: '40%' }} sortable />
                <Column field="abbreviation" header="Abréviation" style={{ width: '25%' }} sortable />
                <Column
                    field="family"
                    header="Famille Paramètre"
                    body={rowData =>
                        Array.isArray(rowData.family)
                            ? rowData.family.join(', ')
                            : rowData.family || ''
                    }
                    sortable
                />
                <Column body={actionBodyTemplate1} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>

            <Dialog visible={deleteParameterDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteParameterDialogFooter} onHide={() => setDeleteParameterDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {parameter && <span>Confirmez-vous la suppression de ce paramètre ?</span>}
                </div>
            </Dialog>

            <Dialog
                visible={parameterDialog}
                style={{ width: '450px' }}
                header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{parameter.id ? "Modifier le paramètre" : "Ajouter un paramètre"}</span>}
                modal
                className="p-fluid"
                footer={parameterDialogFooter}
                onHide={hideDialog}
            >
                <div className="field">
                    <label htmlFor="name">Nom</label>
                    <InputText id="name" value={parameter.name} onChange={(e) => setParameter({ ...parameter, name: e.target.value })} required autoFocus />
                </div>
                <div className="field">
                    <label htmlFor="abbreviation">Abréviation</label>
                    <InputText id="abbreviation" value={parameter.abbreviation} onChange={(e) => setParameter({ ...parameter, abbreviation: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="family">Famille Paramètre</label>
                    <Dropdown
                        value={selectedFamilleParamètre}
                        onChange={(e) => {
                            setSelectedFamilleParamètre(e.value);
                            setParameter({ ...parameter, family: e.value });
                        }}
                        options={familleParamètreDropdownOptions}
                        placeholder="Sélectionner Famille Paramètre"
                        filter
                        multiple
                    />
                </div>
            </Dialog>
            </div>}
            </div>
        </div>
    );
}
