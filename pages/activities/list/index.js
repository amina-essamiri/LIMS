import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated data for secteurs d'activités
const secteursActivites = [
    { id: 1, name: 'Scolaire' },
    { id: 2, name: 'Hôtellerie' },
    { id: 3, name: 'Construction aéronautique' },
    { id: 4, name: 'Agroalimentaire' },
    { id: 5, name: 'Environnement' },
    { id: 6, name: 'Textile' },
    { id: 7, name: 'Cosmétique' },
    { id: 8, name: 'Régie' },
    { id: 9, name: 'Restauration' },
    { id: 10, name: 'Santé' },
    
];

function List() {
  const [secteurs, setSecteurs] = useState(secteursActivites); // Initial secteurs data
  const [secteur, setSecteur] = useState({ id: null, name: '' });
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [secteurToDelete, setSecteurToDelete] = useState(null);
  const [filters, setFilters] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    setFilters({
      global: { value: globalFilter, matchMode: FilterMatchMode.CONTAINS },
    });
  }, [globalFilter]);

  const openNewSecteurDialog = () => {
    setSecteur({ id: null, name: '' });
    setDialogVisible(true);
  };

  const openEditSecteurDialog = (secteur) => {
    setSecteur(secteur);
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
  };

  const deleteSecteur = () => {
    setSecteurs(secteurs.filter((s) => s.id !== secteurToDelete.id));
    setDeleteDialogVisible(false);
    toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Secteur d\'activité supprimé', life: 3000 });
  };

  const actionBodyTemplate = (rowData) => (
    <>
      <Button
        icon="pi pi-pencil"
        className="mr-2"
        rounded text severity="success"
        onClick={() => openEditSecteurDialog(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className=""
        rounded text severity="danger"
        onClick={() => {
          setSecteurToDelete(rowData);
          setDeleteDialogVisible(true);
        }}
      />
    </>
  );

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };
  const saveSecteur = () => {
    if (!secteur.name.trim()) {
        toast.current.show({ 
            severity: 'warn', 
            summary: 'Attention', 
            detail: 'Le nom du secteur est requis', 
            life: 3000 
        });
        return;
    }

    if (secteur.id) {
        // Modification
        setSecteurs(secteurs.map(s => 
            s.id === secteur.id ? { ...s, name: secteur.name } : s
        ));
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Secteur d\'activité modifié', 
            life: 3000 
        });
    } else {
        // Création
        const maxId = secteurs.length > 0 ? Math.max(...secteurs.map(s => s.id)) : 0;
        const newSecteur = { id: maxId + 1, name: secteur.name };
        setSecteurs([...secteurs, newSecteur]);
        toast.current.show({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Secteur d\'activité ajouté', 
            life: 3000 
        });
    }
    setDialogVisible(false);
    setSecteur({ id: null, name: '' });
};


const secteurDialogFooter = (
    <>
        <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveSecteur} />
    </>
);


  const deleteSecteurDialogFooter = (
    <>
      <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
      <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteSecteur} />
    </>
  );

  const renderHeader = () => (
    <div className="flex justify-content-between">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={globalFilter} onChange={onGlobalFilterChange} placeholder="Rechercher secteur" />
      </span>
      <Button
        type="button"
        icon="pi pi-plus"
        // label="Ajouter"
        rounded outlined
        tooltip="Ajouter"
        tooltipOptions={{ position: 'top' }}
        className="p-button-outlined"
        onClick={openNewSecteurDialog}
      />
    </div>
  );

  const secteurTemplate = (rowData) => <span><i className="pi pi-th-large" style={{ color: 'var(--primary-color)' }} />&nbsp;&nbsp;{rowData.name}</span>;

  return (
    <div className="card" style={{ width: '100%' }}>
      <Toast ref={toast} />
      <span className="text-900 text-xl font-bold mb-4 block text-blue-700">
        <i className="pi pi-th-large" /> &nbsp;&nbsp;Liste des secteurs d&apos;activités
      </span>
      <DataTable
        ref={dt}
        value={secteurs}
        header={renderHeader()}
        paginator
        rows={10}
        responsiveLayout="scroll"
        rowsPerPageOptions={[10, 25, 50]}
        size='small'
        filters={filters}
        className="datatable-responsive"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} secteurs d'activités"
      >
        <Column field="name" header="Secteur d'activité" body={secteurTemplate} style={{ width: '85%' }} sortable />
        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}  bodyStyle={{ textAlign: 'center', overflow: 'visible'}}/>
      </DataTable>

      <Dialog
        visible={deleteDialogVisible}
        style={{ width: '450px' }}
        header="Confirmer la suppression"
        modal
        footer={deleteSecteurDialogFooter}
        onHide={hideDeleteDialog}
      >
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {secteurToDelete && <span>Confirmez-vous la suppression de cet élément ?</span>}
        </div>
      </Dialog>

      <Dialog
        visible={dialogVisible}
        style={{ width: '450px' }}
        // header={secteur.id ? 'Modifier le secteur d\'activité' : 'Ajouter un secteur d\'activité'}
        header={
          <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
            {secteur.id ? 'Modifier le secteur d\'activité' : 'Ajouter un secteur d\'activité'}
          </span>
        }
        modal
        className="p-fluid"
        footer={secteurDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">Nom du secteur d&apos;activité</label>
          <InputText
            id="name"
            value={secteur.name}
            onChange={(e) => setSecteur({ ...secteur, name: e.target.value })}
            required
            autoFocus
          />
        </div>
      </Dialog>
    </div>
  );
}

export default List;
