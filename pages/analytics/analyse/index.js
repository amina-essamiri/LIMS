import { useRouter } from 'next/router';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

// Simulated data services
const ParametreService = {
    getParametres: () => Promise.resolve([
        { id: 1, name: '% Extrait sec', abbreviation: 'ES', family: ['COHV'] },
        { id: 2, name: '1,1-Dichloroéthane', abbreviation: 'DCE', family: ['COHV'] },
        { id: 3, name: '2,4-DB', abbreviation: '2,4-DB', family: ['Pesticides'] },
        { id: 4, name: 'Acide alpha-linolénique (C18:3, n-3)', abbreviation: 'ALA', family: ['Profil des acides gras'] },
        { id: 5, name: 'Acide gadoléique (C20:1)', abbreviation: 'GDA', family: ['Profil des acides gras'] },
        { id: 6, name: 'Aflatoxines B2', abbreviation: 'AFB2', family: ['Aflatoxines'] },
        { id: 7, name: 'Aflatoxines G1', abbreviation: 'AFG1', family: ['Aflatoxines'] },
        { id: 8, name: 'Vitamine B12', abbreviation: 'VB12', family: ['Vitamines'] },
        { id: 9, name: 'Vitamine C', abbreviation: 'VC', family: ['Vitamines'] },
        { id: 10, name: 'Somme Toxines (T2+HT2)', abbreviation: 'Tox. T2+HT2', family: ['Toxines'] },
        { id: 11, name: 'Diflufenican', abbreviation: 'DIF', family: ['Pesticides'] },
        { id: 12, name: 'Metamitrone', abbreviation: 'MET', family: ['Pesticides'] },
    ]),
};

const TypeAnalyseService = {
    getTypes: () => Promise.resolve([
        { id: 1, name: 'Analyse biologique - Air' },
        { id: 2, name: 'Analyse organoleptique - Aliments' },
        { id: 3, name: 'Analyse microbiologique - Cosmétiques' },
        { id: 4, name: 'Analyse physico-chimique - Sols et sédiments' },
        { id: 5, name: 'Analyse parasitologique - Sols et sédiments' },
        { id: 6, name: 'Analyse microbiologique - Antiséptiques et désinféctants' },
        { id: 7, name: 'Analyse microbiologique - Surface' },
        { id: 8, name: 'Analyse parasitologique - Eau' },
        { id: 9, name: 'Analyse physico-chimique - Air' },
        { id: 10, name: 'Analyse biologique - Eau' },
    ]),
};

const MethodeAnalyseService = {
    getMethodes: () => Promise.resolve([
        { id: 1, nom: 'AOAC 2007.1' },
        { id: 2, nom: 'COI/T.20/Doc.n°19/Rév.5' },
        { id: 3, nom: 'Follin-Ciocalteux' },
        { id: 4, nom: 'ISO 11048' },
        { id: 5, nom: 'ISO 14189' },
        { id: 6, nom: 'ISO 14235' },
        { id: 7, nom: 'ISO 15705' },
        { id: 8, nom: 'MOSuMB03' },
        { id: 9, nom: 'NF EN 16502' },
    ]),
};

const UniteService = {
    getUnites: () => Promise.resolve([
        { id: 1, name: '%' },
        { id: 2, name: '°' },
        { id: 3, name: 'B°' },
        { id: 4, name: 'Bq/L' },
        { id: 5, name: 'C°' },
        { id: 6, name: 'f°' },
        { id: 7, name: 'g' },
        { id: 8, name: 'g/100g' },
        { id: 9, name: 'g/100g de MB' },
        { id: 10, name: 'g/100g de MS' },
        { id: 11, name: 'g/100mL' },
        { id: 12, name: "meq d'O2/kg" },
        { id: 13, name: 'Larves/L' },
        { id: 14, name: 'kJ/100g' },
        { id: 15, name: 'kcal/100g' },
        { id: 16, name: 'g/kg' },
        { id: 17, name: 'g/100mL' },
        { id: 18, name: 'g/100mL' },
    ]),
};

