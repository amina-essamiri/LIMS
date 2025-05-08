import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState, useRef, useEffect } from 'react';

function ModifyClient() {
    const toast = useRef(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [dropdownValue1, setDropdownValue1] = useState(null);
    const [dropdownValue2, setDropdownValue2] = useState(null);
    const [value, setValue] = useState('');
    const [checked, setChecked] = useState(true);
    const router = useRouter();
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

    ];
    const close = () => router.push(`/fournisseurs/list`);

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
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

    useEffect(() => {
        // Simulate any initialization logic if required
    }, []);

    const checkboxStyle = {
        marginTop: '10px',
        marginRight: '10px',
        width: '20px',
        height: '20px',
        border: '2px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
        transition: 'background-color 0.3s, border-color 0.3s',
        marginLeft: '5px',
        marginTop: '15px',
        marginBottom: '15px',
    };

    const labelStyle = {
        fontSize: '15px',
        color: '#333',
        marginLeft: '15px',
        marginTop: '15px',
        marginBottom: '15px',
    };

    return (
        <div className="card">
                    <Toast ref={toast}></Toast>
                    <span className="text-900 text-xl font-bold mb-4 block text-blue-700 mb-5">
                        <i className="pi pi-user" />&nbsp;&nbsp;Modifier un fournisseur
                    </span>
                    <div className="flex justify-content-between">
                        <div className="col-6">
                            <div className="border-1 surface-border border-round p-fluid mb-4">
                                <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations personnelles</span>
                                <div className="p-3">
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-user" />
                                        <InputText type="text" placeholder="Nom" />
                                    </span>
                                    <br />
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-phone" />
                                        <InputText type="text" placeholder="Numéro de téléphone" />
                                    </span>
                                    <br />
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-at" />
                                        <InputText type="text" placeholder="Courrier électronique" />
                                    </span>
                                    <br />
        
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-map-marker" />
                                        <InputText type="text" placeholder="Adresse fournisseur" />
                                    </span>
                                    <br />
        
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-map" />
                                        <InputText type="text" placeholder="Code postal" />
                                    </span>
                                    <br />
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-globe" />
                                        <InputText type="text" placeholder="URL" />
                                    </span>
                                    <br />
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-print" />
                                        <InputText type="text" placeholder="Fax" />
                                    </span>
                                    <br />
                                    <span className="p-input-icon-left">
                                        <Dropdown value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)} options={cities} optionLabel="name" placeholder="Selectionner une ville" 
                                        filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}  />
                                        
                                    </span>
                                    <br />
                                    <span className="p-input-icon-left">
                                        <Dropdown value={dropdownValue1} onChange={(e) => setDropdownValue1(e.value)} options={dropdownValues1} optionLabel="name" placeholder="Secteurs d'activité" />
                                    </span>
                                    <br />
                                    <div className="mb-4">
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="border-1 surface-border border-round p-fluid mb-4">
                                <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations administratives et légales</span>
                                <div className="p-3">
                                    <div className="mb-4">
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-file-edit" />
                                            <InputText type="text" placeholder="Taxe Professionnelle" />
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-file" />
                                            <InputText type="text" placeholder="Registre du Commerce" />
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-tablet" />
                                            <InputText type="text" placeholder="Forme juridique" />
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-id-card" />
                                            <InputText type="text" placeholder="Identifiant Commun de l'Entreprise" />
                                        </span>
                                    </div>
                                    <div className="mb-4 ">
                                        <span className="p-input-icon-left">
                                        <i className="pi pi-id-card" />
                                        <InputText type="text" placeholder="CNSS" />
                                    </span>
                                    </div>
                                    {/* ================ */}
                                    <div className="mb-4 ">
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-credit-card" />
                                            <InputText type="text" placeholder="Remise fournisseur" />
                                        </span>
                                    </div>
                                    <div className="mb-4 ">
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-money-bill" />
                                            <InputText type="text" placeholder="Limite de crédit maximale" />
                                        </span>
                                    </div>
                                    <div className="mb-5 ">
                                        <label htmlFor="op" className="font-medium text-900">
                                        Observation client
                                        </label>
                                        <InputTextarea id="op" type="text" rows={2}></InputTextarea>
                                    </div>
                                    
                                </div>
                            </div>
                            {/* Checkbox Section */}
                            <div className="border-1 surface-border border-round p-fluid mb-4">
                                <label style={labelStyle}>
                                    <input type="checkbox" style={checkboxStyle} />
                                    Bloquer
                                </label>
                                {/* <label style={labelStyle}>
                                    <input type="checkbox" style={checkboxStyle} />
                                    Prélèveur
                                </label> */}
                            </div>
                            {/* Button Section */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '50px' }}>
                                <Button className="p-button-danger p-button-outlined p-3" label="Annuler" onClick={() => close()} icon="pi pi-fw pi-times" style={{ maxWidth: '200px' }} />
                                <Button className="p-button-primary p-3" label="Enregistrer" icon="pi pi-fw pi-save" style={{ maxWidth: '200px' }} />
                            </div>
                        </div>
                    </div>
                </div>
    );
}

export default ModifyClient;

