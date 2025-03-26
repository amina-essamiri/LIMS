import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { Password } from 'primereact/password';
import { InputSwitch } from "primereact/inputswitch";


function ProfileCreate() {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [dropdownValue1, setDropdownValue1] = useState(null);
    const [dropdownValue2, setDropdownValue2] = useState(null);
    const [checked, setChecked] = useState(true);

    const [value, setValue] = useState('');
    const cities = [
        { name: 'Casablanca' },
        { name: 'Rabat' },
        { name: 'Marrakech' },
        { name: 'Fes' },
        { name: 'Tangier' },
        { name: 'Agadir' },
        { name: 'Meknes' },
        { name: 'Oujda' },
        { name: 'Kenitra' },
        { name: 'Tetouan' },
        { name: 'Safi' },
        { name: 'El Jadida' },
        { name: 'Nador' },
        { name: 'Beni Mellal' },
        { name: 'Khemisset' },
        { name: 'Ifrane' },
        { name: 'Taroudant' },
        { name: 'Skhirat' },
        { name: 'Ksar El Kebir' },
        { name: 'Errachidia' },
        { name: 'Dakhla' },
        { name: 'Laayoune' },
        { name: 'Taza' },
        { name: 'Sidi Ifni' },
        { name: 'Azrou' },
        { name: 'Berkane' },
        { name: 'Tinghir' },
        { name: 'Ouarzazate' },
        { name: 'Settat' },
        { name: 'Al Hoceima' },
        { name: 'Chefchaouen' },
        { name: 'El Kelaa des Srarhna' },
        { name: 'Khenifra' },
        { name: 'Sidi Kacem' },
        { name: 'Boulmane' },
        { name: 'Khouribga' },
        { name: 'Driouch' },
        { name: 'Mdiq' },
        { name: 'Moulay Bousselham' },
        { name: 'Nador' },
        { name: 'Oualidia' },
        { name: 'Ait Melloul' },
        { name: 'Assilah' },
        { name: 'Tiznit' },
        { name: 'Safi' },
        { name: 'Sidi Ifni' },
        { name: 'Tiflet' },
        { name: 'Fkih Ben Saleh' },
        { name: 'Midelt' },
        { name: 'Tarfaya' },
        { name: 'Taza' },
        { name: 'Zagora' },
        { name: 'Guelmim' },
        { name: 'Sidi Bennour' },
        { name: 'Ben Guerir' },
        { name: 'Settat' },
        { name: 'Marrakech' },
        { name: 'Casablanca' }
    ];
    
    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };
    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
    const dropdownValues = [
        { name: 'Client', code: 'NY' },
        { name: 'Fournisseur', code: 'RM' },
        { name: 'Entreprise', code: 'LDN' },
        { name: 'Particulier', code: 'IST' },
        { name: 'Laboratoire', code: 'PRS' },
        { name: "Administration", code: 'IST1' },
    ];
    const dropdownValues1 = [
        { name: 'Scolaire' },
        { name: 'Hôtellerie' },
        { name: 'Construction aéronautique' },
        { name: 'Agroalimentaire' },
        { name: 'Environnement' },
        { name: 'Textile' },
        { name: 'Cosmétique' },
        { name: 'Régie' },
        { name: 'Restauration' },
        { name: 'Santé' },
        { name: 'Autre' },
    ];
    
    const dropdownValues2 = [
        { name: 'Super Admin', code: 'NY' },
        { name: 'Admin', code: 'RM' },
        { name: 'Utilisateur', code: 'LDN' },
    ];
    return (
        <div className="card">
            <Toast ref={toast}></Toast>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-user" /> &nbsp;&nbsp;Créer client</span>
            <div className="grid">
                <div className="col-12 lg:col-10">
                    <div className="grid formgrid p-fluid">
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="phone" className="font-medium text-900">
                            Nom
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-user" />
                                <InputText type="text" placeholder="Nom" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="phone" className="font-medium text-900">
                            Prénom
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-user" />
                                <InputText type="text" placeholder="Prénom" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="phone" className="font-medium text-900">
                            Numéro de téléphone
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-phone" />
                                <InputText type="text" placeholder="Numéro de téléphone" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">
                            Courrier électronique
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-at" />
                                <InputText type="text" placeholder="Email" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="adresse" className="font-medium text-900">
                                Adresse
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-map-marker" />
                                <InputText type="text" placeholder="Adresse client" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">
                            Code postal
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-map" />
                                <InputText type="text" placeholder="Code postal" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">
                            Site web
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-globe" />
                                <InputText type="text" placeholder="URL" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">
                            Fax
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-print" />
                                <InputText type="text" placeholder="Fax" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">
                            Forme juridique
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-print" />
                                <InputText type="text" placeholder="Forme juridique" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">
                            Identifiant Commun de l&apos;Entreprise
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-id-card" />
                                <InputText type="text" placeholder="ICE" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">
                            CNSS
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-id-card" />
                                <InputText type="text" placeholder="CNSS" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">
                            Registre du Commerce
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-file" />
                                <InputText type="text" placeholder="RC" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">
                            Taxe Professionnelle
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-file-edit" />
                                <InputText type="text" placeholder="TP" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="city" className="font-medium text-900">
                                Type Client
                            </label>
                            <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Select" />
                        </div>
                        <div className="field mb-4 col-12 md:col-6" >
                            <label htmlFor="city" className="font-medium text-900">
                                Ville
                            </label>
                            <Dropdown value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)} options={cities} optionLabel="name" placeholder="Selectionner une ville" 
                                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}  />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="city" className="font-medium text-900">
                            Secteurs d&apos;activité
                            </label>
                            <Dropdown value={dropdownValue1} onChange={(e) => setDropdownValue1(e.value)} options={dropdownValues1} optionLabel="name" placeholder="Select" />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">
                            Remise client
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-credit-card" />
                                <InputText type="text" placeholder="RCL" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">
                            Limite de crédit maximale
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-credit-card" />
                                <InputText type="text" placeholder="MC" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="op" className="font-medium text-900">
                            Observation publique
                            </label>
                            <InputTextarea id="op" type="text" rows={2}></InputTextarea>
                        </div>


                        <div className="field mb-4 col-12  md:col-6">
                            <label htmlFor="opr" className="font-medium text-900">
                            Observation privée
                            </label>
                            <InputTextarea id="opr" type="text" rows={2}></InputTextarea>
                        </div>
                        <div className="col-12 text-right">
                        <Button label="Annuler" className="p-button-outlined p-button-secondary w-auto mt-3 mr-5" icon="pi pi-times"></Button>
                        <Button label="Enregistrer" className="p-button-outlined p-button-info w-auto mt-3" icon="pi pi-save" ></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCreate;
