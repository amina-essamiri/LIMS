import React, { useEffect, useRef, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';

const TypesAnalyseService = {
  getTypes: () =>
    Promise.resolve([
      { id: 1, name: 'Analyse biologique - Air', group: 'Microbiologie', matrices: 'Air', conclusion: 'Analysis indicates microbiological safety' },
      { id: 2, name: 'Analyse organoleptique - Aliments', group: 'Organoleptique', matrices: 'Aliments', conclusion: 'Sensory characteristics comply with standards' },
      { id: 3, name: 'Analyse microbiologique - Cosmétiques', group: 'Microbiologie', matrices: 'Cosmétiques', conclusion: 'Microbiological analysis shows acceptable results' },
      { id: 4, name: 'Analyse physico-chimique - Sols et sédiments', group: 'Physico-chimie', matrices: 'Sols et sédiments', conclusion: 'Physico-chemical properties meet the required standards' },
      { id: 5, name: 'Analyse parasitologique - Sols et sédiments', group: 'Parasitologie', matrices: 'Sols et sédiments', conclusion: 'No parasitic contamination detected' },
      { id: 6, name: 'Analyse microbiologique - Antiséptiques et désinféctants', group: 'Microbiologie', matrices: 'Antiséptiques et désinféctants', conclusion: 'Microbiological tests show conformity' },
      { id: 7, name: 'Analyse microbiologique - Surface', group: 'Microbiologie', matrices: 'Surface', conclusion: 'Surface contamination analysis complies with safety standards' },
      { id: 8, name: 'Analyse parasitologique - Eau', group: 'Parasitologie', matrices: 'Eau', conclusion: 'Water analysis shows absence of parasites' },
      { id: 9, name: 'Analyse physico-chimique - Air', group: 'Physico-chimie', matrices: 'Air', conclusion: 'Air quality complies with safety limits' },
      { id: 10, name: 'Analyse biologique - Eau', group: 'Biologie', matrices: 'Eau', conclusion: 'Biological analysis confirms water safety' },
    ]),
};

const GroupeAnalyseOptions = [
  { id: 1, name: 'Microbiologie' },
  { id: 2, name: 'Physico-chimie' },
  { id: 3, name: 'Biologie' },
  { id: 4, name: 'Parasitologie' },
  { id: 5, name: 'Organoleptique' },
];

const MatricesOptions = [
  { id: 1, name: 'Sols et sédiments' },
  { id: 2, name: 'Cosmétiques' },
  { id: 3, name: 'Antiséptiques et désinféctants' },
  { id: 4, name: 'Aliments' },
  { id: 5, name: 'Surface' },
  { id: 6, name: 'Air' },
  { id: 7, name: 'Eau' },
];

function List() {
  const [typesAnalyse, setTypesAnalyse] = useState([]);
  const [typeAnalyse, setTypeAnalyse] = useState({ id: null, group: '', matrices: '', name: '', conclusion: '' });
  const [typeAnalyseDialog, setTypeAnalyseDialog] = useState(false);
  const [deleteTypeAnalyseDialog, setDeleteTypeAnalyseDialog] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);

  useEffect(() => {
    TypesAnalyseService.getTypes()
      .then((data) => {
        setTypesAnalyse(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.current.show({ severity: 'error', summary: 'Erreur', detail: "Échec du chargement des types d'analyse" });
      });
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setFilters({ global: { value, matchMode: FilterMatchMode.CONTAINS } });
  };

  const openNewTypeAnalyseDialog = () => {
    setTypeAnalyse({ id: null, group: '', matrices: '', name: '', conclusion: '' });
    setTypeAnalyseDialog(true);
  };

  const openEditTypeAnalyseDialog = (type) => {
    setTypeAnalyse(type);
    setTypeAnalyseDialog(true);
  };

  const hideDialog = () => setTypeAnalyseDialog(false);

  const generateAnalyseName = (group, matrix) => {
    return group && matrix ? `Analyse ${group} - ${matrix}` : '';
  };

  const handleSave = () => {
    const payload = {
      ...typeAnalyse,
      name: generateAnalyseName(typeAnalyse.group, typeAnalyse.matrices),
    };
    if (payload.id) {
      setTypesAnalyse((prev) => prev.map((t) => (t.id === payload.id ? payload : t)));
      toast.current.show({ severity: 'success', summary: 'Succès', detail: "Type d'analyse modifié" });
    } else {
      payload.id = Date.now();
      setTypesAnalyse((prev) => [...prev, payload]);
      toast.current.show({ severity: 'success', summary: 'Succès', detail: "Type d'analyse créé" });
    }
    setTypeAnalyseDialog(false);
  };

  const confirmDeleteTypeAnalyse = (type) => {
    setTypeAnalyse(type);
    setDeleteTypeAnalyseDialog(true);
  };

  const deleteTypeAnalyse = () => {
    setTypesAnalyse((prev) => prev.filter((t) => t.id !== typeAnalyse.id));
    setDeleteTypeAnalyseDialog(false);
    toast.current.show({ severity: 'success', summary: 'Succès', detail: "Type d'analyse supprimé" });
  };

  const actionBodyTemplate = (rowData) => (
    <>
      <Button icon="pi pi-pencil" rounded text severity="success" className="mr-2" onClick={() => openEditTypeAnalyseDialog(rowData)} />
      <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDeleteTypeAnalyse(rowData)} />
    </>
  );

  const renderHeader = () => (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
        <i className="pi pi-search"></i>
        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher des types d'analyse" className="w-full" />
      </span>
      <Button type="button" rounded outlined icon="pi pi-plus" tooltip="Ajouter" tooltipOptions={{ position: 'top' }} onClick={openNewTypeAnalyseDialog} />
    </div>
  );

  const typeAnalyseDialogFooter = (
    <>
      <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Sauvegarder" icon="pi pi-check" className="p-button-text" onClick={handleSave} />
    </>
  );

  const deleteTypeAnalyseDialogFooter = (
    <>
      <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteTypeAnalyseDialog(false)} />
      <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteTypeAnalyse} />
    </>
  );
  const typeTemplate = (rowData) => (
    <span><i className="pi pi-folder" style={{ color: 'var(--primary-color)' }} />&nbsp;{rowData.name}</span>
);

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <span className="text-900 text-xl font-bold mb-4 block text-blue-700"><i className="pi pi-folder" /> &nbsp;&nbsp;Liste de type d&apos;analyse</span>
          <DataTable
            value={typesAnalyse}
            paginator
            rows={10}
            dataKey="id"
            filters={filters}
            size='small'
            filterDisplay="menu"
            loading={loading}
            globalFilterFields={['name', 'group', 'matrices', 'conclusion']}
            header={renderHeader()}
            emptyMessage="Aucun type d'analyse trouvé."
            className="datatable-responsive"
          >
            <Column field="name" body={typeTemplate} header="Nom" sortable />
            <Column field="group" header="Groupe d'analyses" sortable />
            <Column field="matrices" header="Matrices" sortable />
            <Column field="conclusion" header="Conclusion" sortable />
            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }} />
          </DataTable>

          <Dialog visible={typeAnalyseDialog} style={{ width: '450px' }} header="Type d'analyse" modal className="p-fluid" footer={typeAnalyseDialogFooter} onHide={hideDialog}>
            <div className="field">
              <label htmlFor="group">Groupe d&apos;analyses</label>
              <Dropdown inputId="group" value={typeAnalyse.group} options={GroupeAnalyseOptions} onChange={(e) => setTypeAnalyse({ ...typeAnalyse, group: e.value })} optionLabel="name" optionValue="name" placeholder="Sélectionner un groupe" className="w-full" />
            </div>
            <div className="field">
              <label htmlFor="matrices">Matrices</label>
              <Dropdown inputId="matrices" value={typeAnalyse.matrices} options={MatricesOptions} onChange={(e) => setTypeAnalyse({ ...typeAnalyse, matrices: e.value })} optionLabel="name" optionValue="name" placeholder="Sélectionner une matrice" className="w-full" />
            </div>
            <div className="field">
              <label htmlFor="name">Nom</label>
              <InputText id="name" value={typeAnalyse.name} onChange={(e) => setTypeAnalyse({ ...typeAnalyse, name: e.target.value })} required />
            </div>
          </Dialog>

          <Dialog visible={deleteTypeAnalyseDialog} style={{ width: '450px' }} header="Confirmation" modal footer={deleteTypeAnalyseDialogFooter} onHide={() => setDeleteTypeAnalyseDialog(false)}>
            <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {typeAnalyse && <span>Êtes-vous sûr de vouloir supprimer le type?</span>}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default List;
