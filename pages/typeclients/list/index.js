import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated data for types of clients
const typesClients = [
  { id: 1, name: 'Entreprise' },
  { id: 2, name: 'Particulier' },
  { id: 3, name: 'Laboratoire' },
  { id: 4, name: 'Administration' },
];

function List() {
  const [clients, setClients] = useState(typesClients); // Initial types of clients data
  const [client, setClient] = useState({ id: null, name: '' });
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [filters, setFilters] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    setFilters({
      global: { value: globalFilter, matchMode: FilterMatchMode.CONTAINS },
    });
  }, [globalFilter]);

  const openNewClientDialog = () => {
    setClient({ id: null, name: '' });
    setDialogVisible(true);
  };

  const openEditClientDialog = (client) => {
    setClient(client);
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
  };

  const deleteClient = () => {
    setClients(clients.filter((c) => c.id !== clientToDelete.id));
    setDeleteDialogVisible(false);
    toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Type de client supprimé', life: 3000 });
  };

  const actionBodyTemplate = (rowData) => (
    <>
      <Button
        icon="pi pi-pencil"
        className="mr-2"
        rounded text severity="success"
        onClick={() => openEditClientDialog(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className=""
        rounded text severity="danger"
        onClick={() => {
          setClientToDelete(rowData);
          setDeleteDialogVisible(true);
        }}
      />
    </>
  );

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  const saveClient = () => {
    if (!client.name.trim()) {
        toast.current.show({ 
            severity: 'warn', 
            summary: 'Attention', 
            detail: 'Le nom du type est requis', 
            life: 3000 
        });
        return;
    }

    if (client.id) {
        // Modification
        setClients(clients.map(c => 
            c.id === client.id ? { ...c, name: client.name } : c
        ));
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Type modifié', 
            life: 3000 
        });
    } else {
        // Création
        const maxId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) : 0;
        const newClient = { id: maxId + 1, name: client.name };
        setClients([...clients, newClient]);
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Type ajouté', 
            life: 3000 
        });
    }
    setDialogVisible(false);
    setClient({ id: null, name: '' });
};

const clientDialogFooter = (
    <>
        <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveClient} />
    </>
);



  const deleteDialogFooter = (
    <>
      <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
      <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteClient} />
    </>
  );

  const renderHeader = () => (
    <div className="flex justify-content-between">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={globalFilter} onChange={onGlobalFilterChange} placeholder="Rechercher type client" />
      </span>
      <Button
        type="button"
        icon="pi pi-user-plus"
        rounded outlined
        tooltip="Ajouter"
        tooltipOptions={{ position: 'top' }}
        className="p-button-outlined"
        onClick={openNewClientDialog}
      />
    </div>
  );

  const clientTemplate = (rowData) => <span><i className="pi pi-user" style={{ color: 'var(--primary-color)' }} />&nbsp;&nbsp;{rowData.name}</span>;

  return (
    <div className="card">
      <Toast ref={toast} />
      <span className="text-900 text-xl font-bold mb-4 block text-blue-700">
        <i className="pi pi-users" /> &nbsp;&nbsp;Liste des types de clients
      </span>
      <DataTable
        ref={dt}
        value={clients}
        header={renderHeader()}
        paginator
        rows={10}
        responsiveLayout="scroll"
        rowsPerPageOptions={[10, 25, 50]}
        filters={filters}
        size='small'
        className="datatable-responsive"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} types"
      >
        <Column field="name" header="Type de client" body={clientTemplate} style={{ width: '85%' }} sortable />
        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible'}} />
      </DataTable>

      <Dialog
        visible={deleteDialogVisible}
        style={{ width: '450px' }}
        header="Confirmer la suppression"
        modal
        footer={deleteDialogFooter}
        onHide={hideDeleteDialog}
      >
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {clientToDelete && <span>Confirmez-vous la suppression de cet élément ?</span>}
        </div>
      </Dialog>

      <Dialog
        visible={dialogVisible}
        style={{ width: '450px' }}
        header={
          <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
            {client.id ? 'Modifier le type de client' : 'Ajouter un type de client'}
          </span>
        }
        modal
        className="p-fluid"
        footer={clientDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">Nom du type de client</label>
          <InputText
            id="name"
            value={client.name}
            onChange={(e) => setClient({ ...client, name: e.target.value })}
            required
            autoFocus
          />
        </div>
      </Dialog>
    </div>
  );
}

export default List;
