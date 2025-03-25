import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { CustomerService } from '../../../demo/service/CustomerService';
import { deleteUser } from 'aws-amplify/auth';

function List() {
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [filters, setFilters] = useState(null);

    const [loading, setLoading] = useState(true);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const router = useRouter();
    const toast = useRef(null);
    const dt = useRef(null);

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);
            return d;
        });
    };

    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    };
    const clearFilter = () => {
        initFilters();
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
        });
        setGlobalFilterValue('');
    };

    useEffect(() => {
        CustomerService.getCustomersLarge().then((data) => {
            setCustomers(getCustomers(data));
            setLoading(false);
        });
        initFilters();
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const deleteUser = () => {
        // let _customers = customers.filter((val) => val.id !== product.id);
        // setProducts(_customers);
        setDeleteUserDialog(false);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    };
    const confirmDeleteUser = (user) => {
        setCustomer(user);
        setDeleteUserDialog(true);
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-button-outlined mr-2"/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-outlined" onClick={() => confirmDeleteUser(rowData)} />
            </>
        );
};
    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteUser} />
        </>
    );
    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Global Search" className="w-full" />
                </span>
                <Button type="button" icon="pi pi-user-plus" label="Ajouter" className="p-button-outlined w-full sm:w-auto flex-order-0 sm:flex-order-1" onClick={() => router.push('/users/create')} />
            </div>
        );
    };

    const nameBodyTemplate = (customer) => {
        return (
            <>
                <span className="p-column-title">UTILISATEURS</span>
                {customer.name}
            </>
        );
    };

    const countryBodyTemplate = (customer) => {
        return (
            <>
                <img alt={customer.country.name} src={`/demo/images/flag/flag_placeholder.png`} className={'w-2rem mr-2 flag flag-' + customer.country.code} />
                <span className="image-text">{customer.country.name}</span>
            </>
        );
    };

    const createdByBodyTemplate = (customer) => {
        return (
            <div className="inline-flex align-items-center">
                <img alt={customer.representative.name} src={`/demo/images/avatar/${customer.representative.image}`} className="w-2rem mr-2" />
                <span>{customer.representative.name}</span>
            </div>
        );
    };

    const dateBodyTemplate = (customer) => {
        return formatDate(customer.date);
    };

    const activityBodyTemplate = (customer) => {
        return <ProgressBar value={customer.activity} showValue={false} style={{ height: '.5rem' }} />;
    };

    const header = renderHeader();

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-users" /> &nbsp;&nbsp;Liste des utilisateurs</span>
            <DataTable
                ref={dt}
                value={customers}
                header={header}
                paginator
                rows={10}
                responsiveLayout="scroll"
                rowsPerPageOptions={[10, 25, 50]}
                filters={filters}
                loading={loading}
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
            >
                <Column field="name" header="UTILISATEUR" body={nameBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '25%' }}></Column>
                <Column field="country.name" header="Pays" body={countryBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '25%' }}></Column>
                <Column field="date" header="Date d'entrée" body={dateBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '25%' }}></Column>
                {/* <Column field="representative.name" header="Created By" body={createdByBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '25%' }}></Column> */}
                <Column field="name" header="LOGIN" body={nameBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '25%' }}></Column>
                <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
            </DataTable>
            <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                                    <div className="flex align-items-center justify-content-center">
                                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                        {customer && (
                                            <span>
                                                Etes-vous sûr de vouloir supprimer <b>{customer.name}</b>?
                                            </span>
                                        )}
                                    </div>
                                </Dialog>
        </div>
    );
}

export default List;
