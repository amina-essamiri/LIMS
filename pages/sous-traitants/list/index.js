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

const SousTraitantService = {
    getSousTraitants: () => {
        return Promise.resolve([
            { 
                id: 1, 
                name: 'ANALYSIS SUPPORT SARL', 
                status: 'active', 
                email: 'contact@analysissupport.ma', 
                telephone: '0522987632', 
                ville: 'Casablanca', 
                ice: '001547896200033', 

            },
            { 
                id: 2, 
                name: 'LAB PROCESS', 
                status: 'active', 
                email: 'operations@labprocess.ma', 
                telephone: '0537001489', 
                ville: 'Rabat', 
                ice: '002365412300044', 

            },
            { 
                id: 3, 
                name: 'PRECISION LAB SERVICES', 
                status: 'active', 
                email: 'info@precisionlab.ma', 
                telephone: '0524456321', 
                ville: 'Marrakech', 
                ice: '003215478900055', 

            },
            { 
                id: 4, 
                name: 'BIOANALYTICA', 
                status: 'active', 
                email: 'direction@bioanalytca.ma', 
                telephone: '0535632147', 
                ville: 'Fès', 
                ice: '004589632100066', 

            },
            { 
                id: 5, 
                name: 'LAB ASSIST', 
                status: 'bloquer', 
                email: 'admin@labassist.ma', 
                telephone: '0523124896', 
                ville: 'Tanger', 
                ice: '005698741200077', 

            },
            { 
                id: 6, 
                name: 'AGADIR LAB ASSISTANCE', 
                status: 'active', 
                email: 'support@agadirlab.ma', 
                telephone: '0528459632', 
                ville: 'Agadir', 
                ice: '006325896300088', 

            },
            { 
                id: 7, 
                name: 'TESTECH MAROC', 
                status: 'active', 
                email: 'contact@testech.ma', 
                telephone: '0535124789', 
                ville: 'Meknès', 
                ice: '007412536400099', 

            },
            { 
                id: 8, 
                name: 'EAST LAB SERVICES', 
                status: 'bloquer', 
                email: 'info@eastlab.ma', 
                telephone: '0536896325', 
                ville: 'Oujda', 
                ice: '008523641500111', 

            },
            { 
                id: 9, 
                name: 'NORTH LAB SUPPORT', 
                status: 'active', 
                email: 'commercial@northlab.ma', 
                telephone: '0539125874', 
                ville: 'Tétouan', 
                ice: '009632587600122', 

            },
            { 
                id: 10, 
                name: 'DIAG LAB PARTNER', 
                status: 'bloquer', 
                email: 'partner@diaglab.ma', 
                telephone: '0525784123', 
                ville: 'El Jadida', 
                ice: '010147258700133', 
            }
        ]);
    },
    deleteSousTraitant: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const toast = useRef(null);
    const op = useRef(null);
    const router = useRouter();
    useEffect(() => {
        SousTraitantService.getSousTraitants()
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
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => router.push(`/sous-traitants/edit`)} />
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
        SousTraitantService.deleteUser(userToDelete.id)
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
                        onClick={() => router.push('/sous-traitants/create')} 
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
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-users" /> &nbsp;&nbsp;Liste des sous-traitants</span>
            
            <DataTable
                ref={op}
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} sous-traitants"
            >
                <Column field="name" header="Nom Complet" body={userTemplate} style={{ width: '20%' }} sortable />
                <Column field="email" header="Email" style={{ width: '15%' }} sortable />
                <Column field="telephone" header="Téléphone" style={{ width: '15%' }} sortable />
                <Column field="ville" header="Ville" style={{ width: '15%' }} sortable />
                <Column field="ice" header="ICE" style={{ width: '15%' }} sortable />
                <Column body={statusBodyTemplate} style={{ width: '20%' }} header="Status" />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '12rem' ,marginLeft: '40px'}} />
            </DataTable>
            <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteUserDialogFooter} onHide={() => setDeleteUserDialog(false)}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {userToDelete && (
                        <span>Confirmez-vous la suppression de ce sous-traitant?</span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}

export default List;
