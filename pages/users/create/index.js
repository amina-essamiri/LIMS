import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import React, { useState, useRef, useEffect } from 'react';

function CreateType() {
    const router = useRouter();
    const toast = useRef(null);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [dropdownValue1, setDropdownValue1] = useState(null);
    const [dropdownValue2, setDropdownValue2] = useState(null);
    // States for form fields
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [adresse, setAdresse] = useState('');
    const [login, setLogin] = useState('');
    const [role, setRole] = useState(null);
    const [password, setPassword] = useState('');
    const [value, setValue] = useState('');
    const close = () => router.push(`/users/list`);

    const dropdownValues = [
        { name: 'Gestionnaire', code: 'NY' },
        { name: 'Employé', code: 'RM' },
        { name: 'Directeur', code: 'LDN' },
        { name: 'Assistant', code: 'IST' },
        { name: 'Ressources humaines', code: 'PRS' },
        { name: "Technologies de l'information", code: 'IST1' },
        { name: 'Finance', code: 'IST12' },
        { name: 'Marketing', code: 'IST13' },
    ];

    const dropdownValues1 = [
        { name: 'Biologie', code: 'NY' },
        { name: 'Physico-Chimie', code: 'RM' },
        { name: 'Recherche et Développement', code: 'LDN' },
        { name: 'Contrôle Qualité', code: 'IST' },
        { name: 'Administration', code: 'PRS' },
        { name: "Formation et Sensibilisation de l'information", code: 'IST1' },
        { name: 'Informatique et Support Technique', code: 'IST12' },
        { name: 'Marketing', code: 'IST13' },
    ];

    // Dropdown data
    const roleOptions = [
        { name: 'Super Admin' },
        { name: 'Admin' },
        { name: 'Utilisateur' },
    ];

    useEffect(() => {
        // Placeholder for any initialization logic
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
    // Touched state for validation
    const [touched, setTouched] = useState({
        name: false,
        surname: false,
        email: false,
        phone: false,
        adresse: false,
        login: false,
        role: false,
        password: false,
    });
    // Regex patterns
    const nameRegex = /^[A-Za-zÀ-ÿ\s\-.]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d+$/;

    // Validation
    const errors = {
        name: !name || !nameRegex.test(name),
        surname: !surname || !nameRegex.test(surname),
        email: !email || !emailRegex.test(email),
        phone: !phone || !phoneRegex.test(phone),
        adresse: !adresse,
        login: !login,
        role: !role,
        password: !password
    };

    // Helper to mark all fields as touched
    const touchAll = () => setTouched({
        name: true,
        surname: true,
        email: true,
        phone: true,
        adresse: true,
        login: true,
        role: true,
        password: true,
    });
    const handleSave = () => {
    // Mark all fields as touched
    touchAll();
    // Recalculate errors with current field values
    const currentErrors = {
        name: !name || !nameRegex.test(name),
        surname: !surname || !nameRegex.test(surname),
        email: !email || !emailRegex.test(email),
        phone: !phone || !phoneRegex.test(phone),
        login: !login,
        role: !role,
        password: !password
    };

    if (Object.values(currentErrors).every(v => v === false)) {
        toast.current.show({
            severity: 'success',
            summary: 'Succès',
            detail: 'Utilisateur créé avec succès',
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
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700 mb-5">
                <i className="pi pi-user" />&nbsp;&nbsp;Créer un utilisateur
            </span>
            <div className="flex justify-content-between">
                <div className="col-6">
                    <div className="border-1 surface-border border-round p-fluid mb-4">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations personnelles</span>
                        <div className="p-3">
                            <span className="p-input-icon-left">
                                <i className="pi pi-user" />
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
                            </span>
                            <br />

                            <span className="p-input-icon-left">
                                <i className="pi pi-user" />
                                <InputText
                                    type="text"
                                    placeholder="Prénom *"
                                    value={surname}
                                    onChange={e => setSurname(e.target.value)}
                                    onBlur={() => handleBlur('surname')}
                                    className={touched.surname && errors.surname ? 'p-invalid' : ''}
                                />
                                {touched.surname && errors.surname && (
                                    <small className="p-error">Veuillez entrer un prénom valide (lettres, espaces, - et . autorisés)</small>
                                )}
                            </span>
                            <br />

                            <span className="p-input-icon-left">
                                <i className="pi pi-phone" />
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
                            </span>
                            <br />

                            <span className="p-input-icon-left">
                                <i className="pi pi-at" />
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
                            </span>
                            <br />

                            <span className="p-input-icon-left">
                                <i className="pi pi-home" />
                                <InputText type="text" placeholder="Adresse" />
                            </span>
                            <br />

                            <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Fonction" />
                            <br />

                            <Dropdown value={dropdownValue1} onChange={(e) => setDropdownValue1(e.value)} options={dropdownValues1} optionLabel="name" placeholder="Départements" />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="border-1 surface-border border-round p-fluid mb-4">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations sur le compte</span>
                        <div className="p-3">
                            <div className="mb-4">
                                <Dropdown
                                    id="role"
                                    value={role}
                                    onChange={e => setRole(e.value)}
                                    options={roleOptions}
                                    optionLabel="name"
                                    placeholder="Sélectionnez un rôle"
                                    className={touched.role && errors.role ? 'p-invalid' : ''}
                                    onBlur={() => handleBlur('role')}
                                />
                                {touched.role && errors.role && (
                                    <small className="p-error">Rôle requis</small>
                                )}
                            </div>
                            <div className="mb-4">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-sign-in" />
                                    <InputText
                                        type="text"
                                        placeholder="Login *"
                                        value={login}
                                        onChange={e => setLogin(e.target.value)}
                                        onBlur={() => handleBlur('login')}
                                        className={touched.login && errors.login ? 'p-invalid' : ''}
                                    />
                                    {touched.login && errors.login && (
                                        <small className="p-error">Login requis</small>
                                    )}
                                </span>
                            </div>
                            <div className="mb-4 ">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-user" />
                                    <Password
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onBlur={() => handleBlur('password')}
                                        placeholder="Mot de passe *"
                                        promptLabel="Choisissez un mot de passe"
                                        weakLabel="Trop simple"
                                        mediumLabel="Complexité moyenne"
                                        strongLabel="Mot de passe complexe"
                                        feedback={true}
                                        className={touched.password && errors.password ? 'p-invalid' : ''}
                                    />
                                    {touched.password && errors.password && (
                                        <small className="p-error">Mot de passe requis</small>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Checkbox Section */}
                    <div className="border-1 surface-border border-round p-fluid mb-4">
                        <label style={labelStyle}>
                            <input type="checkbox" style={checkboxStyle} />
                            Collecteur
                        </label>
                        <label style={labelStyle}>
                            <input type="checkbox" style={checkboxStyle} />
                            Prélèveur
                        </label>
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
