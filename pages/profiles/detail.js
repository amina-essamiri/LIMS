import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState, useRef } from 'react';
import { Image } from 'primereact/image';
import { Dropdown } from 'primereact/dropdown';


function BlogEdit() {
    const tags = ['Software', 'Web'];
    const [dropdownValue2, setDropdownValue2] = useState(null);
    const dropdownValues2 = [
        { name: 'Super Admin' },
        { name: 'Admin'},
        { name: 'Utilisateur' },
    ];
    //Dropdown des fonctions
    const [dropdownValue, setDropdownValue] = useState(null);
    const dropdownValues = [
        { name: 'Gestionnaire' },
        { name: 'Employé' },
        { name: 'Directeur' },
        { name: 'Assistant' },
        { name: 'Ressources humaines'},
        { name: "Technologies de l'information" },
        { name: 'Finance' },
        { name: 'Marketing' },
    ];
    // The second dropdown for depatements
    const [dropdownValue1, setDropdownValue1] = useState(null);
    const dropdownValues1 = [
        { name: 'Biologie' },
        { name: 'Physico-Chimie'},
        { name: 'Recherche et Développement' },
        { name: 'Contrôle Qualité' },
        { name: 'Administration' },
        { name: "Formation et Sensibilisation de l'information" },
        { name: 'Informatique et Support Technique'},
        { name: 'Marketing'},
    ];
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
            <span className="block text-900 text-xl font-bold mb-4 text-blue-700">
                <i className="pi pi-user" />&nbsp;&nbsp;Mon Profil
            </span>
            <span className="block text-600 text-xl mb-4">Gérer les paramètres de votre profil</span>
            <div className="flex justify-content-between">
                <div className="col-6">
                    <div className="border-1 surface-border border-round p-fluid mb-4">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations personnelles</span>
                        <div className="p-3">
                            <div className="mb-4">
                                <InputText type="text" placeholder="Nom" />
                            </div>
                            <div className="mb-4">
                                <InputText type="text" placeholder="Prénom" />
                            </div>
                            <div className="mb-4">
                                <InputText type="text" placeholder="Courrier électronique" />
                            </div>
                            <div className="mb-4">
                                <InputText type="text" placeholder="Numéro de téléphone" />
                            </div>
                            <div className="mb-4">
                                <InputText type="text" placeholder="Adresse" />
                            </div>
                            <div className="mb-4">
                                <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Fonction" />
                            </div>
                            <div className="mb-4">
                                <Dropdown value={dropdownValue1} onChange={(e) => setDropdownValue1(e.value)} options={dropdownValues1} optionLabel="name" placeholder="Départements " />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="border-1 surface-border border-round p-fluid mb-4">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Informations sur le compte</span>
                        <div className="p-3">
                            <div className="mb-4">
                                <label htmlFor="city" className="font-medium text-900">
                                    Rôle
                                </label>
                                <Dropdown value={dropdownValue2} onChange={(e) => setDropdownValue2(e.value)} options={dropdownValues2} optionLabel="name" placeholder="Select" />
                            </div>
                            <div className="mb-4">
                                <InputText type="text" placeholder="Login" />
                            </div>
                            <div className="mb-4 ">
                                <InputText type="text" placeholder="Mot de passe" />
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
                    {/* buttons section  */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '50px' }}>
                        <Button 
                            className="p-button-danger p-button-outlined p-3" 
                            label="Annuler" 
                            icon="pi pi-fw pi-times" 
                            style={{ maxWidth: '200px' }} // Limits the width to 200px
                        />
                        <Button 
                            className="p-button-primary p-3" 
                            label="Enregistrer" 
                            icon="pi pi-fw pi-save" 
                            style={{ maxWidth: '200px' }} // Limits the width to 200px
                        />
                    </div>                   
                </div>
                
            </div>

            
    </div>

    );
}

export default BlogEdit;
