import AppSubMenu from './AppSubMenu';

const AppMenu = () => {
    const model = [
        {
            label: 'Tiers',
            icon: 'pi pi-user',
            items: [
                {
                    label: 'Clients',
                    icon: 'pi pi-fw pi-users',
                    to: '/clients/list'
                },
                {
                    label: 'Fournisseurs',
                    icon: 'pi pi-fw pi-user',
                    // to: '/'
                },
                {
                    label: 'Sous-traitants',
                    icon: 'pi pi-fw pi-user-plus',
                    // to: '/'
                },
                // {
                //     label: 'Contacts',
                //     icon: 'pi pi-fw pi-user-edit',
                //     // to: '/'
                // }
            ]
        },
        {
            label: 'Devis',
            icon: 'pi pi-dollar',
            items: [
                {
                    label: 'Liste des devis',
                    icon: 'pi pi-fw pi-wallet',
                    // to: '/clients/list'
                },
                {
                    label: 'Ajouter un devis',
                    icon: 'pi pi-fw pi-plus',
                    // to: '/clients/create'
                }
            ]
        },
        {
            label: 'Commandes',
            icon: 'pi pi-th-large',
            items: [
                {
                    label: 'Liste commandes',
                    icon: 'pi pi-fw pi-list',
                    to: '/clients/list'
                },
                {
                    label: 'Créer une commande',
                    icon: 'pi pi-fw pi-cart-plus',
                    // to: '/clients/create'
                }
            ]
        },
        {
            label: 'Réceptions',
            icon: 'pi pi-building',
            items: [
                {
                    label: 'Nouvelle réception',
                    icon: 'pi pi-fw pi-calendar-plus',
                    // to: '/clients/list'
                },
                {
                    label: 'Liste réception',
                    icon: 'pi pi-fw pi-ellipsis-v',
                    // to: '/clients/create'
                }
            ]
        },
        {
            label: 'Résultats',
            icon: 'pi pi-folder-open',
            items: [
                {
                    label: 'Saisi',
                    icon: 'pi pi-fw pi-pencil',
                    // to: '/clients/list'
                },
                {
                    label: 'Consultation',
                    icon: 'pi pi-fw pi-exclamation-circle',
                    // to: '/clients/create'
                }
            ]
        },
        {
            label: 'Validations',
            icon: 'pi pi-check-circle',
            items: [
                {
                    label: 'Valid Technique',
                    icon: 'pi pi-fw pi-check',
                    // to: '/clients/list'
                },
                {
                    label: 'Valid Administration',
                    icon: 'pi pi-fw pi-check-square',
                    // to: '/clients/create'
                }
            ]
        },
        {
            label: 'Rapports',
            icon: 'pi pi-chart-bar',
            items: [
                {
                    label: 'Générer rapport',
                    icon: 'pi pi-fw pi-chart-line',
                    // to: '/clients/list'
                },
                {
                    label: 'Liste Rapports',
                    icon: 'pi pi-fw pi-chart-pie',
                    // to: '/clients/create'
                }
            ]
        },
        {
            label: 'Facturation',
            icon: 'pi pi-calculator',
            items: [
                {
                    label: 'Liste Factures',
                    icon: 'pi pi-fw pi-copy',
                    // to: '/clients/list'
                },
                {
                    label: 'Ajouter une Facture',
                    icon: 'pi pi-fw pi-plus-circle',
                    // to: '/clients/create'
                },
                {
                    label: 'Comptabilisé',
                    icon: 'pi pi-fw pi-tablet',
                    // to: '/clients/create'
                }
            ]
        },
        // {
        //     label: 'Paramètres',
        //     icon: 'pi pi-cog',
        //     items: [
        //         {
        //             label: 'Analytics',
        //             icon: 'pi pi-fw pi-book',
        //             items: [
        //                 {
        //                     label: 'Consultation',
        //                     icon: 'pi pi-fw pi-file-edit',
        //                     // to: '/auth/login'
        //                 },
        //                 {
        //                     label: 'Matrices',
        //                     icon: 'pi pi-fw pi-qrcode',
        //                     // to: '/auth/error'
        //                 },
        //                 {
        //                     label: 'Groupe d’Analyse',
        //                     icon: 'pi pi-fw pi-table',
        //                     // to: '/auth/access'
        //                 },
        //                 {
        //                     label: 'Type d’Analyse',
        //                     icon: 'pi pi-fw pi-folder',
        //                     // to: '/auth/register'
        //                 },
        //                 {
        //                     label: 'Méthode d’analyse',
        //                     icon: 'pi pi-fw pi-stop',
        //                     // to: '/auth/forgotpassword'
        //                 },
        //                 {
        //                     label: 'Règlementations',
        //                     icon: 'pi pi-fw pi-sliders-h',
        //                     // to: '/auth/newpassword'
        //                 },
        //                 {
        //                     label: 'Paramètres',
        //                     icon: 'pi pi-fw pi-wrench',
        //                     // to: '/auth/verification'
        //                 },
        //                 {
        //                     label: 'Analyses',
        //                     icon: 'pi pi-fw pi-bars',
        //                     // to: '/auth/lockscreen'
        //                 },
        //                 {
        //                     label: 'Produits',
        //                     icon: 'pi pi-fw pi-box',
        //                     // to: '/auth/lockscreen'
        //                 },
        //                 {
        //                     label: 'Méthode Prélèvement',
        //                     icon: 'pi pi-fw pi-palette',
        //                     // to: '/auth/lockscreen'
        //                 },
        //                 {
        //                     label: 'Accréditation',
        //                     icon: 'pi pi-fw pi-verified',
        //                     // to: '/auth/lockscreen'
        //                 },
        //                 {
        //                     label: 'Unité',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     // to: '/auth/lockscreen'
        //                 },
        //                 {
        //                     label: 'Moment de prélèvement',
        //                     icon: 'pi pi-fw pi-clock',
        //                     // to: '/auth/lockscreen'
        //                 },
        //                 {
        //                     label: 'Lieux de prélèvement',
        //                     icon: 'pi pi-fw pi-map-marker',
        //                     // to: '/auth/lockscreen'
        //                 },
        //                 {
        //                     label: 'Moyenne de Prélèvement',
        //                     icon: 'pi pi-fw pi-clone',
        //                     // to: '/auth/lockscreen'
        //                 },
        //                 {
        //                     label: 'Cadre d’analyse',
        //                     icon: 'pi pi-fw pi-ticket',
        //                     // to: '/auth/lockscreen'
        //                 },
        //                 {
        //                     label: 'Fasse d’échantillon',
        //                     icon: 'pi pi-fw pi-tag',
        //                     // to: '/auth/lockscreen'
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Utilisateurs',
        //             icon: 'pi pi-fw pi-users',
        //             items: [
        //                 {
        //                     label: 'Ajouter utilisateur',
        //                     icon: 'pi pi-fw pi-plus',
        //                     // to: '/auth/login'
        //                 },
        //                 {
        //                     label: 'Liste utilisateurs',
        //                     icon: 'pi pi-fw pi-list',
        //                     // to: '/auth/error'
        //                 },
        //                 {
        //                     label: 'Ajouter Profile',
        //                     icon: 'pi pi-fw pi-user',
        //                     // to: '/auth/access'
        //                 },
        //                 {
        //                     label: 'Liste profiles',
        //                     icon: 'pi pi-fw pi-users',
        //                     // to: '/auth/register'
        //                 },
        //                 {
        //                     label: 'Départements',
        //                     icon: 'pi pi-fw pi-window-minimize',
        //                     // to: '/auth/forgotpassword'
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Finance',
        //             icon: 'pi pi-fw pi-money-bill',
        //             items: [
        //                 {
        //                     label: 'Login',
        //                     icon: 'pi pi-fw pi-sign-in',
        //                     to: '/auth/login'
        //                 },
        //                 {
        //                     label: 'Error',
        //                     icon: 'pi pi-fw pi-times-circle',
        //                     to: '/auth/error'
        //                 },
        //                 {
        //                     label: 'Access Denied',
        //                     icon: 'pi pi-fw pi-lock',
        //                     to: '/auth/access'
        //                 },
        //                 {
        //                     label: 'Register',
        //                     icon: 'pi pi-fw pi-user-plus',
        //                     to: '/auth/register'
        //                 },
        //                 {
        //                     label: 'Forgot Password',
        //                     icon: 'pi pi-fw pi-question',
        //                     to: '/auth/forgotpassword'
        //                 },
        //                 {
        //                     label: 'New Password',
        //                     icon: 'pi pi-fw pi-cog',
        //                     to: '/auth/newpassword'
        //                 },
        //                 {
        //                     label: 'Verification',
        //                     icon: 'pi pi-fw pi-envelope',
        //                     to: '/auth/verification'
        //                 },
        //                 {
        //                     label: 'Lock Screen',
        //                     icon: 'pi pi-fw pi-eye-slash',
        //                     to: '/auth/lockscreen'
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Dictionnaire',
        //             icon: 'pi pi-fw pi-clone',
        //             items: [
        //                 {
        //                     label: 'Login',
        //                     icon: 'pi pi-fw pi-sign-in',
        //                     to: '/auth/login'
        //                 },
        //                 {
        //                     label: 'Error',
        //                     icon: 'pi pi-fw pi-times-circle',
        //                     to: '/auth/error'
        //                 },
        //                 {
        //                     label: 'Access Denied',
        //                     icon: 'pi pi-fw pi-lock',
        //                     to: '/auth/access'
        //                 },
        //                 {
        //                     label: 'Register',
        //                     icon: 'pi pi-fw pi-user-plus',
        //                     to: '/auth/register'
        //                 },
        //                 {
        //                     label: 'Forgot Password',
        //                     icon: 'pi pi-fw pi-question',
        //                     to: '/auth/forgotpassword'
        //                 },
        //                 {
        //                     label: 'New Password',
        //                     icon: 'pi pi-fw pi-cog',
        //                     to: '/auth/newpassword'
        //                 },
        //                 {
        //                     label: 'Verification',
        //                     icon: 'pi pi-fw pi-envelope',
        //                     to: '/auth/verification'
        //                 },
        //                 {
        //                     label: 'Lock Screen',
        //                     icon: 'pi pi-fw pi-eye-slash',
        //                     to: '/auth/lockscreen'
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Equipements',
        //             icon: 'pi pi-fw pi-inbox',
        //             items: [
        //                 {
        //                     label: 'Login',
        //                     icon: 'pi pi-fw pi-sign-in',
        //                     to: '/auth/login'
        //                 },
        //                 {
        //                     label: 'Error',
        //                     icon: 'pi pi-fw pi-times-circle',
        //                     to: '/auth/error'
        //                 },
        //                 {
        //                     label: 'Access Denied',
        //                     icon: 'pi pi-fw pi-lock',
        //                     to: '/auth/access'
        //                 },
        //                 {
        //                     label: 'Register',
        //                     icon: 'pi pi-fw pi-user-plus',
        //                     to: '/auth/register'
        //                 },
        //                 {
        //                     label: 'Forgot Password',
        //                     icon: 'pi pi-fw pi-question',
        //                     to: '/auth/forgotpassword'
        //                 },
        //                 {
        //                     label: 'New Password',
        //                     icon: 'pi pi-fw pi-cog',
        //                     to: '/auth/newpassword'
        //                 },
        //                 {
        //                     label: 'Verification',
        //                     icon: 'pi pi-fw pi-envelope',
        //                     to: '/auth/verification'
        //                 },
        //                 {
        //                     label: 'Lock Screen',
        //                     icon: 'pi pi-fw pi-eye-slash',
        //                     to: '/auth/lockscreen'
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Laboratoire',
        //             icon: 'pi pi-fw pi-building',
        //             items: [
        //                 {
        //                     label: 'Login',
        //                     icon: 'pi pi-fw pi-sign-in',
        //                     to: '/auth/login'
        //                 },
        //                 {
        //                     label: 'Error',
        //                     icon: 'pi pi-fw pi-times-circle',
        //                     to: '/auth/error'
        //                 },
        //                 {
        //                     label: 'Access Denied',
        //                     icon: 'pi pi-fw pi-lock',
        //                     to: '/auth/access'
        //                 },
        //                 {
        //                     label: 'Register',
        //                     icon: 'pi pi-fw pi-user-plus',
        //                     to: '/auth/register'
        //                 },
        //                 {
        //                     label: 'Forgot Password',
        //                     icon: 'pi pi-fw pi-question',
        //                     to: '/auth/forgotpassword'
        //                 },
        //                 {
        //                     label: 'New Password',
        //                     icon: 'pi pi-fw pi-cog',
        //                     to: '/auth/newpassword'
        //                 },
        //                 {
        //                     label: 'Verification',
        //                     icon: 'pi pi-fw pi-envelope',
        //                     to: '/auth/verification'
        //                 },
        //                 {
        //                     label: 'Lock Screen',
        //                     icon: 'pi pi-fw pi-eye-slash',
        //                     to: '/auth/lockscreen'
        //                 }
        //             ]
        //         }
        //     ]
        // },
        
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
