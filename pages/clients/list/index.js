import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import * as XLSX from 'xlsx'; // Importing the XLSX library for Excel export
import { remove } from 'aws-amplify/storage';

const UserService = {
    getUsers: () => {
        return Promise.resolve([
            { id: 1, name: 'Futur Developpement', type: 'Entreprise', status: 'active', email: 'futur@example.com', telephone: '0600000000', ville: 'Casablanca', ice: '123456789', rc: '10%' },
            { id: 2, name: 'ATLAS BLOUSE', type: 'Laboratoire', status: 'active', email: 'atlas@example.com', telephone: '0600000001', ville: 'Rabat', ice: '987654321', rc: '15%' },
            { id: 3, name: 'Youssef Benjelloun', type: 'Laboratoire', status: 'active', email: 'youssef@example.com', telephone: '0600000002', ville: 'Marrakech', ice: '192837465', rc: '5%' },
            { id: 4, name: 'Biotec Scientifique', type: 'Entreprise', status: 'active', email: 'biotec@example.com', telephone: '0600000003', ville: 'Fes', ice: '102938475', rc: '20%' },
            { id: 5, name: 'Mounir Laaroussi', type: 'Particulier', status: 'bloquer', email: 'mounir@example.com', telephone: '0600000004', ville: 'Tangier', ice: '564738291', rc: '0%' },
            { id: 6, name: 'Leila Boussaid', type: 'Entreprise', status: 'active', email: 'leila@example.com', telephone: '0600000005', ville: 'Agadir', ice: '234567890', rc: '10%' },
            { id: 7, name: 'MN TECHNOLOGY', type: 'Entreprise', status: 'active', email: 'mntech@example.com', telephone: '0600000006', ville: 'Meknes', ice: '345678901', rc: '12%' },
            { id: 8, name: 'Sara Alaoui', type: 'Particulier', status: 'bloquer', email: 'sara@example.com', telephone: '0600000007', ville: 'Oujda', ice: '456789012', rc: '8%' },
            { id: 9, name: 'IMALAB', type: 'Entreprise', status: 'active', email: 'imalab@example.com', telephone: '0600000008', ville: 'Tétouan', ice: '567890123', rc: '25%' },
            { id: 10, name: 'Nadia Lahlou', type: 'Particulier', status: 'bloquer', email: 'nadia@example.com', telephone: '0600000009', ville: 'El Jadida', ice: '678901234', rc: '18%' },
        ]);
    },
    deleteUser: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [contactDialog, setContactDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const toast = useRef(null);
    // contact logic overlay Panel
    const dt = useRef(null);
    const [contacts, setContacts] = useState([
        {
            nom: 'Youssef El Amrani',
            email: 'y.elamrani@marjane.co.ma',
            telephone: '0661122334',
            fonction: 'Finance',
            adresse: 'Marjane Hay Riad, Rabat'
        },
        {
            nom: 'Sara Benslimane',
            email: 's.benslimane@marjane.co.ma',
            telephone: '0677554433',
            fonction: 'Ressources humaines',
            adresse: 'Marjane Californie, Casablanca'
        }
    ]);
    
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
    const [editIndex, setEditIndex] = useState(null);
    // Empty row template
    const emptyContact = {
        nom: '',
        email: '',
        telephone: '',
        fonction: null,
        adresse: ''
    };
    const [formData, setFormData] = useState({ ...emptyContact });
    const fonctions = [
        { label: 'Gestionnaire', value: 'Gestionnaire' },
        { label: 'Directeur', value: 'Directeur' },
        { label: 'Ressources humaines', value: 'Ressources humaines' },
        { label: "Technologies de l'information", value: "Technologies de l'information" },
        { label: 'Finance', value: 'Finance' },
        { label: 'Marketing', value: 'Marketing' }
    ];
    const handleAddClick = () => {
        setFormData({ ...emptyContact });
        setFormMode('create');
        setShowForm(true);
    };

    const handleEditClick = (rowData, rowIndex) => {
        setFormData({ ...rowData });
        setEditIndex(rowIndex);
        setFormMode('edit');
        setShowForm(true);
    };

    const handleCancel = () => {
        setFormData({ ...emptyContact });
        setShowForm(false);
        setEditIndex(null);
    };

    const handleSave = () => {
        if (formMode === 'create') {
            setContacts((prev) => [...prev, formData]);
        } else if (formMode === 'edit') {
            const updated = [...contacts];
            updated[editIndex] = formData;
            setContacts(updated);
        }
        setShowForm(false);
        setFormData({ ...emptyContact });
        setEditIndex(null);
    };
    // Fonction (dropdown) cell editor
    const actionTemplate = (rowData, options) => {
        const remove = () => {
            const updated = contacts.filter((_, idx) => idx !== options.rowIndex);
            setContacts(updated);
        };
        
        const confirm1 = (event) => {
            confirmPopup({
                target: event.currentTarget,
                message: 'Voulez-vous supprimer ce contact ?',
                icon: 'pi pi-info-circle',
                defaultFocus: 'reject',
                acceptClassName: 'p-button-danger',
                accept: remove,
                reject: () => {
                    toast.current.show({ severity: 'warn', summary: 'Vous avez refusé la suppression', detail: 'Suppression annulée', life: 2000 });
                }
            });
        };

        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" severity='success' className="p-button-rounded p-button-text"  tooltip="Modifier"
                    tooltipOptions={{ position: 'top' }} onClick={() => handleEditClick(rowData, options.rowIndex)} />
                <Toast ref={toast} />
                <ConfirmPopup />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger" tooltip="Supprimer"
                    tooltipOptions={{ position: 'top' }} onClick={confirm1}  />
            </div>
        );
    };
    
    // End contact logic overlay Panel
    const op = useRef(null);
    const router = useRouter();
    useEffect(() => {
        UserService.getUsers()
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des utilisateurs' });
            });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <span
                className={`p-badge p-component ${rowData.status === 'active' ? 'p-badge-help' : 'p-badge-danger'}`}
                style={{
                    borderRadius: '12px',
                    padding: '16px 16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
            >
                <i
                    className={`pi ${rowData.status === 'active' ? 'pi-lock-open' : 'pi-lock'}`}
                    style={{ fontSize: '16px' }}
                ></i>
                {rowData.status === 'active' ? 'Active' : 'Bloqué'}
            </span>
        );
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-phone" rounded text severity="help" className="mr-2" tooltip="Contacter" tooltipOptions={{ position: 'top' }} onClick={(e) => op.current.toggle(e)} />
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => router.push(`/clients/edit`)} />
            <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDeleteUser(rowData)} />
        </>
    );

    const closeContactDialog = () => {
        setContactDialog(false);
    };

    const confirmDeleteUser = (user) => {
        setUserToDelete(user);
        setDeleteUserDialog(true);
    };

    const deleteUser = () => {
        UserService.deleteUser(userToDelete.id)
            .then(() => {
                toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Utilisateur supprimé', life: 3000 });
                setUsers(users.filter((u) => u.id !== userToDelete.id));
                setDeleteUserDialog(false);
            })
            .catch(() => {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec de la suppression' });
            });
    };

    const userTemplate = (rowData) => (
        <span><i className="pi pi-user" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des clients" className="w-full" />
                </span>
                <div>
                    {/* Importer Button */}
                    <input 
                        type="file" 
                        accept=".xlsx,.xls,.csv" 
                        onChange={handleImport} 
                        style={{ display: 'none' }} 
                        id="import-file" 
                    />
                    <Button 
                        icon="pi pi-upload" 
                        className="p-button-outlined p-button-rounded p-button-secondary mr-2" 
                        onClick={() => document.getElementById('import-file').click()} 
                        tooltip="Importer" 
                        tooltipOptions={{ position: 'top' }} 
                    />

                    {/* Exporter Button */}
                    <Button 
                        icon="pi pi-download" 
                        className="p-button-outlined p-button-rounded p-button-help mr-2" 
                        onClick={exportToExcel} 
                        tooltip="Exporter" 
                        tooltipOptions={{ position: 'top' }} 
                    />

                    {/* Ajouter Button */}
                    <Button 
                        type="button" 
                        icon="pi pi-user-plus" 
                        className="p-button-outlined p-button-rounded p-button-primary mr-2" 
                        onClick={() => router.push('/clients/create')} 
                        tooltip="Ajouter" 
                        tooltipOptions={{ position: 'top' }} 
                    />

                </div>
            </div>
        );
    };

    const deleteUserDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteUserDialog(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteUser} />
        </>
    );

    // Export to Excel function
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(users);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Clients');
        XLSX.writeFile(wb, 'clients_data.xlsx');
    };

    // Import from file function
    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const ab = event.target.result;
            const wb = XLSX.read(ab, { type: 'array' });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(ws);
            setUsers(data); // Update the state with imported data
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-users" /> &nbsp;&nbsp;Liste des clients</span>
            
            <DataTable
                ref={dt}
                value={users}
                header={renderHeader()}
                paginator
                rows={10}
                responsiveLayout="scroll"
                rowsPerPageOptions={[10, 25, 50]}
                filters={filters}
                loading={loading}
                size="small"
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} clients"
            >
                <Column field="name" header="Nom Complet" body={userTemplate} style={{ width: '20%' }} sortable />
                <Column field="type" header="Type Client" style={{ width: '15%' }} sortable />
                <Column field="email" header="Email" style={{ width: '15%' }} sortable />
                <Column field="telephone" header="Téléphone" style={{ width: '15%' }} sortable />
                <Column field="ville" header="Ville" style={{ width: '15%' }} sortable />
                <Column field="ice" header="ICE" style={{ width: '10%' }} sortable />
                <Column field="rc" header="RC" style={{ width: '15%' }}  sortable />
                <Column body={statusBodyTemplate} style={{ width: '10%' }} header="Status" />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '12rem' ,marginLeft: '30px'}} />
            </DataTable>
            {/* My contacts overlay Panel  */}
            <OverlayPanel ref={op} showCloseIcon closeOnEscape dismissable={false} style={{ minWidth: '50rem' }}>
                <div className="mb-3">
                    <Button
                        label="Ajouter Contact"
                        icon="pi pi-plus"
                        onClick={handleAddClick}
                        className="p-button-sm"
                    />
                </div>

                {showForm && (
                    <div className="p-3 mb-3 surface-border border-round border-1">
                        <div className="grid formgrid p-fluid">
                            <div className="field col">
                                <label>Nom</label>
                                <InputText value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} placeholder='Nom' />
                            </div>
                            <div className="field col">
                                <label>Email</label>
                                <InputText value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder='Email' />
                            </div>
                            <div className="field col">
                                <label>Téléphone</label>
                                <InputText value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} placeholder='Téléphone' />
                            </div>
                            <div className="field col">
                                <label>Fonction</label>
                                <Dropdown
                                    value={formData.fonction}
                                    options={fonctions}
                                    onChange={(e) => setFormData({ ...formData, fonction: e.value })}
                                    placeholder="Sélectionner"
                                />
                            </div>
                            <div className="field col">
                                <label>Adresse</label>
                                <InputText value={formData.adresse} onChange={(e) => setFormData({ ...formData, adresse: e.target.value })} placeholder='Adresse' />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <Button label="Enregistrer" icon="pi pi-save" outlined onClick={handleSave} />
                            <Button label="Annuler" icon="pi pi-times" severity="danger" outlined onClick={handleCancel} />
                        </div>
                    </div>
                )}

                <DataTable value={contacts}>
                    <Column field="nom" header="Nom" style={{ minWidth: '12rem' }} />
                    <Column field="email" header="Email" style={{ minWidth: '16rem' }} />
                    <Column field="telephone" header="Téléphone" style={{ minWidth: '12rem' }} />
                    <Column field="fonction" header="Fonction" style={{ minWidth: '16rem' }} />
                    <Column field="adresse" header="Adresse" style={{ minWidth: '16rem' }} />
                    <Column header="Actions" body={actionTemplate} style={{ minWidth: '10rem' }} />
                </DataTable>
            </OverlayPanel>

            {/* Delete Confirmation Dialog */}
            <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteUserDialogFooter} onHide={() => setDeleteUserDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {userToDelete && (
                        <span>Confirmez-vous la suppression de ce client?</span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}

export default List;