const AccreditationService = {
    getAccreditations: () => Promise.resolve([
        { id: 1, name: 'Non Accrédité' },
        { id: 2, name: 'Sous-traité' },
        { id: 3, name: 'Reconnu' },
        { id: 4, name: 'Accrédité' },
        { id: 5, name: 'Reconnu/Accrédité' },
        { id: 6, name: 'Agréé/Accrédité' },
    ]),
    deleteAccreditation: (id) => Promise.resolve({ success: true }),
};

function List() {
    const [analyses, setAnalyses] = useState([]);
    const [parametres, setParametres] = useState([]);
    const [types, setTypes] = useState([]);
    const [methodes, setMethodes] = useState([]);
    const [unites, setUnites] = useState([]);
    const [accreditations, setAccreditations] = useState([]);

    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selectedAnalyse, setSelectedAnalyse] = useState(null);

    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
    ParametreService.getParametres().then(setParametres);
    TypeAnalyseService.getTypes().then(setTypes);
    MethodeAnalyseService.getMethodes().then(setMethodes);
    UniteService.getUnites().then(setUnites);
    AccreditationService.getAccreditations().then(setAccreditations);

    setAnalyses([
        {
            id: 1,
            parametre: { id: 1, name: '% Extrait sec' },
            typeAnalyse: { id: 1, name: 'Analyse biologique - Air' },
            methode: { id: 1, nom: 'AOAC 2007.1' },
            unite: { id: 1, name: '%' },
            accreditation: { id: 4, name: 'Accrédité' },
        },
        {
            id: 2,
            parametre: { id: 6, name: 'Aflatoxines B2' },
            typeAnalyse: { id: 5, name: 'Analyse parasitologique - Sols et sédiments' },
            methode: { id: 3, nom: 'Follin-Ciocalteux' },
            unite: { id: 7, name: 'g' },
            accreditation: { id: 2, name: 'Sous-traité' },
        },
        {
            id: 3,
            parametre: { id: 3, name: '2,4-DB' },
            typeAnalyse: { id: 3, name: 'Analyse microbiologique - Cosmétiques' },
            methode: { id: 4, nom: 'ISO 11048' },
            unite: { id: 8, name: 'g/100g' },
            accreditation: { id: 3, name: 'Reconnu' },
        },
        {
            id: 4,
            parametre: { id: 8, name: 'Vitamine B12' },
            typeAnalyse: { id: 6, name: 'Analyse microbiologique - Antiséptiques et désinféctants' },
            methode: { id: 6, nom: 'ISO 14235' },
            unite: { id: 1, name: '%' },
            accreditation: { id: 4, name: 'Accrédité' },
        },
        {
            id: 5,
            parametre: { id: 11, name: 'Diflufenican' },
            typeAnalyse: { id: 2, name: 'Analyse organoleptique - Aliments' },
            methode: { id: 2, nom: 'COI/T.20/Doc.n°19/Rév.5' },
            unite: { id: 16, name: 'g/kg' },
            accreditation: { id: 5, name: 'Reconnu/Accrédité' },
        },
        {
            id: 6,
            parametre: { id: 2, name: '1,1-Dichloroéthane' },
            typeAnalyse: { id: 4, name: 'Analyse physico-chimique - Sols et sédiments' },
            methode: { id: 5, nom: 'ISO 14189' },
            unite: { id: 11, name: 'g/100mL' },
            accreditation: { id: 6, name: 'Agréé/Accrédité' },
        },
        {
            id: 7,
            parametre: { id: 7, name: 'Aflatoxines G1' },
            typeAnalyse: { id: 7, name: 'Analyse microbiologique - Surface' },
            methode: { id: 7, nom: 'ISO 15705' },
            unite: { id: 9, name: 'g/100g de MB' },
            accreditation: { id: 1, name: 'Non Accrédité' },
        },
        {
            id: 8,
            parametre: { id: 9, name: 'Vitamine C' },
            typeAnalyse: { id: 9, name: 'Analyse physico-chimique - Air' },
            methode: { id: 8, nom: 'MOSuMB03' },
            unite: { id: 17, name: 'g/100mL' },
            accreditation: { id: 4, name: 'Accrédité' },
        },
        {
            id: 9,
            parametre: { id: 10, name: 'Somme Toxines (T2+HT2)' },
            typeAnalyse: { id: 8, name: 'Analyse parasitologique - Eau' },
            methode: { id: 9, nom: 'NF EN 16502' },
            unite: { id: 12, name: "meq d'O2/kg" },
            accreditation: { id: 3, name: 'Reconnu' },
        },
        {
            id: 10,
            parametre: { id: 4, name: 'Acide alpha-linolénique (C18:3, n-3)' },
            typeAnalyse: { id: 10, name: 'Analyse biologique - Eau' },
            methode: { id: 1, nom: 'AOAC 2007.1' },
            unite: { id: 13, name: 'Larves/L' },
            accreditation: { id: 2, name: 'Sous-traité' },
        },
    ]);
}, []);

    const confirmDeleteAnalyse = (analyse) => {
        setSelectedAnalyse(analyse);
        setDeleteDialog(true);
    };

    const deleteAnalyse = () => {
        // Ici, appeler API pour supprimer puis rafraîchir la liste
        setAnalyses(prev => prev.filter(a => a.id !== selectedAnalyse.id));
        setDeleteDialog(false);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Analyse supprimée', life: 3000 });
    };

    const actionBodyTemplate = (rowData) => (
        <>
            <Button
                icon="pi pi-pencil"
                rounded
                text
                severity="success"
                className="mr-2"
                onClick={() => {
                    // Rediriger vers page édition Analyse (ex: /analyse/edit/[id])
                    // Avec router
                    router.push(`analyse/edit`);
                }}
            />
            <Button
                icon="pi pi-trash"
                rounded
                text
                severity="danger"
                onClick={() => confirmDeleteAnalyse(rowData)}
            />
        </>
    );
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setFilters({
        global: { value, matchMode: FilterMatchMode.CONTAINS },
    });
    };

    const router = useRouter();

    const renderHeader = () => (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                <i className="pi pi-search" />
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Rechercher..."
                    className="w-full"
                />
                </span>
                <Button
                type="button"
                rounded
                outlined
                icon="pi pi-plus"
                tooltip="Ajouter"
                tooltipOptions={{ position: 'top' }}
                className="p-button-outlined"
                onClick={() => router.push('analyse/create')}
                />
            </div>
            );

    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block text-blue-700">
                <i className="pi pi-list" /> &nbsp;&nbsp;Liste des analyses
            </span>
            <DataTable
                ref={dt}
                value={analyses}
                paginator
                rows={10}
                responsiveLayout="scroll"
                size="small"
                filters={filters}
                globalFilterFields={['parametre.name', 'typeAnalyse.name', 'methode.nom', 'unite.name', 'accreditation.name']}
                header={renderHeader()}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]}
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} analyses"
                dataKey="id"
            >
                <Column
                    field="parametre.name"
                    header="Paramètre"
                    sortable
                    style={{ minWidth: '12rem' }}
                />
                <Column
                    field="typeAnalyse.name"
                    header="Type d'analyse"
                    sortable
                    style={{ minWidth: '14rem' }}
                />
                <Column
                    field="methode.nom"
                    header="Méthode"
                    sortable
                    style={{ minWidth: '12rem' }}
                />
                <Column
                    field="unite.name"
                    header="Unité"
                    sortable
                    style={{ minWidth: '8rem' }}
                />
                
                <Column
                    field="accreditation.name"
                    header="Accréditation"
                    sortable
                    style={{ minWidth: '10rem' }}
                />
                <Column
                    header="Actions"
                    body={actionBodyTemplate}
                    style={{ minWidth: '10rem', textAlign: 'center' }}
                />
            </DataTable>

            <Dialog
                visible={deleteDialog}
                style={{ width: '450px' }}
                header="Confirmer la suppression"
                modal
                footer={
                    <>
                        <Button label="Non" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteDialog(false)} />
                        <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteAnalyse} />
                    </>
                }
                onHide={() => setDeleteDialog(false)}
            >
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedAnalyse && <span>Confirmez-vous la suppression de cette analyse ?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default List;
