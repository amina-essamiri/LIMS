    import { useRouter } from 'next/router';
    import { Button } from 'primereact/button';
    import { Dropdown } from 'primereact/dropdown';
    import { InputText } from 'primereact/inputtext';
    import { Toast } from 'primereact/toast';
    import { Image } from 'primereact/image';
    import { Card } from 'primereact/card';
    import { InputTextarea } from 'primereact/inputtextarea';
    import { FloatLabel } from 'primereact/floatlabel';  // Import FloatLabel

    import React, { useState, useRef, useEffect } from 'react';

    function CreateType() {
        const router = useRouter();
        const toast = useRef(null);
        const [value, setValue] = useState('');
        // States for form fields
        const [name, setName] = useState('Laboratoire QEE');
        const [email, setEmail] = useState('contact@laboqee.ma');
        const [phone, setPhone] = useState('+212535608017');
        const close = () => router.push(`/`);
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
        const [selectedCountry, setSelectedCountry] = useState(cities.find(city => city.name === 'Fes'));

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

        useEffect(() => {
            // Placeholder for any initialization logic
        }, []);
        const [touched, setTouched] = useState({
        name: false,
        email: false,
        phone: false,
    });
        // Regex patterns
    const nameRegex = /^[A-Za-zÀ-ÿ\s\-.]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d+$/;

    // Validation
    const errors = {
        name: !name || !nameRegex.test(name),
        email: !email || !emailRegex.test(email),
        phone: !phone || !phoneRegex.test(phone),
    };

    // Helper to mark all fields as touched
    const touchAll = () => setTouched({
        name: true,
        email: true,
        phone: true,
    });
    const handleSave = () => {
    // Mark all fields as touched
    touchAll();
    // Recalculate errors with current field values
    const currentErrors = {
        name: !name || !nameRegex.test(name),
        email: !email || !emailRegex.test(email),
        phone: !phone || !phoneRegex.test(phone),
    };

    if (Object.values(currentErrors).every(v => v === false)) {
        toast.current.show({
            severity: 'success',
            summary: 'Succès',
            detail: 'les informations sont modifiées avec succès',
            life: 3000
        });
        // Submit logic here
    } else {
        toast.current.show({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Veuillez corriger les champs obligatoires.',
            life: 4000
        });
    }
    };
     // Helper for field blur
    const handleBlur = (field) => setTouched(prev => ({ ...prev, [field]: true }));
        return (
            <div className="card">
                <Toast ref={toast}></Toast>
                <span className="text-900 text-xl font-bold mb-5 block text-blue-700 mb-5">
                    <i className="pi pi-spin pi-exclamation-circle" style={{ fontSize: '1.5rem' }} />&nbsp;&nbsp;Détails du laboratoire
                </span>
                <div className="flex justify-content-between">
                    <div className="col-6">
                        <div className="border-1 surface-border border-round p-fluid mb-4">
                            <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations personnelles</span>
                            <div className="p-3 mt-3">
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText
                                            type="text"
                                            placeholder="Nom *"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            onBlur={() => handleBlur('name')}
                                            className={touched.name && errors.name ? 'p-invalid' : ''}
                                        />
                                        {touched.name && errors.name && (
                                            <small className="p-error">Veuillez entrer un nom valide (lettres, espaces, - et . autorisés)</small>
                                        )}
                                        <label htmlFor="username">Nom</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText
                                            type="email"
                                            placeholder="Courrier électronique *"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            onBlur={() => handleBlur('email')}
                                            className={touched.email && errors.email ? 'p-invalid' : ''}
                                        />
                                        {touched.email && errors.email && (
                                            <small className="p-error">Veuillez entrer une adresse e-mail valide</small>
                                        )}
                                        <label htmlFor="email">Email</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText value="www.laboqee.ma" onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="website">Adresse du site web</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText
                                            type="text"
                                            placeholder="Numéro de téléphone *"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            onBlur={() => handleBlur('phone')}
                                            className={touched.phone && errors.phone ? 'p-invalid' : ''}
                                        />
                                        {touched.phone && errors.phone && (
                                            <small className="p-error">Veuillez entrer un numéro valide (chiffres et + autorisés)</small>
                                        )}
                                        <label htmlFor="phone">Numéro de téléphone</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText
                                            type="text"
                                            placeholder="Numéro de téléphone *"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            onBlur={() => handleBlur('phone')}
                                            className={touched.phone && errors.phone ? 'p-invalid' : ''}
                                        />
                                        {touched.phone && errors.phone && (
                                            <small className="p-error">Veuillez entrer un numéro valide (chiffres et + autorisés)</small>
                                        )}
                                        <label htmlFor="fax">Fax</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-5">
                                    <span className="p-input-icon-left">
                                        <Dropdown
                                            value={selectedCountry}
                                            onChange={(e) => setSelectedCountry(e.value)}
                                            options={cities}
                                            optionLabel="name"
                                            placeholder="Sélectionner une ville"
                                            filter
                                            valueTemplate={selectedCountryTemplate}
                                            itemTemplate={countryOptionTemplate}
                                        />
                                    </span>
                                </div>
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText value="30020" onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="postalCode">Code Postal</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-2">
                                    <span>
                                        <InputTextarea id="op" type="text" placeholder="Adresse" rows={2} value="12, Rue 11 Hay Lalla Soukaina Zouagha haut"></InputTextarea>
                                    </span>
                                </div>
                            </div>

                        </div>
                        {/* Second divider */}
                        <div className="border-1 surface-border border-round p-fluid mb-4">
                            <div className="p-3 mt-4">
                                <div className="mb-4">
                                    <FloatLabel>
                                        <InputText value={value} onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="defaultTaxRate">Taux de TVA par défaut</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-4">
                                    <FloatLabel>
                                        <InputText value={value} onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="taxRate1">Taux de TVA 1</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-4">
                                    <FloatLabel>
                                        <InputText value={value} onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="taxRate2">Taux de TVA 2</label>
                                    </FloatLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="border-1 surface-border border-round p-fluid mb-4">
                            <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations Administratives et Légales</span>
                            <div className="p-3 mt-3">
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText value="QEE" onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="owner">Propriétaire</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText value="000196672000024" onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="ice">Identifiant Commun des Entreprises</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText value="7957931" onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="cnss">CNSS</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText value="30635" onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="rc">Registre du Commerce</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText value="13428391" onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="patente">Patente</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText value={value} onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="capital">Le capital social du laboratoire</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText value="40272181" onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="if">Identifiant Fiscal</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText value="007270000648500000034465" onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="accountNumber">Numéro de Compte</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText value="Attijariwafa bank agence Fès - Ennakhil" onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="bank">Banque</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-5">
                                    <span >
                                        <InputTextarea id="op" type="text" rows={2} placeholder='Adresse de la Banque' value="Rte Ain Smen Lot 9 Résidence Al Adarissa 9 commune Agdal - Fès"></InputTextarea>
                                    </span>
                                </div>
                                <div className="mb-5">
                                    <FloatLabel>
                                        <InputText value="BCMAMAMC" onChange={(e) => setValue(e.target.value)} />
                                        <label htmlFor="bic">Code BIC/SWIFT</label>
                                    </FloatLabel>
                                </div>
                                <div className="mb-2">
                                    <br />
                                </div>
                            </div>
                        </div>
                        {/* Button Section */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '50px' }}>
                            <Button className="p-button-danger p-button-outlined p-3" label="Annuler" onClick={() => close()} icon="pi pi-fw pi-times" style={{ maxWidth: '200px' }} />
                            <Button
                                className="p-button-primary p-3"
                                label="Enregistrer"
                                icon="pi pi-fw pi-save"
                                style={{ maxWidth: '200px' }}
                                onClick={handleSave}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default CreateType;
