import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';
import { FloatLabel } from 'primereact/floatlabel';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';

import React, { useState, useRef, useEffect } from 'react';

function CreateClient() {
    const toast = useRef(null);
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedCondition, setSelectedCondition] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedProduit, setSelectedProduit] = useState(null);
    const [selectedTypeProduit, setSelectedTypeProduit] = useState(null);
    const [selectedFamilleProduit, setSelectedFamilleProduit] = useState(null);
    const [selectedTypeAnalyse, setSelectedTypeAnalyse] = useState(null);
    const [selectedTypeDevis, setSelectedTypeDevis] = useState(null);
    const [selectedReglementation, setSelectedReglementation] = useState(null);
    const [selectedPack, setSelectedPack] = useState(null);
    const [value, setValue] = useState('');
    const [dateDeCreation, setDateDeCreation] = useState(null);
    const [dateDeFinValidite, setDateDeFinValidite] = useState(null);
    const [selectedValidite, setSelectedValidite] = useState(null); // For dropdown selection
    const [showCustomDateDialog, setShowCustomDateDialog] = useState(false); // Flag for the custom date dialog
    const [observationPublique, setObservationPublique] = useState('');
    const [observationPrivee, setObservationPrivee] = useState('');
    // State for controlling the visibility of the "Détails des informations du devis" section
    const [showDetailsSection, setShowDetailsSection] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);  // Initially disabled
    // show me the the fields that I selected
    const [showResume, setShowResume] = useState(false);
    const [showPackInst, setShowPackInst] = useState(false);
    const [showPack, setShowPack] = useState(false);
    const [showForfait, setShowForfait] = useState(false);
    const [showReglement, setShowReglement] = useState(false);
    // Function to handle "Continuer" button click
    const handleContinue = () => {
        setIsDisabled(false);  // Enable the fields
    };

    const clients = [
        {name: 'Futur Developpement'},
        {name: 'ATLAS BLOUSE'},
        {name: 'Youssef Benjelloun'},
        {name: 'Biotec Scientifique'},
        {name: 'Mounir Laaroussi'},
        {name: 'Leila Boussaid'},
        {name: 'MN TECHNOLOGY'},
        {name: 'Sara Alaoui'},
        {name: 'IMALAB'},
        {name: 'Nadia Lahlou'},
    ];
    const clientOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
    const conditionOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
    const typeOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
    const familleProduitOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
    const typeDevisOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
    const produitOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
    const typeProduitOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
    const typeAnalyseOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
    const reglementationOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
    const packOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
    const selectedTypeTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };
    
    const selectedClientTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };

    const selectedConditionTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };
    const selectedTypeDevisTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };
    const selectedProduitTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };
    const selectedTypeProduitTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };
    const selectedFamilleProduitTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };
    const selectedTypeAnalyseTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };
    const selectedReglementationTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };
    const selectedPackTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };
    const conditions = [
        { id: 1, name: 'Paiement à la livraison' },
        { id: 2, name: 'Paiement à 60 jours' },
        { id: 3, name: 'Paiement en plusieurs fois' },
        { id: 4, name: 'Paiement par virement bancaire' },
        { id: 5, name: 'Paiement par chèque' },
        { id: 6, name: 'Paiement via PayPal' },
        { id: 7, name: 'Paiement à la réception de facture' },
        { id: 8, name: 'Paiement à la commande' },
        { id: 9, name: 'Paiement à 30 jours' },
    ];
    const types = [
        { id: 1, name: 'Virement' },
        { id: 2, name: 'Espèces' },
        { id: 3, name: 'Effets' },
        { id: 4, name: 'Chèque' },
    ];
    const typesDevis = [

        { id: 1, name: 'Paramètre lié au réglementation' },
        { id: 2, name: 'Paramètres libres' },
        { id: 3, name: 'Pack instantané' },
        { id: 4, name: 'Pack' },
        { id: 5, name: 'Forfait' },
        ];
        const produits = [
            { name: 'Carcasses réfrigérées' },
            { name: 'Demi-carcasses réfrigérées' },
            { name: 'Carcasses congelées' },
            { name: 'Demi-carcasses congelées' },
            { name: 'Pièces conditionnées réfrigérées' },
            { name: 'Pièces non conditionnées réfrigérées' },
            { name: 'Pièces conditionnées congelées' },
            { name: 'Pièces non conditionnées congelées' },
            { name: 'Viande hachée destinée à être consommée crue' },
            { name: 'Préparations de viande d\'autres espèces (que les volailles) destinées à être consommées crues' },
            { name: 'Viande hachée destinée à être consommée cuite' },
            { name: 'Préparations de viande d\'autres espèces (que les volailles) destinées à être consommées cuites' },
            { name: 'Carcasse de volailles entière' },
            { name: 'Pièces de découpe de volailles' },
            { name: 'Viandes hachées de volailles destinées à être consommées cuites' },
            { name: 'Préparations de viande de volailles destinées à être consommées cuites' },
            { name: 'Foie gras cru' },
            { name: 'Abats crus' },
            { name: 'Mollusques bivalves vivants' },
            { name: 'Échinodermes vivants' },
            { name: 'Tuniciers vivants' },
            { name: 'Gastéropodes vivants' }
        ];
        const typeProduits = [
            { name: 'Carcasses ou demi-carcasses, réfrigérées ou congelées' },
            { name: 'Pièces conditionnées ou non, réfrigérées ou congelées' },
            { name: 'Viande hachée et préparations de viande d\'autres espèces que les volailles destinées à être consommées crues' },
            { name: 'Carcasse de volailles entière ou pièces de découpe' },
            { name: 'Foie gras cru, abats crus' },
            { name: 'Mollusques bivalves vivants et échinodermes, tuniciers et gastéropodes vivants' }
        ];
        const familleProduits = [
            { name: 'Viandes de volailles' },
            { name: 'Produits de la pêche' },
            { name: 'Graisses animales' },
            { name: 'Laits et produits dérivés de lait' },
            { name: 'Ovoproduits' },
            { name: 'Produits alimentaires divers' },
            { name: 'Produits alimentaires prêts à être consommés' },
            { name: 'Produits alimentaires d\'origine végétale' },
            { name: 'Viandes hachées, préparations de viandes et viandes séparées mécaniquement de boucherie' },
            { name: 'Escargots et cuisses de grenouilles' },
            { name: 'Produits de la mer' },
            { name: 'Ovoproduits et aux produits à base d\'œuf' },
            { name: 'Plats cuisinés, préparations culinaires, semi-conserves' },
        ];
        const typeAnalyse = [
            { name: 'Analyse microbiologique - Eau' },
            { name: 'Analyse physico-chimique - Eau' },
            { name: 'Analyse microbiologique - Air' },
            { name: 'Analyse physico-chimique - Air' },
            { name: 'Analyse microbiologique - Surface' },
            { name: 'Analyse microbiologique - Aliments' },
            { name: 'Analyse physico-chimique - Aliments' },
            { name: 'Analyse microbiologique - Antiseptiques et désinfectants' },
            { name: 'Analyse physico-chimique - Antiseptiques et désinfectants' },
            { name: 'Analyse microbiologique - Cosmétiques' },
            { name: 'Analyse physico-chimique - Cosmétiques' },
            { name: 'Analyse microbiologique - Sols et sédiments' },
            { name: 'Analyse physico-chimique - Sols et sédiments' },
            { name: 'Analyse biologique - Eau' },
            { name: 'Analyse parasitologique - Eau' },
            { name: 'Analyse parasitologique - Sols et sédiments' },
            { name: 'Analyse organoleptique - Aliments' },
        ];

        const reglementations = [
            { name: 'Arrêté n° 1276-01' },
            { name: 'Luxembourg' },
            { name: 'Quebec' },
            { name: 'Arrêté N° 1643-16' },
            { name: 'Arrêté N° 3286.17' },
            { name: 'VLSR-PEINTURE' },
            { name: 'Arrêté 1275-2' },
            { name: 'AFSSA- Saisine n° 2006-SA-0309' },
            { name: 'Circulaire Conjointe N°1 du 9 Mai 1983' },
            { name: 'CODEX' },
            { name: 'Réglement (CE) N°2023/915' },
            { name: 'Règlement (CE) N° 1333/2008' },
            { name: 'Arrêté N° 293-16' },
            { name: 'Arrêté N°2027-03' },
            { name: 'AHPA' },
            { name: 'NM ISO 11133' },
            { name: 'NF EN 1008' },
            { name: 'Arrêté N° 808-02' },
            { name: 'Arrêté 293-19' },
            { name: 'FCD' },
            { name: 'SNYDER' },
        ];
        
        const packs = [
            { name: "Pack Qualité de l'Eau" },
            { name: 'Pack Qualité Alimentaire' },
            { name: 'Pack Cosmétique' },
            { name: 'Pack Environnement' },
        ];
        // Dropdown options for validity
        const validiteOptions = [
            { label: '3 mois', value: '3' },
            { label: '6 mois', value: '6' },
            { label: '9 mois', value: '9' },
            { label: '12 mois', value: '12' },
            { label: 'Personnaliser', value: 'personnaliser' },
        ];

        // Handle dropdown change
        const onValiditeChange = (e) => {
            setSelectedValidite(e.value);
            if (e.value === 'personnaliser') {
                setShowCustomDateDialog(true); // Show dialog to select a custom date
            } else {
                setShowCustomDateDialog(false);
                // Calculate the date based on selected months (e.g., 3 months, 6 months, etc.)
                const currentDate = new Date(dateDeCreation);  // Start from the Date de creation
                currentDate.setMonth(currentDate.getMonth() + parseInt(e.value));
                
                // Handle end-of-month overflow (e.g., adding 3 months to January 31 should return April 30)
                const day = currentDate.getDate();
                const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
                if (day > lastDayOfMonth) {
                    currentDate.setDate(lastDayOfMonth); // Set to the last valid day of the month
                }
                setDateDeFinValidite(currentDate); // Set the calculated end date
            }
        };

    // Handle custom date selection
    const onCustomDateSelect = (e) => {
        setDateDeFinValidite(e.value); // Set the selected custom date
        setShowCustomDateDialog(false); // Close the dialog
    };
    // const close = () => router.push(`/Devis/list`);
    // Refresh button logic 
    const refresh = () => {
        // Reset all form states
        setTitle('');
        setSelectedClient(null);
        setSelectedCondition(null);
        setSelectedType(null);
        setDateDeCreation(null);
        setSelectedValidite(null);
        setDateDeFinValidite(null);

        setObservationPublique('');
        setObservationPrivee('');
    };
    // Handle typeDevis dropdown change
    // const onTypeDevisChange = (e) => {
    //     setSelectedTypeDevis(e.value.id); // Store only the id of the selected typeDevis
    //      // Store only the id of the selected typeDevis
    // };
    const onTypeDevisChange = (e) => {
        setSelectedTypeDevis(e.value);  // Store the entire object
        
        // Default to hide all options
        setShowReglement(false);
        setShowPackInst(false);
        setShowForfait(false);
        setShowPack(false);
    
        // Check the id and show corresponding dropdown
        switch (e.value.id) {
            case 1:
                setShowReglement(true);
                break;
            case 3:
                setShowPackInst(true);
                break;
            case 5:
                setShowForfait(true);
                break;
            case 4:
                setShowPack(true);
                break;
            default:
                // No changes needed, all options are already set to false
                break;
        }
    };
    
    
    // Function to toggle visibility
    const toggleResume = () => {
        setShowResume(!showResume);
    };
    return (
        <div className="card">
                    <Toast ref={toast}></Toast>
                    <span className="text-900 text-xl font-bold mb-4 block text-blue-700 mb-5">
                        <i className="pi pi-dollar" />&nbsp;&nbsp;Créer un devis &nbsp;&nbsp;
                    </span>
                    <div className="flex justify-content-between">
                        <div className="col-6">
                            <div className="border-1 surface-border border-round p-fluid mb-4">
                                <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations sur le devis</span>
                                <div className="p-3">
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-pencil" />
                                        <InputText type="text" value={title}
                                            onChange={(e) => setTitle(e.target.value)} placeholder="Titre" />
                                    </span>
                                    <br />
                                    <span className="p-input-icon-left" style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <Dropdown value={selectedClient} onChange={(e) => setSelectedClient(e.value)} options={clients} optionLabel="name" placeholder="Selectionner un client" 
                                        filter valueTemplate={selectedClientTemplate} itemTemplate={clientOptionTemplate} style={{width: '780px'}} />
                                    <Button 
                                        type="button" 
                                        icon="pi pi-user-plus" 
                                        className="p-button-outlined  p-button-primary mr-2" 
                                        onClick={() => router.push('/Devis/createClient')} 
                                        tooltip="Ajouter un client" 
                                        tooltipOptions={{ position: 'top' }} 
                                    />
                                    </span>
                                    <br />
                                    <span className="p-input-icon-left">
                                        {/* <Dropdown value={dropdownValue1} onChange={(e) => setDropdownValue1(e.value)} options={dropdownValues1} optionLabel="name" placeholder="Conditions de règlement" /> */}
                                        <Dropdown value={selectedCondition}  onChange={(e) => setSelectedCondition(e.value)} options={conditions} optionLabel="name" placeholder="Selectionner un condition de règlement" 
                                        filter valueTemplate={selectedConditionTemplate} itemTemplate={conditionOptionTemplate} />
                                    </span>
                                    <br />
                                    <span className="p-input-icon-left">
                                        <Dropdown value={selectedType} onChange={(e) => setSelectedType(e.value)} options={types} optionLabel="name" placeholder="Selectionner un type de règlement" 
                                        filter valueTemplate={selectedTypeTemplate} itemTemplate={typeOptionTemplate} />
                                    </span>
                                    <br />
                                    <div>
                                        <span className="p-input-icon-left" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {/* Date de creation */}
                                            <Calendar
                                                value={dateDeCreation}
                                                onChange={(e) => setDateDeCreation(e.value)}
                                                dateFormat="dd/mm/yy"
                                                showIcon
                                                placeholder="Date de création de devis"
                                                style={{ width: '420px' }}
                                            />

                                            {/* Dropdown for Date de Fin Validité */}
                                            <div style={{ width: '420px' }}>
                                                <Dropdown
                                                    value={selectedValidite}
                                                    options={validiteOptions}
                                                    onChange={onValiditeChange}
                                                    placeholder="Date de fin de validité"
                                                    style={{ width: '100%' }}
                                                />
                                            </div>
                                        </span>

                                        {/* Dialog for custom date selection */}
                                        <Dialog
                                            header="Sélectionner une date personnalisée"
                                            visible={showCustomDateDialog}
                                            style={{ width: '550px', height: '200px' }}
                                            modal
                                            onHide={() => setShowCustomDateDialog(false)}
                                        >
                                            <Calendar
                                                value={dateDeFinValidite}
                                                onChange={onCustomDateSelect}
                                                dateFormat="dd/mm/yy"
                                                showIcon
                                                placeholder="Sélectionner une date"
                                                style={{ width: '500px' }}
                                            />
                                        </Dialog>

                                        {/* Displaying the custom or calculated end date */}
                                        {dateDeFinValidite && (
                                            <div style={{ marginTop: '20px' }}>
                                                <strong>Date de fin de validité sélectionnée :</strong> {dateDeFinValidite.toLocaleDateString('fr-FR')}
                                            </div>
                                        )}
                                    </div>
                                    <br />
                                    {/* Buttons for Cancel and Save */}
                                    <div className="col-12" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                        <Button 
                                            className="p-button-danger p-button-outlined p-3" 
                                            label="réinitialiser" 
                                            onClick={() => refresh()} 
                                            icon="pi pi-fw pi-refresh" 
                                            style={{ maxWidth: '200px' }} 
                                        />
                                        <Button 
                                            className="p-button-primary p-3" 
                                            label="Continuer" 
                                            icon="pi pi-fw pi-arrow-right" 
                                            onClick={handleContinue} 
                                            style={{ maxWidth: '200px' }} 
                                        />
                                    </div>    
                                </div>
                            </div>
                            {showResume && (
                            <div className="border-1 surface-border border-round p-fluid mb-4">
                                <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Résumé du devis</span>
                                <div className="p-3">
                                    {/* Displaying Total Price */}
                                    <div className="mb-4">
                                        <div className="flex justify-content-between">
                                            <span className="text-900 font-bold">Total Prix :</span>
                                            <span className="text-900">0.00 DH</span>
                                        </div>
                                    </div>

                                    {/* Displaying Total Price TTC */}
                                    <div className="mb-4">
                                        <div className="flex justify-content-between">
                                            <span className="text-900 font-bold">Total Prix (TTC) :</span>
                                            <span className="text-900">0.00 DH</span>
                                        </div>
                                    </div>

                                    {/* Enregistrer Button */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '50px' }}>
                                        <Button 
                                            className="p-button-primary p-3" 
                                            label="Enregistrer" 
                                            icon="pi pi-fw pi-save" 
                                            style={{ maxWidth: '200px' }} 
                                        />
                                    </div>
                                </div>
                            </div>
                              )}
                        </div>
                        
                        {/* Display the "Détails des informations du devis" section when the "Continuer" button is clicked */}
                        <div className="col-6">
                            <div className="border-1 surface-border border-round p-fluid mb-4">
                                <span className="text-900 font-bold block border-bottom-1 surface-border p-4">Détails des informations du devis 
                                    <Button style={{ float: 'right', width: '40px', height: '35px'}} className='mb-4 mt-0' icon="pi pi-cog" tooltip="Ajouter un paramètre" 
                                        tooltipOptions={{ position: 'top' }}  severity="info" />
                                </span>
                                <div className="p-3">
                                    <div className="mb-5">
                                        <Dropdown value={selectedTypeDevis} onChange={onTypeDevisChange}  options={typesDevis} optionLabel="name" placeholder="Selectionner le type de devis" 
                                            filter valueTemplate={selectedTypeDevisTemplate} itemTemplate={typeDevisOptionTemplate} disabled={isDisabled} />
                                    </div>
                                    {showPackInst && (
                                    <div className="mb-5">
                                        <FloatLabel>
                                            <InputText value={value} onChange={(e) => setValue(e.target.value)} disabled={isDisabled} />
                                            <label htmlFor="titre">Titre</label>
                                        </FloatLabel>
                                        <br />
                                        <FloatLabel className="mt-3">
                                            <InputText value={value} onChange={(e) => setValue(e.target.value)} disabled={isDisabled} />
                                            <label htmlFor="prix">Prix</label>
                                        </FloatLabel>                                                                                                              
                                        </div>
                                    )}
                                    {showPack && (
                                    <div className="mb-5">
                                        <Dropdown value={selectedPack} onChange={(e) => setSelectedPack(e.value)} options={packs} optionLabel="name" placeholder="Selectionner le pack" 
                                                filter valueTemplate={selectedPackTemplate} itemTemplate={packOptionTemplate} disabled={isDisabled} />
                                    </div>
                                    )}
                                    {showForfait && (
                                    <div className="mb-5">
                                        <FloatLabel>
                                            <InputText value={value} onChange={(e) => setValue(e.target.value)} disabled={isDisabled} />
                                            <label htmlFor="titre">Titre</label>
                                        </FloatLabel>
                                        <br />
                                        <FloatLabel className="mt-3">
                                            <InputText value={value} onChange={(e) => setValue(e.target.value)} disabled={isDisabled} />
                                            <label htmlFor="prix">Prix</label>
                                        </FloatLabel>                                                                                                              
                                        </div>
                                    )}
                                    <div className="mb-4">
                                        <Dropdown value={selectedProduit} onChange={(e) => setSelectedProduit(e.value)} options={produits} optionLabel="name" placeholder="Selectionner le produit" 
                                            filter valueTemplate={selectedProduitTemplate} itemTemplate={produitOptionTemplate} disabled={isDisabled} />
                                    </div>
                                    <div className="mb-4">
                                        <Dropdown value={selectedTypeProduit} onChange={(e) => setSelectedTypeProduit(e.value)} options={typeProduits} optionLabel="name" placeholder="Selectionner le type de produit" 
                                            filter valueTemplate={selectedTypeProduitTemplate} itemTemplate={typeProduitOptionTemplate} disabled={isDisabled} />
                                    </div>
                                    <div className="mb-4">
                                        <Dropdown value={selectedFamilleProduit} onChange={(e) => setSelectedFamilleProduit(e.value)} options={familleProduits} optionLabel="name" placeholder="Selectionner la famille de produit" 
                                                filter valueTemplate={selectedFamilleProduitTemplate} itemTemplate={familleProduitOptionTemplate} disabled={isDisabled} />
                                    </div>
                                    <div className="mb-4">
                                        <Dropdown value={selectedTypeAnalyse} onChange={(e) => setSelectedTypeAnalyse(e.value)} options={typeAnalyse} optionLabel="name" placeholder="Selectionner le type d'analyse" 
                                                    filter valueTemplate={selectedTypeAnalyseTemplate} itemTemplate={typeAnalyseOptionTemplate} disabled={isDisabled} />
                                    </div>
                                    {showReglement && (
                                    <div className="mb-4">
                                        <Dropdown value={selectedReglementation} onChange={(e) => setSelectedReglementation(e.value)} options={reglementations} optionLabel="name" placeholder="Selectionner une réglementation" 
                                                filter valueTemplate={selectedReglementationTemplate} itemTemplate={reglementationOptionTemplate} disabled={isDisabled} />
                                    </div>
                                    )}
                                </div>
                            </div>
                            {/* Checkbox Section */}
                            <div className="border-1 surface-border border-round p-fluid mb-4">
                                {/* Observation Publique Textarea with FloatLabel */}
                                <div className="p-field p-grid m-2">
                                    <div className="p-col-12 p-md-10">
                                        <InputTextarea
                                            id="observationPublique"
                                            placeholder='Observation publique'
                                            value={observationPublique}
                                            onChange={(e) => setObservationPublique(e.target.value)}
                                            autoResize
                                            rows={2}
                                            className='mt-2'
                                            disabled={isDisabled}
                                        />
                                    </div>
                                </div>

                                {/* Observation Privée Textarea with FloatLabel */}
                                <div className="p-field p-grid m-2">
                                    <div className="p-col-12 p-md-10">
                                        <InputTextarea
                                            id="observationPrivee"
                                            placeholder='Observation privée'
                                            value={observationPrivee}
                                            onChange={(e) => setObservationPrivee(e.target.value)}
                                            autoResize
                                            rows={2}
                                            className='mt-2'
                                            disabled={isDisabled}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Button Section */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '50px' }}>
                                <Button className="p-button-danger p-button-outlined p-3" label="Annuler" onClick={toggleResume} icon="pi pi-fw pi-times" style={{ maxWidth: '200px' }}  disabled={isDisabled} />
                                <Button className="p-button-primary p-3" label="Enregistrer" icon="pi pi-fw pi-save" style={{ maxWidth: '200px' }} disabled={isDisabled} onClick={toggleResume} />
                            </div>
                        </div>

                    </div>
                    
                </div>
    );
}

export default CreateClient;

