import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState, useRef, useEffect } from 'react';

function ModifyClient() {
    const toast = useRef(null);
    const [selectedVille, setSelectedVille] = useState(null);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [dropdownValue1, setDropdownValue1] = useState(null);
    const [dropdownValue2, setDropdownValue2] = useState(null);
    const [value, setValue] = useState('');
    const [checked, setChecked] = useState(true);
    // State
        const [nom, setNom] = useState('Ahmed El Mansouri');
        const [telephone, setTelephone] = useState('+212612345678');
        const [email, setEmail] = useState('ahmed.elmansouri@gmail.com');
        const [typeClient, setTypeClient] = useState({ name: 'Entreprise', code: 'LDN' });
        const [ville, setVille] = useState({ name: 'Casablanca' });

        // Champs adresse et informations supplémentaires
            const [adresseClient, setAdresseClient] = useState('10, Avenue Hassan II, Casablanca');
            const [codePostal, setCodePostal] = useState('20000');
            const [url, setUrl] = useState('www.ahmedcompany.com');
            const [fax, setFax] = useState('0522123456');
            const [secteurActivite, setSecteurActivite] = useState({ name: 'Finance' });

            // Champs administratifs et légaux
            const [taxeProfessionnelle, setTaxeProfessionnelle] = useState('TP123456');
            const [registreCommerce, setRegistreCommerce] = useState('RC7891011');
            const [formeJuridique, setFormeJuridique] = useState('SARL');
            const [ice, setIce] = useState('ICE654321');
            const [cnss, setCnss] = useState('1234567');
            const [remiseClient, setRemiseClient] = useState('5%');
            const [limiteCredit, setLimiteCredit] = useState('100000');
            const [observationClient, setObservationClient] = useState('Client premium, à relancer chaque trimestre');

            // Checkbox
            const [bloquer, setBloquer] = useState(false);
        const [touched, setTouched] = useState({});
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
    const close = () => router.push(`/clients/list`);


    const villeOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
    const selectedVilleTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };
    const dropdownValues = [
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
    // Validation regex
    const validations = {
        nom: /^[A-Za-zÀ-ÿ\s\-.]+$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        telephone: /^\+?\d+$/,
        fax: /^\+?\d+$/,
    };

    const isICERequired = typeClient && 
        ['Entreprise', 'Administration', 'Laboratoire'].includes(typeClient.name);

    const errors = {
        nom: !nom 
        ? "Champ requis" 
        : !validations.nom.test(nom) 
            ? "Format nom invalide" 
            : "",
        email: !email 
        ? "Champ requis" 
        : !validations.email.test(email) 
            ? "Format email invalide" 
            : "",
        telephone: !telephone 
        ? "Champ requis" 
        : !validations.telephone.test(telephone) 
            ? "Format telephone invalide" 
            : "",
        fax: !fax 
        ? "Champ requis" 
        : !validations.fax.test(fax) 
            ? "Format fax invalide" 
            : "",
        typeClient: !typeClient,
        ville: !ville,
        ice: isICERequired && !ice // ICE required only for certain client types
    };

    const handleSubmit = () => {
        const newTouched = {
            nom: true,
            email: true,
            telephone: true,
            typeClient: true,
            ville: true,
            fax: true,
            ice: isICERequired 
        };
        setTouched(newTouched);

        if (Object.values(errors).every(v => v === false)) {
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'Client modifié avec succès',
                life: 3000
            });
        }
    };

    return (
        <div className="card">
                    <Toast ref={toast}></Toast>
                    <span className="text-900 text-xl font-bold mb-4 block text-blue-700 mb-5">
                        <i className="pi pi-user" />&nbsp;&nbsp;Modifier un client
                    </span>
                    <div className="flex justify-content-between">
                        <div className="col-6">
                            <div className="border-1 surface-border border-round p-fluid mb-4">
                                <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations personnelles</span>
                                <div className="p-3">
                                    <Dropdown 
                                        value={typeClient}
                                        onChange={(e) => setTypeClient(e.value)}
                                        options={dropdownValues}
                                        optionLabel="name"
                                        placeholder="Type Client *"
                                        className={touched.typeClient && errors.typeClient ? 'p-invalid' : ''}
                                        onBlur={() => setTouched({...touched, typeClient: true})}
                                    />
                                    {touched.typeClient && errors.typeClient && 
                                        <small className="p-error">Type client requis</small>
                                    }
                                    <br />
                                    <span className="p-input-icon-left">
                                            <i className="pi pi-user" />
                                            <InputText 
                                            value={nom}
                                            onChange={(e) => setNom(e.target.value)}
                                            placeholder='Nom *'
                                            onBlur={() => setTouched({...touched, nom: true})}
                                            className={touched.nom && errors.nom ? 'p-invalid' : ''}
                                        />
                                        {touched.nom && errors.nom && 
                                            <small className="p-error">{errors.nom}</small>}
                                        </span>
                                    <br />
                                    <span className="p-input-icon-left">
                                            <i className="pi pi-phone" />
                                            <InputText 
                                            value={telephone}
                                            onChange={(e) => setTelephone(e.target.value)}
                                            placeholder='Téléphone *'
                                            onBlur={() => setTouched({...touched, telephone: true})}
                                            className={touched.telephone && errors.telephone ? 'p-invalid' : ''}
                                        />
                                        {touched.telephone && errors.telephone && 
                                            <small className="p-error">{errors.telephone}</small>}
                                        </span>
                                    <br />
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-at" />
                                        <InputText 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Email *'
                                            onBlur={() => setTouched({...touched, email: true})}
                                            className={touched.email && errors.email ? 'p-invalid' : ''}
                                        />
                                        {touched.email && errors.email && 
                                            <small className="p-error">{errors.email}</small>}
                                    </span>
                                    <br />
        
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-map-marker" />
                                        <InputText value={adresseClient} onChange={e => setAdresseClient(e.target.value)} placeholder="Adresse client" />
                                    </span>
                                    <br />
        
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-map" />
                                        <InputText value={codePostal} onChange={e => setCodePostal(e.target.value)} placeholder="Code postal" />
                                    </span>
                                    <br />
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-globe" />
                                        <InputText value={url} onChange={e => setUrl(e.target.value)} placeholder="URL" />
                                    </span>
                                    <br />
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-phone" />
                                        <InputText 
                                            value={fax}
                                            onChange={(e) => setFax(e.target.value)}
                                            placeholder='Fax '
                                            onBlur={() => setTouched({...touched, fax: true})}
                                            className={touched.fax && errors.fax ? 'p-invalid' : ''}
                                        />
                                        {touched.fax && errors.fax && 
                                            <small className="p-error">{errors.fax}</small>
                                        }
                                    </span>
                                    <br />
                                    <span className="p-input-icon-left">
                                        <Dropdown 
                                            value={ville}
                                            onChange={(e) => setVille(e.value)}
                                            options={cities}
                                            optionLabel="name"
                                            filter 
                                            placeholder="Sélectionner une ville *"
                                            valueTemplate={selectedVilleTemplate}
                                            itemTemplate={villeOptionTemplate}
                                            className={touched.ville && errors.ville ? 'p-invalid' : ''}
                                            onBlur={() => setTouched({...touched, ville: true})}
                                        />
                                        {touched.ville && errors.ville && 
                                            <small className="p-error">Ville requise</small>}
                                        
                                    </span>
                                    <br />
                                    <span className="p-input-icon-left">
                                        <Dropdown value={dropdownValue1} onChange={(e) => setDropdownValue1(e.value)} options={dropdownValues1} optionLabel="name" placeholder="Secteurs d'activité" />
                                    </span>
                                    <br />
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
                                            <InputText value={taxeProfessionnelle} onChange={e => setTaxeProfessionnelle(e.target.value)} placeholder="Taxe Professionnelle" />
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-file" />
                                            <InputText value={registreCommerce} onChange={e => setRegistreCommerce(e.target.value)} placeholder="Registre du Commerce" />
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-tablet" />
                                            <InputText value={formeJuridique} onChange={e => setFormeJuridique(e.target.value)} placeholder="Forme juridique" />
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-id-card" />
                                            <InputText value={ice} onChange={e => setIce(e.target.value)} placeholder="Identifiant Commun de l'Entreprise" />
                                        </span>
                                    </div>
                                    <div className="mb-4 ">
                                        <span className="p-input-icon-left">
                                        <i className="pi pi-id-card" />
                                        <InputText value={cnss} onChange={e => setCnss(e.target.value)} placeholder="CNSS" />
                                    </span>
                                    </div>
                                    {/* ================ */}
                                    <div className="mb-4 ">
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-credit-card" />
                                            <InputText value={remiseClient} onChange={e => setRemiseClient(e.target.value)} placeholder="Remise client" />
                                        </span>
                                    </div>
                                    <div className="mb-4 ">
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-money-bill" />
                                            <InputText value={limiteCredit} onChange={e => setLimiteCredit(e.target.value)} placeholder="Limite de crédit maximale" />
                                        </span>
                                    </div>
                                    <div className="mb-5 ">
                                        <label htmlFor="op" className="font-medium text-900">
                                        Observation client
                                        </label>
                                        <InputTextarea value={observationClient} onChange={e => setObservationClient(e.target.value)} rows={2} placeholder="Observation client" />
                                    </div>
                                    
                                </div>
                            </div>
                            {/* Checkbox Section */}
                            <div className="border-1 surface-border border-round p-fluid mb-4">
                                <label style={labelStyle}>
                                    <input type="checkbox" style={checkboxStyle}  onChange={e => setBloquer(e.target.checked)} />
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
                                <Button 
                                    className="p-button-primary p-3" 
                                    label="Enregistrer" 
                                    icon="pi pi-fw pi-save" 
                                    style={{ maxWidth: '200px' }}
                                    onClick={handleSubmit}
                            />
                            </div>
                        </div>
                    </div>
                </div>
    );
}

export default ModifyClient;

