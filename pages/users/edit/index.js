import { useRouter } from 'next/router';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import React, { useState, useRef, useEffect } from 'react';

function EditType() {
    const toast = useRef(null);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [dropdownValue1, setDropdownValue1] = useState(null);
    const [dropdownValue2, setDropdownValue2] = useState(null);
    const [value, setValue] = useState('');
    const router = useRouter();

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
    
    const dropdownValues2 = [
        { name: 'Super Admin', code: 'NY' },
        { name: 'Admin', code: 'RM' },
        { name: 'Utilisateur', code: 'LDN' },
    ];

    useEffect(() => {
        // Simulate fetching data
    }, []);
    const close = () => {
        router.push(`/users/list`);
    };
    // le style de checkbox
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
        display: '',
        alignItems: 'center',
        fontSize: '15px',
        color: '#333',
        marginLeft: '15px',
        marginTop: '15px',
        marginBottom: '15px',
        
    };

    const containerStyle = {
        display: 'flex',
        gap: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div className="card">
            <Toast ref={toast}></Toast>
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700 mb-5">
                <i className="pi pi-user" />&nbsp;&nbsp;Modifier un utilisateur
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
                                <i className="pi pi-user" />
                                <InputText type="text" placeholder="Prénom" />
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
                                <Dropdown value={dropdownValue2} onChange={(e) => setDropdownValue2(e.value)} options={dropdownValues2} optionLabel="name" placeholder="Rôle" />
                            </div>
                            <div className="mb-4">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-sign-in" />
                                    <InputText type="text" placeholder="Login" />
                                </span>
                            </div>
                            <div className="mb-4 ">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-user" />
                                    <Password value={value} onChange={(e) => setValue(e.target.value)} placeholder='Mot de passe' />
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* chechkboxs  */}
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
                        <Button className="p-button-danger p-button-outlined p-3" onClick={() => close()}
                        label="Annuler" icon="pi pi-fw pi-times" style={{ maxWidth: '200px' }} />
                        <Button className="p-button-primary p-3" label="Enregistrer" icon="pi pi-fw pi-save" style={{ maxWidth: '200px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditType;
