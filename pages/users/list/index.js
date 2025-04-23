import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated User Service with Moroccan names and additional fields (Role and Login)
const UserService = {
    getUsers: () => {
        return Promise.resolve([
            { id: 1, name: 'Ahmed El Ouardi', role: 'Admin', login: 'aelouardi' , isCollecteur: true, isPreleveur: false},
            { id: 2, name: 'Fatima Zahra Belhaj', role: 'User', login: 'fzbelhaj', isCollecteur: false, isPreleveur: true },
            { id: 3, name: 'Youssef Benjelloun', role: 'Admin', login: 'ybenjelloun', isCollecteur: true, isPreleveur: true },
            { id: 4, name: 'Khadija Oussama', role: 'User', login: 'koussama', isCollecteur: true, isPreleveur: false },
            { id: 5, name: 'Mounir Laaroussi', role: 'User', login: 'mlaaroussi', isCollecteur: true, isPreleveur: false },
            { id: 6, name: 'Leila Boussaid', role: 'Admin', login: 'lboussaid', isCollecteur: false, isPreleveur: true },
            { id: 7, name: 'Reda El Hamdaoui', role: 'User', login: 'relhamdaoui', isCollecteur: true, isPreleveur: false },
            { id: 8, name: 'Sara Alaoui', role: 'Admin', login: 'salaoui', isCollecteur: true, isPreleveur: true },
            { id: 9, name: 'Omar Kabbaj', role: 'User', login: 'okabbaj', isCollecteur: true, isPreleveur: false },
            { id: 10, name: 'Nadia Lahlou', role: 'Admin', login: 'nlahlou', isCollecteur: true, isPreleveur: true },
        ]);
    },
    deleteUser: (id) => {
        return Promise.resolve({ success: true });
    },
};

function List() {
    const [users, setUsers] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);
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

    const userTemplate = (rowData) => (
        <span><i className="pi pi-user" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
    );

    const openEditUserPage = (id) => {
        router.push(`/users/edit/`);
    };

    const confirmDeleteUser = (user) => {
        UserService.deleteUser(user.id)
            .then(() => {
                toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Utilisateur supprimé', life: 3000 });
                setUsers(users.filter(u => u.id !== user.id)); // Remove user from the list after deletion
            })
            .catch(() => {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Échec de la suppression' });
            });
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditUserPage(rowData.id)} />
            <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDeleteUser(rowData)} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des utilisateurs" className="w-full" />
                </span>
                <Button type="button" icon="pi pi-user-plus" rounded outlined tooltip="Ajouter" tooltipOptions={{ position: 'top' }} className="p-button-outlined" onClick={() => router.push('/users/create')} />
            </div>
        );
    };
    const collecteurPreleveurTemplate = (rowData) => {
        const isCollecteur = rowData.isCollecteur;
        const isPreleveur = rowData.isPreleveur;
    
        if (isCollecteur && isPreleveur) {
            return (
                <span>
                    <i className="pi pi-check-circle text-green-500 mr-1" />
                    Collecteur / Prélèveur
                </span>
            );
        } else if (isCollecteur) {
            return (
                <span>
                    <i className="pi pi-check-circle text-green-500 mr-1" />
                    Collecteur
                </span>
            );
        } else if (isPreleveur) {
            return (
                <span>
                    <i className="pi pi-check-circle text-green-500 mr-1" />
                    Prélèveur
                </span>
            );
        } else {
            return <span className="text-400">—</span>; // Optional placeholder if none
        }
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-users" /> &nbsp;&nbsp;Liste des utilisateurs</span>
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
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} utilisateurs"
            >
                <Column field="name" header="Nom de l'utilisateur" body={userTemplate} headerClassName="white-space-nowrap" size="small" style={{ width: '30%' }} sortable />
                <Column field="role" header="Rôle" headerClassName="white-space-nowrap" size="small" style={{ width: '25%' }} sortable />
                <Column field="login" header="Login" headerClassName="white-space-nowrap" size="small" style={{ width: '30%' }} sortable />
                <Column
                    header="Collecteur / Prélèveur"
                    body={collecteurPreleveurTemplate}
                    headerClassName="white-space-nowrap"
                    style={{ width: '25%' }}
                />
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
            </DataTable>
        </div>
    );
}

export default List;
