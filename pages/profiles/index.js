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
        { name: 'Super Admin', code: 'NY' },
        { name: 'Admin', code: 'RM' },
        { name: 'Utilisateur', code: 'LDN' },
    ];

    return (
        <div className="card">
            <span className="block text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-user" />&nbsp;&nbsp;Mon Profil</span>
            <span className="block text-600 text-xl mb-4">Gérer les paramètres de votre profil</span>
            <div className="grid">
                <div className="col-12 lg:col-8 p-5">
                    {/* <span className="block text-900 font-bold text-xl mb-4" style={{marginLeft:'150px'}} >Votre photo de profil</span> */}
                    <div className="p-d-flex p-ai-center mb-5"  >
                            {/* Image */}
                            <img 
                                src="/layout/images/avatar1.png" 
                                alt="Profile" 
                                className="p-mr-3" 
                                style={{ borderRadius: '100%'
                                }} 
                            />
                            
                            {/* Button container */}
                            <div className="p-d-flex p-flex-column mt-5">
                                <Button label="Changer de photo" icon="pi pi-pencil" className="p-button-outlined p-mb-2" />
                                <Button label="Supprimer" icon="pi pi-trash" className="p-button-danger ml-3" />
                            </div>
                    </div>
                    <div className="grid formgrid p-fluid">
                        {/* {/* <div className="field mb-4 col-12 md:col-6"> 
                            <label htmlFor="phone" className="font-medium text-900">
                            Nom
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-user" />
                                <InputText type="text" placeholder="Nom" />
                            </span>
                        </div> 
                        {/* <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="phone" className="font-medium text-900">
                            Prénom
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-user" />
                                <InputText type="text" placeholder="Prénom" />
                            </span>
                        </div> */}
                        {/* <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="phone" className="font-medium text-900">
                            Numéro de téléphone
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-phone" />
                                <InputText type="text" placeholder="Numéro de téléphone" />
                            </span>
                        </div> */}
                        {/* <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">
                            Courrier électronique
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-at" />
                                <InputText type="text" placeholder="Email" />
                            </span>
                        </div> */}
                    </div>
                </div>
                <div className="col-12 lg:col-4" >
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
                            </div>
                        </div>
                        {/* <div className="border-1 surface-border border-round mb-4">
                            <span className="text-900 font-bold block border-bottom-1 surface-border p-3">Tags</span>
                            <div className="p-3 flex gap-2">
                                {tags.map((tag, i) => {
                                    return <Chip key={i} label={tag}></Chip>;
                                })}
                            </div>
                        </div> */}
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
                                <div className="mb-4">
                                    <InputText type="text" placeholder="Mot de passe" />
                                </div>
                                {/* <div className="mb-4">
                                    <InputText type="text" placeholder="Confirmation du Mot de passe" />
                                </div> */}
                            </div>
                        </div>
                        <div className="flex justify-content-between gap-3">
                            <Button className="p-button-danger flex-1 p-button-outlined" label="Annuller" icon="pi pi-fw pi-times"></Button>
                            <Button className="p-button-primary flex-1" label="Modifier" icon="pi pi-fw pi-check"></Button>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default BlogEdit;
