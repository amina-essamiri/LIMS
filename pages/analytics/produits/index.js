import React, { useState, useRef } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

export default function List() {
  const toast = useRef(null);
  const dt = useRef(null);

  // Données matrice, groupes, familles, types, produits

  const matriceOptions = [
    { id: 1, name: 'Eau' },
    { id: 2, name: 'Air' },
    { id: 3, name: 'Surface' },
    { id: 4, name: 'Aliments' },
    { id: 5, name: 'Entiséptiques et désinféctants' },
    { id: 6, name: 'Cosmétiques' },
    { id: 7, name: 'Sols et sédiments' },
  ];

  const initialGroupes = [
    { id: 1, name: "Produits d'origine végétale", matriceId: 4 },
    { id: 2, name: "Produits alimentaires prêts à consommer", matriceId: 4 },
    { id: 3, name: "Produits d'origine animale", matriceId: 4 },
    { id: 4, name: "Produits de la mer et aquatiques", matriceId: 4 },
  ];

  const famillesList = [
    { id: 1, name: "Plats cuisinés, préparations culinaires, semi-conserves", groupeId: 2 },
    { id: 2, name: "Graisses animales", groupeId: 3 },
    { id: 3, name: "Laits et produits dérivés de lait", groupeId: 3 },
    { id: 4, name: "Ovoproduits", groupeId: 3 },
    { id: 5, name: "Produits alimentaires divers", groupeId: 2 },
    { id: 6, name: "Produits alimentaires prêts à être consommés", groupeId: 2 },
    { id: 7, name: "Produits alimentaires d’origine végétale", groupeId: 1 },
    { id: 8, name: "Viandes hachées, préparations de viandes et viandes séparées mécaniquement de boucherie", groupeId: 3 },
    { id: 9, name: "Escargots et cuisses de grenouilles", groupeId: 3 },
    { id: 10, name: "Produits de la mer", groupeId: 4 },
  ];

  const initialFamillesDeProduits = [
    { id: 1, groupeId: 2, familleId: 1 },
    { id: 2, groupeId: 3, familleId: 2 },
    { id: 3, groupeId: 3, familleId: 3 },
    { id: 4, groupeId: 3, familleId: 4 },
    { id: 5, groupeId: 2, familleId: 5 },
    { id: 6, groupeId: 2, familleId: 6 },
    { id: 7, groupeId: 1, familleId: 7 },
    { id: 8, groupeId: 3, familleId: 8 },
    { id: 9, groupeId: 3, familleId: 9 },
    { id: 10, groupeId: 4, familleId: 10 },
  ];

  const initialTypesProduits = [
    { id: 1, familleId: 7, name: "Jus de fruits pasteurisé" },
    { id: 2, familleId: 7, name: "Jus de fruits non pasteurisé" },
    { id: 3, familleId: 7, name: "Pâtes fraîches : Comprend les pâtes alimentaires nature ou farcies" },
    { id: 4, familleId: 7, name: "Plats préparés cuits à consommer-Plats surgelés à réchauffer" },
    { id: 5, familleId: 7, name: "Plats préparés crus, salade de pâtes, etc" },
    { id: 6, familleId: 7, name: "Produits alimentaires de suite pour bébé de plus de 6 mois" },
    { id: 7, familleId: 7, name: "Pâtisseries, mousse de fruits, mousse au chocolat et produits similaires." },
    { id: 8, familleId: 7, name: "Biscuits, céréales, barres de céréales et produits similaires" },
    { id: 9, familleId: 7, name: "Confitures, Compotes de fruits et pulpes de fruits" },
    { id: 10, familleId: 7, name: "Potages, bouillons, sauces, Mayonnaise et Sauces aux condiments" },
  ];

  const initialProduits = [
    { id: 1, typeProduitId: 1, name: "Beurre" },
    { id: 2, typeProduitId: 1, name: "Crème" },
    { id: 3, typeProduitId: 2, name: "Collagène" },
    { id: 4, typeProduitId: 3, name: "Produits de charcuterie crus soumis à dessiccation" },
    { id: 5, typeProduitId: 4, name: "Herbes aromatiques séchées" },
    { id: 6, typeProduitId: 5, name: "Pâtisserie non cuite" },
    { id: 7, typeProduitId: 6, name: "Fruits prédécoupés (prêts à être consommés)" },
    { id: 8, typeProduitId: 7, name: "Olives en saumure" },
    { id: 9, typeProduitId: 8, name: "Pulpes de fruits (avec traitement thermique)" },
    { id: 10, typeProduitId: 9, name: "Fruits séchés" },
  ];

  // États groupes
  const [groupes, setGroupes] = useState(initialGroupes);
  const [groupe, setGroupe] = useState({ id: null, name: '', matriceId: null });
  const [dialogVisible, setDialogVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [groupeToDelete, setGroupeToDelete] = useState(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  // États familles
  const [famillesDeProduits, setFamillesDeProduits] = useState(initialFamillesDeProduits);
  const [familleProduitDialogVisible, setFamilleProduitDialogVisible] = useState(false);
  const [familleProduit, setFamilleProduit] = useState({ id: null, groupeId: null, familleId: null });
  const [submittedFamille, setSubmittedFamille] = useState(false);
  const [familleProduitToDelete, setFamilleProduitToDelete] = useState(null);
  const [deleteFamilleDialogVisible, setDeleteFamilleDialogVisible] = useState(false);

  // États types produits
  const [typesProduits, setTypesProduits] = useState(initialTypesProduits);
  const [typeProduitDialogVisible, setTypeProduitDialogVisible] = useState(false);
  const [typeProduit, setTypeProduit] = useState({ id: null, familleId: null, name: '' });
  const [submittedType, setSubmittedType] = useState(false);
  const [typeProduitToDelete, setTypeProduitToDelete] = useState(null);
  const [deleteTypeDialogVisible, setDeleteTypeDialogVisible] = useState(false);

  // États produits
  const [produits, setProduits] = useState(initialProduits);
  const [produitDialogVisible, setProduitDialogVisible] = useState(false);
  const [produit, setProduit] = useState({ id: null, typeProduitId: null, name: '' });
  const [submittedProduit, setSubmittedProduit] = useState(false);
  const [produitToDelete, setProduitToDelete] = useState(null);
  const [deleteProduitDialogVisible, setDeleteProduitDialogVisible] = useState(false);

  // Onglet actif et filtres
  const [activeIndex, setActiveIndex] = useState(0);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

  // Helpers pour noms
  const getGroupeNameById = (id) => groupes.find(g => g.id === id)?.name || '';
  const getFamilleNameById = (id) => famillesList.find(f => f.id === id)?.name || '';
  const getFamilleNameForType = (id) => famillesList.find(f => f.id === id)?.name || '';
  const getTypeProduitName = (id) => typesProduits.find(t => t.id === id)?.name || '';

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setFilters({
      global: { value, matchMode: FilterMatchMode.CONTAINS }
    });
  };

  const renderHeader = () => (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <span className="p-input-icon-left w-full sm:w-20rem">
        <i className="pi pi-search" />
        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher" className="w-full" />
      </span>
      <Button
        icon="pi pi-plus"
        tooltip="Ajouter"
        tooltipOptions={{ position: 'top' }}
        rounded
        outlined
        onClick={() => {
          if (activeIndex === 0) openNewGroupeDialog();
          else if (activeIndex === 1) openNewFamilleProduitDialog();
          else if (activeIndex === 2) openNewTypeProduitDialog();
          else if (activeIndex === 3) openNewProduitDialog();
        }}
      />
    </div>
  );

  // Gestion groupes
  const openNewGroupeDialog = () => {
    setGroupe({ id: null, name: '', matriceId: null });
    setSubmitted(false);
    setDialogVisible(true);
  };
  const openEditGroupeDialog = (data) => {
    setGroupe({ ...data });
    setSubmitted(false);
    setDialogVisible(true);
  };
  const hideDialog = () => {
    setDialogVisible(false);
    setSubmitted(false);
  };
  const saveGroupe = () => {
    setSubmitted(true);
    if (!groupe.name.trim() || !groupe.matriceId) {
      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir tous les champs.' });
      return;
    }
    if (groupe.id) {
      setGroupes(prev => prev.map(g => (g.id === groupe.id ? groupe : g)));
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Groupe modifié.' });
    } else {
      const newId = groupes.length ? Math.max(...groupes.map(g => g.id)) + 1 : 1;
      setGroupes(prev => [...prev, { ...groupe, id: newId }]);
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Groupe ajouté.' });
    }
    setDialogVisible(false);
  };
  const confirmDeleteGroupe = (data) => {
    setGroupeToDelete(data);
    setDeleteDialogVisible(true);
  };
  const deleteGroupe = () => {
    setGroupes(prev => prev.filter(g => g.id !== groupeToDelete.id));
    setDeleteDialogVisible(false);
    toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Groupe supprimé.' });
    setGroupeToDelete(null);
  };

  // Gestion familles produits
  const openNewFamilleProduitDialog = () => {
    setFamilleProduit({ id: null, groupeId: null, familleId: null });
    setSubmittedFamille(false);
    setFamilleProduitDialogVisible(true);
  };
  const openEditFamilleProduitDialog = (data) => {
    setFamilleProduit({ ...data });
    setSubmittedFamille(false);
    setFamilleProduitDialogVisible(true);
  };
  const hideFamilleProduitDialog = () => {
    setFamilleProduitDialogVisible(false);
    setSubmittedFamille(false);
  };
  const saveFamilleProduit = () => {
    setSubmittedFamille(true);
    if (!familleProduit.groupeId || !familleProduit.familleId) {
      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner groupe et famille.' });
      return;
    }
    if (familleProduit.id) {
      setFamillesDeProduits(prev => prev.map(t => (t.id === familleProduit.id ? familleProduit : t)));
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Famille modifiée.' });
    } else {
      const newId = famillesDeProduits.length ? Math.max(...famillesDeProduits.map(t => t.id)) + 1 : 1;
      setFamillesDeProduits(prev => [...prev, { ...familleProduit, id: newId }]);
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Famille ajoutée.' });
    }
    setFamilleProduitDialogVisible(false);
  };
  const confirmDeleteFamilleProduit = (data) => {
    setFamilleProduitToDelete(data);
    setDeleteFamilleDialogVisible(true);
  };
  const deleteFamilleProduit = () => {
    setFamillesDeProduits(prev => prev.filter(t => t.id !== familleProduitToDelete.id));
    setDeleteFamilleDialogVisible(false);
    toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Famille supprimée.' });
    setFamilleProduitToDelete(null);
  };

  // Gestion types produits
  const openNewTypeProduitDialog = () => {
    setTypeProduit({ id: null, familleId: null, name: '' });
    setSubmittedType(false);
    setTypeProduitDialogVisible(true);
  };
  const openEditTypeProduitDialog = (data) => {
    setTypeProduit({ ...data });
    setSubmittedType(false);
    setTypeProduitDialogVisible(true);
  };
  const hideTypeProduitDialog = () => {
    setTypeProduitDialogVisible(false);
    setSubmittedType(false);
  };
  const saveTypeProduit = () => {
    setSubmittedType(true);
    if (!typeProduit.familleId || !typeProduit.name.trim()) {
      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Veuillez saisir un nom et sélectionner une famille.' });
      return;
    }
    if (typeProduit.id) {
      setTypesProduits(prev => prev.map(t => (t.id === typeProduit.id ? typeProduit : t)));
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Type modifié.' });
    } else {
      const newId = typesProduits.length ? Math.max(...typesProduits.map(t => t.id)) + 1 : 1;
      setTypesProduits(prev => [...prev, { ...typeProduit, id: newId }]);
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Type ajouté.' });
    }
    setTypeProduitDialogVisible(false);
  };
  const confirmDeleteTypeProduit = (data) => {
    setTypeProduitToDelete(data);
    setDeleteTypeDialogVisible(true);
  };
  const deleteTypeProduit = () => {
    setTypesProduits(prev => prev.filter(t => t.id !== typeProduitToDelete.id));
    setDeleteTypeDialogVisible(false);
    toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Type supprimé.' });
    setTypeProduitToDelete(null);
  };

  // Gestion produits
  const openNewProduitDialog = () => {
    setProduit({ id: null, typeProduitId: null, name: '' });
    setSubmittedProduit(false);
    setProduitDialogVisible(true);
  };
  const openEditProduitDialog = (data) => {
    setProduit({ ...data });
    setSubmittedProduit(false);
    setProduitDialogVisible(true);
  };
  const hideProduitDialog = () => {
    setProduitDialogVisible(false);
    setSubmittedProduit(false);
  };
  const saveProduit = () => {
    setSubmittedProduit(true);
    if (!produit.typeProduitId || !produit.name.trim()) {
      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Veuillez saisir un nom et sélectionner un type de produit.' });
      return;
    }
    if (produit.id) {
      setProduits(prev => prev.map(p => (p.id === produit.id ? produit : p)));
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Produit modifié.' });
    } else {
      const newId = produits.length ? Math.max(...produits.map(p => p.id)) + 1 : 1;
      setProduits(prev => [...prev, { ...produit, id: newId }]);
      toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Produit ajouté.' });
    }
    setProduitDialogVisible(false);
  };
  const confirmDeleteProduit = (data) => {
    setProduitToDelete(data);
    setDeleteProduitDialogVisible(true);
  };
  const deleteProduit = () => {
    setProduits(prev => prev.filter(p => p.id !== produitToDelete.id));
    setDeleteProduitDialogVisible(false);
    toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Produit supprimé.' });
    setProduitToDelete(null);
  };

  // Colonnes actions
  const actionBodyTemplateGroupes = (rowData) => (
    <>
      <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditGroupeDialog(rowData)} />
      <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDeleteGroupe(rowData)} />
    </>
  );
  const actionBodyTemplateFamilles = (rowData) => (
    <>
      <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditFamilleProduitDialog(rowData)} />
      <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDeleteFamilleProduit(rowData)} />
    </>
  );
  const actionBodyTemplateTypes = (rowData) => (
    <>
      <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditTypeProduitDialog(rowData)} />
      <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDeleteTypeProduit(rowData)} />
    </>
  );
  const actionBodyTemplateProduits = (rowData) => (
    <>
      <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditProduitDialog(rowData)} />
      <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDeleteProduit(rowData)} />
    </>
  );
  const groupeTemplate = (rowData) => (
        <span style={{ padding: '5px'}} ><i className="pi pi-folder" style={{ color: 'var(--primary-color)' }} /> &nbsp;&nbsp;{rowData.name}</span>
    );
    
    const famillyTemplate = (rowData) => (
        <span style={{ padding: '5px'}} ><i className="pi pi-tags" style={{ color: 'var(--primary-color)' }} /> &nbsp;&nbsp;{getGroupeNameById(rowData.groupeId)}</span>
    );
    const  typeTemplate = (rowData) => (
        <span style={{ padding: '5px'}} ><i className="pi pi-list" style={{ color: 'var(--primary-color)' }} /> &nbsp;&nbsp;{getFamilleNameForType(rowData.familleId)}</span>
    );
    const produitTemplate = (rowData) => (
        <span style={{ padding: '5px'}} ><i className="pi pi-box" style={{ color: 'var(--primary-color)' }} /> &nbsp;&nbsp;{getTypeProduitName(rowData.typeProduitId)}</span>
    );

  return (
    <div className="card p-5">
      <Toast ref={toast} />
      <TabMenu
        model={[
          { label: 'Groupes de familles de produits', icon: 'pi pi-folder', command: () => setActiveIndex(0) },
          { label: 'Familles de produits', icon: 'pi pi-tags', command: () => setActiveIndex(1) },
          { label: 'Types de produits', icon: 'pi pi-list', command: () => setActiveIndex(2) },
          { label: 'Produits', icon: 'pi pi-box', command: () => setActiveIndex(3) },
        ]}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      />

      <div style={{ marginTop: '1rem' }}>
        {activeIndex === 0 && (
          <>
            <DataTable
              value={groupes}
              header={renderHeader()}
              paginator
              rows={10}
              filters={filters}
              globalFilterFields={['name']}
              size="small"
              className="datatable-responsive"
              ref={dt}
              rowsPerPageOptions={[10, 25, 50]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} groupes"
            >
              <Column field="name" header="Groupe de famille" body={groupeTemplate} sortable style={{ width: '65%' }} />
              <Column header="Matrice" body={(rowData) => {
                const matrice = matriceOptions.find(m => m.id === rowData.matriceId);
                return matrice ? matrice.name : '';
              }} sortable style={{ width: '25%' }} />
              <Column body={actionBodyTemplateGroupes} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center' }} />
            </DataTable>
          </>
        )}

        {activeIndex === 1 && (
          <>
            <DataTable
              value={famillesDeProduits}
              header={renderHeader()}
              paginator
              rows={10}
              filters={filters}
              globalFilterFields={['groupeId', 'familleId']}
              size="small"
              className="datatable-responsive"
              ref={dt}
              rowsPerPageOptions={[10, 25, 50]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} familles"
            >
              <Column
                field="groupeId"
                header="Groupe de famille"
                // body={(rowData) => getGroupeNameById(rowData.groupeId)}
                sortable
                style={{ width: '40%' }}
                body={famillyTemplate}
              />
              <Column
                field="familleId"
                header="Famille de produit"
                body={(rowData) => getFamilleNameById(rowData.familleId)}
                sortable
                style={{ width: '40%' }}
              />
              <Column body={actionBodyTemplateFamilles} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center' }} />
            </DataTable>
          </>
        )}

        {activeIndex === 2 && (
          <>
            <DataTable
              value={typesProduits}
              header={renderHeader()}
              paginator
              rows={10}
              filters={filters}
              globalFilterFields={['familleId', 'name']}
              size="small"
              className="datatable-responsive"
              ref={dt}
              rowsPerPageOptions={[10, 25, 50]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} types"
            >
              <Column
                field="familleId"
                header="Famille de produit"
                body={typeTemplate}
                // body={(rowData) => getFamilleNameForType(rowData.familleId)}
                sortable
                style={{ width: '40%' }}
              />
              <Column field="name" header="Type de produit" sortable style={{ width: '50%' }} />
              <Column body={actionBodyTemplateTypes} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center' }} />
            </DataTable>
          </>
        )}

        {activeIndex === 3 && (
          <>
            <DataTable
              value={produits}
              header={renderHeader()}
              paginator
              rows={10}
              filters={filters}
              globalFilterFields={['typeProduitId', 'name']}
              size="small"
              className="datatable-responsive"
              ref={dt}
              rowsPerPageOptions={[10, 25, 50]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} produits"
            >
              <Column
                field="typeProduitId"
                header="Type de produit"
                body={produitTemplate}
                // body={(rowData) => getTypeProduitName(rowData.typeProduitId)}
                sortable
                style={{ width: '40%' }}
              />
              <Column field="name" header="Produit" sortable style={{ width: '50%' }} />
              <Column body={actionBodyTemplateProduits} headerStyle={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center' }} />
            </DataTable>
          </>
        )}
      </div>

      {/* Dialogue groupe */}
      <Dialog
        visible={dialogVisible}
        style={{ width: '450px' }}
        header={
          <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
            {groupe.id ? "Modifier un groupe" : "Ajouter un groupe"}
          </span>
        }
        modal
        className="p-fluid"
        footer={
          <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveGroupe} />
          </>
        }
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">Nom Groupe de famille</label>
          <InputText
            id="name"
            value={groupe.name}
            onChange={(e) => setGroupe({ ...groupe, name: e.target.value })}
            required
            autoFocus
            className={submitted && !groupe.name.trim() ? 'p-invalid' : ''}
          />
          {submitted && !groupe.name.trim() && <small className="p-error">Le nom est requis.</small>}
        </div>
        <div className="field mt-3">
          <label htmlFor="matrice">Matrice</label>
          <Dropdown
            id="matrice"
            value={groupe.matriceId}
            options={matriceOptions}
            onChange={(e) => setGroupe({ ...groupe, matriceId: e.value })}
            optionLabel="name"
            placeholder="Sélectionner une matrice"
            className={submitted && !groupe.matriceId ? 'p-invalid' : ''}
          />
          {submitted && !groupe.matriceId && <small className="p-error">La matrice est requise.</small>}
        </div>
      </Dialog>

      {/* Dialogue famille produit */}
      <Dialog
        visible={familleProduitDialogVisible}
        style={{ width: '550px' }}
        header={
          <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
            {familleProduit.id ? "Modifier une famille de produit" : "Ajouter une famille de produit"}
          </span>
        }
        modal
        className="p-fluid"
        footer={
          <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideFamilleProduitDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveFamilleProduit} />
          </>
        }
        onHide={hideFamilleProduitDialog}
      >
        <div className="field">
          <label htmlFor="name">Famille de produit</label>
          <InputText
            id="name"
            value={familleProduit.name}
            onChange={(e) => setFamilleProduit({ ...familleProduit, name: e.target.value })}
            required
            autoFocus
            />
        </div>
        <div className="field">
          <label htmlFor="groupe">Groupe de famille</label>
          <Dropdown
            id="groupe"
            value={familleProduit.groupeId}
            options={groupes}
            onChange={(e) => setFamilleProduit({ ...familleProduit, groupeId: e.value })}
            optionLabel="name"
            placeholder="Sélectionner un groupe"
            className={submittedFamille && !familleProduit.groupeId ? 'p-invalid' : ''}
          />
          {submittedFamille && !familleProduit.groupeId && <small className="p-error">Le groupe est requis.</small>}
        </div>
        
      </Dialog>

      {/* Dialogue type produit */}
      <Dialog
        visible={typeProduitDialogVisible}
        style={{ width: '800px' }}
        header={
          <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
            {typeProduit.id ? "Modifier un type de produit" : "Ajouter un type de produit"}
          </span>
        }
        modal
        className="p-fluid"
        footer={
          <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideTypeProduitDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveTypeProduit} />
          </>
        }
        onHide={hideTypeProduitDialog}
      >
        <div className="field">
          <label htmlFor="famille">Famille de produit</label>
          <Dropdown
            id="famille"
            value={typeProduit.familleId}
            options={famillesList}
            onChange={(e) => setTypeProduit({ ...typeProduit, familleId: e.value })}
            optionLabel="name"
            placeholder="Sélectionner une famille"
            className={submittedType && !typeProduit.familleId ? 'p-invalid' : ''}
          />
          {submittedType && !typeProduit.familleId && <small className="p-error">La famille est requise.</small>}
        </div>
        <div className="field mt-3">
          <label htmlFor="name">Nom du type de produit</label>
          <InputText
            id="name"
            value={typeProduit.name}
            onChange={(e) => setTypeProduit({ ...typeProduit, name: e.target.value })}
            required
            autoFocus
            className={submittedType && !typeProduit.name.trim() ? 'p-invalid' : ''}
          />
          {submittedType && !typeProduit.name.trim() && <small className="p-error">Le nom est requis.</small>}
        </div>
      </Dialog>

      {/* Dialogue produit */}
      <Dialog
        visible={produitDialogVisible}
        style={{ width: '600px' }}
        header={
          <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
            {produit.id ? "Modifier un produit" : "Ajouter un produit"}
          </span>
        }
        modal
        className="p-fluid"
        footer={
          <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideProduitDialog} />
            <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={saveProduit} />
          </>
        }
        onHide={hideProduitDialog}
      >
        <div className="field">
          <label htmlFor="typeProduit">Type de produit</label>
          <Dropdown
            id="typeProduit"
            value={produit.typeProduitId}
            options={typesProduits}
            onChange={(e) => setProduit({ ...produit, typeProduitId: e.value })}
            optionLabel="name"
            placeholder="Sélectionner un type"
            className={submittedProduit && !produit.typeProduitId ? 'p-invalid' : ''}
          />
          {submittedProduit && !produit.typeProduitId && <small className="p-error">Le type est requis.</small>}
        </div>
        <div className="field mt-3">
          <label htmlFor="name">Nom du produit</label>
          <InputText
            id="name"
            value={produit.name}
            onChange={(e) => setProduit({ ...produit, name: e.target.value })}
            required
            autoFocus
            className={submittedProduit && !produit.name.trim() ? 'p-invalid' : ''}
          />
          {submittedProduit && !produit.name.trim() && <small className="p-error">Le nom est requis.</small>}
        </div>
      </Dialog>

      {/* Dialogues suppression */}
      <Dialog
        visible={deleteDialogVisible}
        style={{ width: '350px' }}
        header="Confirmer la suppression"
        modal
        footer={
          <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteDialogVisible(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteGroupe} />
          </>
        }
        onHide={() => setDeleteDialogVisible(false)}
      >
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {groupeToDelete && <span>Confirmez-vous la suppression du groupe <b>{groupeToDelete.name}</b> ?</span>}
        </div>
      </Dialog>

      <Dialog
        visible={deleteFamilleDialogVisible}
        style={{ width: '350px' }}
        header="Confirmer la suppression"
        modal
        footer={
          <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteFamilleDialogVisible(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteFamilleProduit} />
          </>
        }
        onHide={() => setDeleteFamilleDialogVisible(false)}
      >
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {familleProduitToDelete && <span>Confirmez-vous la suppression de cette famille de produit ?</span>}
        </div>
      </Dialog>

      <Dialog
        visible={deleteTypeDialogVisible}
        style={{ width: '350px' }}
        header="Confirmer la suppression"
        modal
        footer={
          <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteTypeDialogVisible(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteTypeProduit} />
          </>
        }
        onHide={() => setDeleteTypeDialogVisible(false)}
      >
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {typeProduitToDelete && <span>Confirmez-vous la suppression du type de produit ?</span>}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProduitDialogVisible}
        style={{ width: '350px' }}
        header="Confirmer la suppression"
        modal
        footer={
          <>
            <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteProduitDialogVisible(false)} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteProduit} />
          </>
        }
        onHide={() => setDeleteProduitDialogVisible(false)}
      >
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {produitToDelete && <span>Confirmez-vous la suppression du produit ?</span>}
        </div>
      </Dialog>
    </div>
  );
}
