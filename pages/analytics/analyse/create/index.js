import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';




function CreateAnalyse() {
    const router = useRouter();
    const toast = useRef(null);
    const [parameterDialog, setParameterDialog] = useState(false);
    const [parameters, setParameters] = useState([]);
    const [parameter, setParameter] = useState({ id: null, name: '', abbreviation: '', family: [] });
    const [familleParamètre, setFamilleParamètre] = useState([]);
    const [selectedFamilleParamètre, setSelectedFamilleParamètre] = useState([]);
    
    const close = () => router.push(`./`);
    // Données mockées (simulées)
    const parametresData = [
        { id: 1, name: '% Extrait sec' },
        { id: 2, name: '1,1-Dichloroéthane' },
        { id: 3, name: '2,4-DB' },
        { id: 4, name: 'Acide alpha-linolénique (C18:3, n-3)' },
        { id: 5, name: 'Acide gadoléique (C20:1)' },
        { id: 6, name: 'Aflatoxines B2' },
        { id: 7, name: 'Aflatoxines G1' },
        { id: 8, name: 'Vitamine B12' },
        { id: 9, name: 'Vitamine C' },
        { id: 10, name: 'Somme Toxines (T2+HT2)' }
    ];

    const methodesData = [
        { id: 1, nom: 'AOAC 2007.1' },
        { id: 2, nom: 'COI/T.20/Doc.n°19/Rév.5' },
        { id: 3, nom: 'Follin-Ciocalteux' },
        { id: 4, nom: 'ISO 11048' },
        { id: 5, nom: 'ISO 14189' }
    ];

    const unitesData = [
        { id: 1, name: '%' },
        { id: 2, name: '°' },
        { id: 3, name: 'B°' },
        { id: 4, name: 'Bq/L' },
        { id: 5, name: 'C°' }
    ];

    const typesData = [
        { id: 1, name: 'Analyse biologique - Air' },
        { id: 2, name: 'Analyse organoleptique - Aliments' },
        { id: 3, name: 'Analyse microbiologique - Cosmétiques' }
    ];

    const accreditationsData = [
        { id: 1, name: 'Non Accrédité' },
        { id: 2, name: 'Sous-traité' },
        { id: 3, name: 'Reconnu' },
        { id: 4, name: 'Accrédité' }
    ];
    const groupedFamilles = [
        {
            name: 'Algues & Phytoplancton',
            items: [
            { id: 1, name: 'Algues' },
            { id: 2, name: 'Chlorophytes (bacillarioph) en %' },
            { id: 3, name: 'Chlorophytes en %' },
            { id: 4, name: 'Cyanophytes en %' },
            ],
        },
        {
            name: 'Autres Éléments',
            items: [
            { id: 5, name: 'Elément figurés' },
            { id: 6, name: 'Elément morts' },
            ],
        },
        {
            name: 'Composés chimiques',
            items: [
            { id: 7, name: 'Vitamines' },
            { id: 8, name: 'Pesticides' },
            { id: 9, name: 'Toxines' },
            { id: 10, name: 'Profil des acides gras' },
            ],
        },
        ];


    // States sélection
    const [selectedParametre, setSelectedParametre] = useState(null);
    const [selectedMethode, setSelectedMethode] = useState(null);
    const [selectedUnite, setSelectedUnite] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedAccreditation, setSelectedAccreditation] = useState(null);
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
        const [units, setUnits] = useState([]);
        const [unit, setUnit] = useState({ id: null, name: '' });
        const [unitDialog, setUnitDialog] = useState(false);

    // Inputs texte
    const [suffixe, setSuffixe] = useState('');
    const [incertitude, setIncertitude] = useState('');
    const [limiteQuantification, setLimiteQuantification] = useState('');

    // Inputs numériques
    const [delai, setDelai] = useState(null);
    const [envoi, setEnvoi] = useState(null);
    

    const handleSave = () => {
        if (!selectedParametre || !selectedMethode || !selectedUnite || !selectedType || !selectedAccreditation) {
            toast.current.show({ severity: 'warn', summary: 'Attention', detail: 'Veuillez remplir tous les champs obligatoires.' });
            return;
        }

        const newAnalyse = {
            parametreId: selectedParametre.id,
            methodeId: selectedMethode.id,
            uniteId: selectedUnite.id,
            typeAnalyseId: selectedType.id,
            accreditationId: selectedAccreditation.id,
            suffixe,
            incertitude,
            limiteQuantification,
            delai,
            envoi
        };

        console.log('Analyse sauvegardée:', newAnalyse);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Analyse créée avec succès.' });

        setTimeout(() => router.push('/analyse'), 1500);
    };
    const hideDialog = () => {
        setParameterDialog(false);
        };
    const openNewParameterDialog = () => {
        setParameter({ id: null, name: '', abbreviation: '', family: [] });
        setParameterDialog(true);
    };
    const parameterDialogFooter = (
            <>
                <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" />
            </>
        );
        const hideDialoge = () => {
            setMethodeDialog(false);
        };
        
    const hideDialogee = () => {
        setUnitDialog(false);
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
    const openNewUnitDialog = () => {
        setUnit({ id: null, name: '' });
        setUnitDialog(true);
    };
    const unitDialogFooter = (
            <>
                <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialogee} />
                <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" />
            </>
        );
    
    const methodeDialogFooter = (
            <>
                <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialoge} />
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
                    hideDialoge();
                }} />
            </>
        );
    return (
        <div className="card">
            <Toast ref={toast}></Toast>
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700 mb-5">
                <i className="pi pi-tags" />
                &nbsp;&nbsp;Créer une nouvelle analyse&nbsp;&nbsp;
            </span>
            <div className="flex justify-content-between">
                <div className="col-6">
                    <div className="border-1 surface-border border-round p-fluid mb-4">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations sur l’analyse</span>
                        <div className="p-3">
                            <div className="mb-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                <Dropdown
                                    id="parametre"
                                    options={parametresData}
                                    optionLabel="name"
                                    placeholder="Sélectionner un paramètre *"
                                    value={selectedParametre}
                                    onChange={(e) => setSelectedParametre(e.value)}
                                    filter
                                    className="flex-grow" // prend tout l’espace dispo
                                    style={{width: '600px'}}
                                />
                                <Button
                                    type="button"
                                    icon="pi pi-plus"
                                    tooltip="Ajouter paramètre"
                                    tooltipOptions={{ position: 'top' }}
                                    className="p-button-outlined"
                                    onClick={openNewParameterDialog}
                                />
                            </div>
                            <div className="mb-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                <Dropdown id="methode" options={methodesData} optionLabel="nom" placeholder="Sélectionner une méthode *" value={selectedMethode} 
                                onChange={(e) => setSelectedMethode(e.value)} 
                                filter 
                                className="flex-grow"
                                style={{width: '600px'}} />

                                <Button
                                    type="button"
                                    icon="pi pi-plus"
                                    tooltip="Ajouter groupe d'analyse"
                                    tooltipOptions={{ position: 'top' }}
                                    className="p-button-outlined"
                                    onClick={()=> router.push('/analytics/methodeAnalyse/create')}
                                />
                            </div>
                            <div className="mb-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                <Dropdown id="unite" options={unitesData} optionLabel="name" placeholder="Sélectionner une unité *" value={selectedUnite} 
                                onChange={(e) => setSelectedUnite(e.value)} 
                                filter className="flex-grow"
                                style={{width: '600px'}} 
                                />

                                <Button
                                    type="button"
                                    icon="pi pi-plus"
                                    tooltip="Ajouter unité"
                                    tooltipOptions={{ position: 'top' }}
                                    className="p-button-outlined"
                                    onClick={openNewUnitDialog}
                                />
                            </div>
                            <br />

                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <Dropdown id="typeAnalyse" options={typesData} optionLabel="name" placeholder="Sélectionner un type d'analyse *" value={selectedType} onChange={(e) => setSelectedType(e.value)} filter className="w-full" />
                            </span>
                            <br />

                            <span className="p-input-icon-left">
                                <i className="pi pi-check-circle" />
                                <Dropdown
                                    id="accreditation"
                                    options={accreditationsData}
                                    optionLabel="name"
                                    placeholder="Sélectionner une accréditation *"
                                    value={selectedAccreditation}
                                    onChange={(e) => setSelectedAccreditation(e.value)}
                                    filter
                                    className="w-full"
                                />
                            </span>
                        </div>
                    </div>
                    
                </div>
                <div className="col-6">
                        <div className="border-1 surface-border border-round p-fluid mb-4">
                            <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations supplémentaires sur l’analyse</span>
                            <div className="p-3">
                                <div className="mb-4">
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-tag" />
                                        <InputText id="suffixe" value={suffixe} onChange={(e) => setSuffixe(e.target.value)} placeholder="Suffixe" className="w-full" />
                                    </span>
                                </div>
                                
                                <div className="mb-4">
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-question-circle" />
                                        <InputText id="incertitude" value={incertitude} onChange={(e) => setIncertitude(e.target.value)} placeholder="Incertitude" className="w-full" />
                                    </span>
                                </div>
                                <div className="mb-4">
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-exclamation-triangle" />
                                        <InputText id="limiteQuantification" value={limiteQuantification} onChange={(e) => setLimiteQuantification(e.target.value)} placeholder="Limite de Quantification" className="w-full" />
                                    </span>
                                </div>
                                <div className="mb-4">
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-clock" />
                                        <InputText id="delai" value={delai} onValueChange={(e) => setDelai(e.value)} showButtons min={0} mode="decimal" placeholder="Délai (jours)" className="w-full" />
                                    </span>
                                </div>
                                <div className="mb-4 ">
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-send" />
                                        <InputText id="envoi" value={envoi} onValueChange={(e) => setEnvoi(e.value)} showButtons min={0} mode="decimal" placeholder="Envoi (jours)" className="w-full" />
                                    </span>
                                </div>
                            </div>
                            <br />
                            <br />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '50px' }}>
                            <Button className="p-button-danger p-button-outlined p-3" label="Annuler" onClick={() => close()} icon="pi pi-fw pi-times" style={{ maxWidth: '200px' }} />
                            <Button className="p-button-primary p-3" label="Enregistrer" icon="pi pi-fw pi-save" style={{ maxWidth: '200px' }} />
                        </div>
                    </div>
            </div>
            <Dialog visible={parameterDialog} style={{ width: '450px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{parameter.id ? "Modifier le paramètre" : "Ajouter un paramètre"}</span>} modal className="p-fluid" footer={parameterDialogFooter} onHide={hideDialog}>
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
                        onChange={(e) => setSelectedFamilleParamètre(e.value)}
                        options={groupedFamilles}
                        optionGroupLabel="name"
                        optionGroupChildren="items"
                        optionLabel="name"
                        placeholder="Sélectionner Famille Paramètre"
                        filter
                        multiple
                        />
                </div>
            </Dialog>
            {/* Dialog création/modification */}
            <Dialog
                visible={methodeDialog}
                style={{ width: '550px' }}
                header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{methode.id ? "Modifier la méthode d'analyse" : "Ajouter une méthode d'analyse"}</span>}
                modal
                className="p-fluid"
                footer={methodeDialogFooter}
                onHide={hideDialoge}
            >
                <div className="field">
                    <label htmlFor="nom">Nom de la méthode</label>
                    <InputText
                        id="nom"
                        value={methode.nom}
                        onChange={(e) => setMethode({ ...methode, nom: e.target.value })}
                        required
                        autoFocus
                    />
                </div>
    
                <div className="field">
                    <label htmlFor="version">Nom de version</label>
                    <InputText
                        id="version"
                        value={methode.version}
                        onChange={(e) => setMethode({ ...methode, version: e.target.value })}
                        required
                    />
                </div>
    
                <div className="field">
                    <label htmlFor="dateApplication">Date d&apos;application</label>
                    <Calendar
                        id="dateApplication"
                        value={methode.dateApplication}
                        onChange={(e) => setMethode({ ...methode, dateApplication: e.value })}
                        dateFormat="dd/mm/yy"
                        showIcon
                        required
                    />
                </div>
    
                {/* Statut d'activation radio buttons */}
                <div className="field">
                <label>Statut d&apos;activation</label>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <div>
                    <input
                        type="radio"
                        id="active"
                        name="statutActivation"
                        value="true"
                        checked={methode.statutActivation === true}
                        onChange={() => setMethode({ ...methode, statutActivation: true })}
                    />
                    <label htmlFor="active" style={{ marginLeft: '0.25rem' }}>Activé</label>
                    </div>
                    <div>
                    <input
                        type="radio"
                        id="inactive"
                        name="statutActivation"
                        value="false"
                        checked={methode.statutActivation === false}
                        onChange={() => setMethode({ ...methode, statutActivation: false })}
                    />
                    <label htmlFor="inactive" style={{ marginLeft: '0.25rem' }}>Désactivé</label>
                    </div>
                </div>
                </div>
    
    
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea
                        id="description"
                        value={methode.description}
                        onChange={(e) => setMethode({ ...methode, description: e.target.value })}
                        required
                        rows={4}
                        autoResize
                    />
                </div>
    
            </Dialog>
            <Dialog visible={unitDialog} style={{ width: '450px' }} header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>{unit.id ? "Modifier l'unité" : "Ajouter une unité"}</span>} modal className="p-fluid" footer={unitDialogFooter} onHide={hideDialogee}>
                <div className="field">
                    <label htmlFor="name">Nom de l&apos;unité</label>
                    <InputText id="name" value={unit.name} onChange={(e) => setUnit({ ...unit, name: e.target.value })} required autoFocus />
                </div>
            </Dialog>
        </div>
    );
}

export default CreateAnalyse;
