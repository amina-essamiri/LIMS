import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useState, useContext, useRef, useEffect } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { useRouter } from 'next/router';


const AppConfig = (props) => {
    const { layoutState, setLayoutState } = useContext(LayoutContext);
    const [visible, setVisible] = useState(false); // State to control sidebar visibility
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);  // Navigate to the specified path
        setVisible(false);  
    };
    // State to manage the visibility of each section
    const [openSections, setOpenSections] = useState({
        analytics: false,
        finance: false,
        utilisateurs: false,
        dictionnaire: false,
    });

   // Refs for StyleClass components
    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const btnRef3 = useRef(null);
    const btnRef4 = useRef(null);

    // Toggle function to handle opening and closing of sections
    const toggleSection = (section) => {
        setOpenSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };
    

    const onConfigButtonClick = () => {
        setVisible(true); // Show sidebar when button is clicked
    };

    const onConfigSidebarHide = () => {
        setVisible(false); // Hide sidebar when close button is clicked
    };

    return (
        <div className="">
            {/* Button to toggle sidebar */}
            <button className="layout-config-button p-link" type="button" onClick={onConfigButtonClick} >
                <i className="pi pi-cog"></i>
            </button>

            {/* Sidebar component with visible state */}
            <Sidebar
                visible={visible}
                onHide={onConfigSidebarHide} // When the sidebar is hidden, update state
                content={({ closeIconRef, hide }) => (
                    <div className="min-h-screen flex relative lg:static surface-ground">
                        <div
                            id="app-sidebar-2"
                            className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
                            style={{ width: '280px' }}
                        >
                            <div className="flex flex-column h-full">
                                <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                                    <span className="inline-flex align-items-center gap-2">
                                        {/* Your logo here */}
                                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            {/* SVG content */}
                                        </svg>
                                        <span className="font-semibold text-2xl text-primary">Paramètres</span>
                                    </span>
                                    <span>
                                        <Button
                                            type="button"
                                            ref={closeIconRef}
                                            onClick={(e) => hide(e)} // Hide sidebar on button click
                                            icon="pi pi-times"
                                            rounded
                                            outlined
                                            className="h-2rem w-2rem"
                                        />
                                    </span>
                                </div>

                                {/* Sidebar Content */}
                                <div className="overflow-y-auto">
                                    <ul className="list-none p-3 m-0">
                                        <li>
                                            {/* <StyleClass nodeRef={btnRef1} selector="@next" enterFromClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup"> */}
                                                <div ref={btnRef1} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer" onClick={() => toggleSection('analytics')}>
                                                    <span className="font-medium">Analytics</span>
                                                    <i className="pi pi-chevron-down"></i>
                                                    <Ripple />
                                                </div>
                                            {/* </StyleClass> */}
                                            {openSections.analytics && (
                                            <ul className="list-none p-0 m-0 overflow-hidden">
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-fw pi-file-edit mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Consultation</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/analytics/matrices')}>
                                                        <i className="pi pi-fw pi-qrcode mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Matrices</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/analytics/groupeAnalyse')}>
                                                        <i className="pi pi-fw pi-table mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Groupe d’Analyse</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/analytics/typeAnalyse')}>
                                                        <i className="pi pi-fw pi-folder mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Type d’Analyse</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-link mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Paramètres</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    >
                                                        <i className="pi pi-fw pi-stop mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Méthode d’analyse</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-fw pi-ticket mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Cadre d’analyse</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-fw pi-sliders-h mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Règlementations</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-fw pi-tags mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Analyses</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-fw pi-box mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Produits</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/analytics/methodesPrelevement')}>
                                                        <i className="pi pi-fw pi-palette mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Méthode Prélèvement</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/analytics/accreditation')}>
                                                        <i className="pi pi-fw pi-verified mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Accréditations</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/analytics/unites')}>
                                                        <i className="pi pi-fw pi-bookmark mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Unités</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/analytics/momentPrelevement')}>
                                                        <i className="pi pi-fw pi-clock mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Moment de prélèvement</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/analytics/lieuxPrelevement')}>
                                                        <i className="pi pi-fw pi-map-marker mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Lieux de prélèvement</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-fw pi-clone mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Moyenne de Prélèvement</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/analytics/conclusions')}>
                                                        <i className="pi pi-fw pi-copy mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Conclusions</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-fw pi-tag mr-2" style={{color: 'var(--primary-color)'}} ></i>
                                                        <span className="font-medium">Fasse d’échantillon</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                            </ul>
                                            )}
                                        </li>
                                        {/* option 2 */}
                                        <li>
                                            {/* <StyleClass nodeRef={btnRef2} selector="@next" enterFromClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup"> */}
                                                <div ref={btnRef2} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer" onClick={() => toggleSection('finance')}>
                                                    <span className="font-medium">Utilisateurs</span>
                                                    <i className="pi pi-chevron-down"></i>
                                                    <Ripple />
                                                </div>
                                            {/* </StyleClass> */}
                                            {openSections.finance && (
                                            <ul className="list-none p-0 m-0 overflow-hidden">
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/users/create')}
                                                    >
                                                        <i className="pi pi-fw pi-plus mr-2" style={{color: 'var(--primary-color)'}}></i>
                                                        <span className="font-medium">Ajouter utilisateur</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/users/list')}
                                                    >
                                                        <i className="pi pi-fw pi-list mr-2" style={{color: 'var(--primary-color)'}}></i>
                                                        <span className="font-medium">Liste utilisateurs</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/departements/list')}>
                                                        <i className="pi pi-fw pi-window-minimize mr-2" style={{color: 'var(--primary-color)'}}></i>
                                                        <span className="font-medium">Départements</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                            </ul>
                                            )}
                                        </li>
                                        {/* option 3 */}
                                        <li>
                                            {/* <StyleClass nodeRef={btnRef3} selector="@next" enterFromClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup"> */}
                                                <div ref={btnRef3} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer" onClick={() => toggleSection('utilisateurs')}>
                                                    <span className="font-medium">Finance</span>
                                                    <i className="pi pi-chevron-down"></i>
                                                    <Ripple />
                                                </div>
                                            {/* </StyleClass> */}
                                            {openSections.utilisateurs && (
                                            <ul className="list-none p-0 m-0 overflow-hidden">
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/typeReglements/list')}>
                                                        <i className="pi pi-fw pi-sitemap mr-2" style={{color: 'var(--primary-color)'}}></i>
                                                        <span className="font-medium">Type de règlement</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/conditionReglements/list')}>
                                                        <i className="pi pi-fw pi-money-bill mr-2" style={{color: 'var(--primary-color)'}}></i>
                                                        <span className="font-medium">Condition de règlement</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/validitesDevis/list')}>
                                                        <i className="pi pi-fw pi-check mr-2" style={{color: 'var(--primary-color)'}}></i>
                                                        <span className="font-medium">Période de validité</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/typesDevis/list')}>
                                                        <i className="pi pi-fw pi-credit-card mr-2" style={{color: 'var(--primary-color)'}}></i>
                                                        <span className="font-medium">Type devis</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-fw pi-shopping-bag mr-2" style={{color: 'var(--primary-color)'}}></i>
                                                        <span className="font-medium">Pack</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                            </ul>
                                            )}
                                        </li>
                                        {/* option 4 */}
                                        <li>
                                            {/* <StyleClass nodeRef={btnRef4} selector="@next" enterFromClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup"> */}
                                                <div ref={btnRef4} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer" onClick={() => toggleSection('dictionnaire')} >
                                                    <span className="font-medium">Dictionnaire</span>
                                                    <i className="pi pi-chevron-down"></i>
                                                    <Ripple />
                                                </div>
                                            {/* </StyleClass> */}
                                            {openSections.dictionnaire && (
                                            <ul className="list-none p-0 m-0 overflow-hidden">
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/regions/list')} >
                                                        <i className="pi pi-fw pi-map mr-2" style={{color: 'var(--primary-color)'}}></i>
                                                        <span className="font-medium">Régions</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full" 
                                                    onClick={() => handleNavigation('/villes/list')} >
                                                        <i className="pi pi-fw pi-map-marker mr-2" style={{color: 'var(--primary-color)'}}></i>
                                                        <span className="font-medium">Villes</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/typeclients/list')} >
                                                        <i className="pi pi-fw pi-briefcase mr-2" style={{color: 'var(--primary-color)'}}></i>
                                                        <span className="font-medium">Type clients</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/activities/list')} >
                                                        <i className="pi pi-fw pi-th-large mr-2" style={{color: 'var(--primary-color)'}}></i>
                                                        <span className="font-medium">Secteurs d’activités</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                                    onClick={() => handleNavigation('/postes/list')}>
                                                        <i className="pi pi-fw pi-send mr-2" style={{color: 'var(--primary-color)'}}></i>
                                                        <span className="font-medium">Postes</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                            </ul>
                                            )}
                                        </li>
                                        {/* option 5 */}

                                    </ul>
                                </div>

                                {/* User Profile Section */}
                                <div className="mt-auto">
                                    <hr className="mb-2 mx-2 border-top-2 border-none surface-border" />
                                    <a className="m-2 flex align-items-center cursor-pointer p-2 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i className="pi pi-wrench mr-5 ml-2" style={{color: 'var(--primary-color)', fontSize: '25px'}}></i>
                                        <span className="font-bold">Equipements</span>
                                    </a>
                                </div>
                                <div className="mt-1">
                                    <hr className="mb-2 mx-2 border-top-2 border-none surface-border" />
                                    <a className="m-2 flex align-items-center cursor-pointer p-2 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                                    onClick={() => handleNavigation('/labo/list')}>
                                        <Avatar image="/logo.png" shape="square" size="large" />
                                        <span className="font-bold">Laboratoire</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default AppConfig;
