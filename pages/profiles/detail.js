import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function BlogEdit() {
    const toast = useRef(null);
    const router = useRouter();

    // States for form fields
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [adresse, setAdresse] = useState('');
    const [login, setLogin] = useState('');
    const [role, setRole] = useState(null);
    const [password, setPassword] = useState('');

    // Dropdown data
    const roleOptions = [
        { name: 'Super Admin' },
        { name: 'Admin' },
        { name: 'Utilisateur' },
    ];
    const fonctionOptions = [
        { name: 'Gestionnaire' },
        { name: 'Employé' },
        { name: 'Directeur' },
        { name: 'Assistant' },
        { name: 'Ressources humaines' },
        { name: "Technologies de l'information" },
        { name: 'Finance' },
        { name: 'Marketing' },
    ];
    const departementOptions = [
        { name: 'Biologie' },
        { name: 'Physico-Chimie' },
        { name: 'Recherche et Développement' },
        { name: 'Contrôle Qualité' },
        { name: 'Administration' },
        { name: "Formation et Sensibilisation de l'information" },
        { name: 'Informatique et Support Technique' },
        { name: 'Marketing' },
    ];

    // Dropdown state
    const [fonction, setFonction] = useState(null);
    const [departement, setDepartement] = useState(null);

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
        adresse: !adresse,
        login: !login,
        role: !role,
        password: !password
    };

    if (Object.values(currentErrors).every(v => v === false)) {
        toast.current.show({
            severity: 'success',
            summary: 'Succès',
            detail: 'Profil mis à jour avec succès',
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
            <Toast ref={toast} position="top-right" />
            <span className="block text-900 text-xl font-bold mb-4 text-blue-700">
                <i className="pi pi-user" />&nbsp;&nbsp;Mon Profil
            </span>
            <span className="block text-600 text-xl mb-4">Gérer les paramètres de votre profil</span>
            <div className="flex justify-content-between">
                <div className="col-6">
                    <div className="border-1 surface-border border-round p-fluid mb-4">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations personnelles</span>
                        <div className="p-3">
                            {/* Nom */}
                            <div className="mb-4">
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
                            </div>
                            {/* Prénom */}
                            <div className="mb-4">
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
                            </div>
                            {/* Email */}
                            <div className="mb-4">
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
                            </div>
                            {/* Téléphone */}
                            <div className="mb-4">
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
                            </div>
                            {/* Adresse */}
                            <div className="mb-4">
                                <InputText
                                    type="text"
                                    placeholder="Adresse *"
                                    value={adresse}
                                    onChange={e => setAdresse(e.target.value)}
                                    onBlur={() => handleBlur('adresse')}
                                    className={touched.adresse && errors.adresse ? 'p-invalid' : ''}
                                />
                                {touched.adresse && errors.adresse && (
                                    <small className="p-error">Adresse requise</small>
                                )}
                            </div>
                            {/* Fonction */}
                            <div className="mb-4">
                                <Dropdown value={fonction} onChange={e => setFonction(e.value)} options={fonctionOptions} optionLabel="name" placeholder="Fonction" />
                            </div>
                            {/* Département */}
                            <div className="mb-4">
                                <Dropdown value={departement} onChange={e => setDepartement(e.value)} options={departementOptions} optionLabel="name" placeholder="Département" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="border-1 surface-border border-round p-fluid mb-4">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations sur le compte</span>
                        <div className="p-3">
                            {/* Rôle */}
                            <div className="mb-4">
                                <label htmlFor="role" className="font-medium text-900">
                                    Rôle *
                                </label>
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
                            {/* Login */}
                            <div className="mb-4">
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
                            </div>
                            {/* Mot de passe */}
                            <div className="mb-4">
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
                            </div>
                        </div>
                    </div>
                    {/* Checkboxes */}
                    <div className="border-1 surface-border border-round p-fluid mb-4">
                        <label style={{ display: '', alignItems: 'center', fontSize: '15px', color: '#333', marginLeft: '15px', marginTop: '15px', marginBottom: '15px' }}>
                            <input type="checkbox" style={{ marginTop: '10px', marginRight: '10px', width: '20px', height: '20px', border: '2px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', transition: 'background-color 0.3s, border-color 0.3s', marginLeft: '5px', marginTop: '15px', marginBottom: '15px' }} />
                            Collecteur
                        </label>
                        <label style={{ display: '', alignItems: 'center', fontSize: '15px', color: '#333', marginLeft: '15px', marginTop: '15px', marginBottom: '15px' }}>
                            <input type="checkbox" style={{ marginTop: '10px', marginRight: '10px', width: '20px', height: '20px', border: '2px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', transition: 'background-color 0.3s, border-color 0.3s', marginLeft: '5px', marginTop: '15px', marginBottom: '15px' }} />
                            Prélèveur
                        </label>
                    </div>
                    {/* Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '50px' }}>
                        <Button
                            className="p-button-danger p-button-outlined p-3"
                            label="Annuler"
                            icon="pi pi-fw pi-times"
                            onClick={() => { router.push(`/`); }}
                            style={{ maxWidth: '200px' }}
                        />
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
