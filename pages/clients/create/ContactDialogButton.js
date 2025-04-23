import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react';

export default function ContactDialogButton() {
    const router = useRouter();
    const [contactDialog, setContactDialog] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        telephone: '',
        fonction: null,
        adresse: ''
    });

    const dropdownFonctions = [
        { name: 'Gestionnaire', code: 'NY' },
        { name: 'Employé', code: 'RM' },
        { name: 'Directeur', code: 'LDN' },
        { name: 'Assistant', code: 'IST' },
        { name: 'Ressources humaines', code: 'PRS' },
        { name: "Technologies de l'information", code: 'IST1' },
        { name: 'Finance', code: 'IST12' },
        { name: 'Marketing', code: 'IST13' },
    ];

    const openDialog = () => setContactDialog(true);
    const closeDialog = () => setContactDialog(false);

    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSave = () => {
        console.log('Contact enregistré :', formData);
        setContactDialog(false);
    };

    return (
        <>
            <Button
                type="button"
                icon="pi pi-user-plus"
                className="p-button-outlined p-button-rounded p-button-primary mr-2"
                onClick={openDialog}
                tooltip="Ajouter contact"
                tooltipOptions={{ position: 'top' }}
            />

            <Dialog
                visible={contactDialog}
                style={{ width: '450px', borderRadius: '10px', fontFamily: 'Arial, sans-serif' }}
                header={<span style={{ fontSize: '17px', fontWeight: 'bold', color: '#333' }}><i className="pi pi-info-circle" style={{ color: 'var(--primary-color)', width: '25px', fontSize: '18px' }} />&nbsp;Ajouter un contact</span>}
                modal
                footer={
                    <div className="p-d-flex p-jc-end" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <Button label="Annuler" icon="pi pi-times" className="p-button-outlined" onClick={closeDialog} />
                        <Button label="Enregistrer" icon="pi pi-check" className="p-button-primary" onClick={handleSave} />
                    </div>
                }
                onHide={closeDialog}
            >
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="nom">Nom</label>
                        <InputText id="nom" value={formData.nom} onChange={(e) => handleChange(e, 'nom')} placeholder="Entrer le nom" />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" value={formData.email} onChange={(e) => handleChange(e, 'email')} placeholder="Entrer l'email" />
                    </div>
                    <div className="field">
                        <label htmlFor="telephone">Téléphone</label>
                        <InputText id="telephone" value={formData.telephone} onChange={(e) => handleChange(e, 'telephone')} placeholder="Entrer le téléphone" />
                    </div>
                    <div className="field">
                        <label htmlFor="fonction">Fonction</label>
                        <Dropdown
                            id="fonction"
                            value={formData.fonction}
                            options={dropdownFonctions}
                            onChange={(e) => setFormData({ ...formData, fonction: e.value })}
                            optionLabel="name"
                            placeholder="Sélectionner une fonction"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="adresse">Adresse</label>
                        <InputText id="adresse" value={formData.adresse} onChange={(e) => handleChange(e, 'adresse')} placeholder="Entrer l'adresse" />
                    </div>
                </div>
            </Dialog>
        </>
    );
}
