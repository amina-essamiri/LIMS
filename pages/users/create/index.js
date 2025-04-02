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

function ProfileCreate() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [dropdownValue1, setDropdownValue1] = useState(null);
    const [dropdownValue2, setDropdownValue2] = useState(null);
    const [value, setValue] = useState('');
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
    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };
    const itemTemplate1 = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };
    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                Glisser-déposer l&apos;image ici
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
    useEffect(() => {
        setCountries([
            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ]);
    }, []);

    const itemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img
                    src={`/demo/images/flag/flag_placeholder.png`}
                    onError={(e) => (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                    className={'mr-2 flag flag-' + option.code.toLowerCase()}
                    style={{ width: '18px' }}
                    alt={option.name}
                />
                <div>{option.name}</div>
            </div>
        );
    };

    return (
        <div className="card">
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700 mb-5"><i className="pi pi-user" />&nbsp;&nbsp;Créer un utilisateur</span>
            <div className="grid ml-6">
                {/* <div className="col-12 lg:col-2">
                    <div className="text-900 font-medium text-xl mb-3">Profile</div>
                    <p className="m-0 p-0 text-600 line-height-3 mr-3">Odio euismod lacinia at quis risus sed vulputate odio.</p>
                </div> */}
                <div className="col-12 lg:col-10  ml-6">
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
                        {/* <div className="field mb-4 col-12 mt-4">
                            <label htmlFor="avatar" className="font-medium text-900">
                                Avatar
                            </label>
                            <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                            onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                            headerTemplate={headerTemplate} itemTemplate={itemTemplate1} emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                        </div> */}
                        
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
                                <i className="pi pi-home" />
                                <InputText type="text" placeholder="Adresse" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                        <label htmlFor="city" className="font-medium text-900">
                                Fonction
                            </label>
                            <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Select" />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="city" className="font-medium text-900">
                            Départements 
                            </label>
                            <Dropdown value={dropdownValue1} onChange={(e) => setDropdownValue1(e.value)} options={dropdownValues1} optionLabel="name" placeholder="Select" />
                        </div>
                        
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="city" className="font-medium text-900">
                            Rôle
                            </label>
                            <Dropdown value={dropdownValue2} onChange={(e) => setDropdownValue2(e.value)} options={dropdownValues2} optionLabel="name" placeholder="Select" />
                        </div>
                        
                        {/* <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="state" className="font-medium text-900">
                                State
                            </label>
                            <InputText id="state" type="text" />
                        </div> */}
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="phone" className="font-medium text-900">
                            Login
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-sign-in" />
                                <InputText type="text" placeholder="username" />
                            </span>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="phone" className="font-medium text-900">
                            Mot de passe
                            </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-user" />
                                <Password value={value} onChange={(e) => setValue(e.target.value)} />
                            </span>
                        </div>
                        <div className="field mb-4 col-12">
                            <label htmlFor="bio" className="font-medium text-900">
                                Bio
                            </label>
                            <InputTextarea id="bio" type="text" rows={5} autoResize></InputTextarea>
                        </div>
                        <div className="col-12 text-right">
                            <Button label="Annuler" className="p-button-outlined p-button-danger w-auto mt-3 mr-5" icon="pi pi-times"></Button>
                            <Button label="Enregistrer" className="p-button p-button-info w-auto mt-3" icon="pi pi-save" ></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCreate;
