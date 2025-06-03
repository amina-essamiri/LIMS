import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

function CreateAnalyse() {
    const router = useRouter();
    const toast = useRef(null);
    const [parameters, setParameters] = useState([]);
    const [parameter, setParameter] = useState({ id: null, name: '', abbreviation: '', family: [] });
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

    // States sélection
    const [selectedParametre, setSelectedParametre] = useState(null);
    const [selectedMethode, setSelectedMethode] = useState(null);
    const [selectedUnite, setSelectedUnite] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedAccreditation, setSelectedAccreditation] = useState(null);

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

    return (
        <div className="card">
            <Toast ref={toast}></Toast>
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700 mb-5">
                <i className="pi pi-tags" />
                &nbsp;&nbsp;Modifier l’analyse&nbsp;&nbsp;
            </span>
            <div className="flex justify-content-between">
                <div className="col-6">
                    <div className="border-1 surface-border border-round p-fluid mb-4">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations sur l’analyse</span>
                        <div className="p-3">
                            <span className="p-input-icon-left">
                                <i className="pi pi-sliders-h" />
                                <Dropdown id="parametre" options={parametresData} optionLabel="name" placeholder="Sélectionner un paramètre *" value={selectedParametre} onChange={(e) => setSelectedParametre(e.value)} filter className="w-full" />
                            </span>
                            <br />

                            <span className="p-input-icon-left">
                                <i className="pi pi-cogs" />
                                <Dropdown id="methode" options={methodesData} optionLabel="nom" placeholder="Sélectionner une méthode *" value={selectedMethode} onChange={(e) => setSelectedMethode(e.value)} filter className="w-full" />
                            </span>
                            <br />

                            <span className="p-input-icon-left">
                                <i className="pi pi-sort-numeric-up" />
                                <Dropdown id="unite" options={unitesData} optionLabel="name" placeholder="Sélectionner une unité *" value={selectedUnite} onChange={(e) => setSelectedUnite(e.value)} filter className="w-full" />
                            </span>
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
                            <br />
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
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '50px' }}>
                            <Button className="p-button-danger p-button-outlined p-3" label="Annuler" onClick={() => close()} icon="pi pi-fw pi-times" style={{ maxWidth: '200px' }} />
                            <Button className="p-button-primary p-3" label="Enregistrer" icon="pi pi-fw pi-save" style={{ maxWidth: '200px' }} />
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default CreateAnalyse;
