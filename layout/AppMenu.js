import AppSubMenu from './AppSubMenu';

const AppMenu = () => {
    const model = [
        {
            label: 'Utilisateurs',
            icon: 'pi pi-user',
            items: [
                {
                    label: 'Liste des utilisateurs',
                    icon: 'pi pi-fw pi-list',
                    to: '/users/list'
                },
                {
                    label: 'Créer un utilisateur ',
                    icon: 'pi pi-fw pi-plus',
                    to: '/users/create'
                }
            ]
        },
        {
            label: 'Clients',
            icon: 'pi pi-users ',
            items: [
                {
                    label: 'Liste des clients',
                    icon: 'pi pi-fw pi-list',
                    to: '/clients/list'
                },
                {
                    label: 'Créer un client',
                    icon: 'pi pi-fw pi-plus',
                    to: '/clients/create'
                }
            ]
        },
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
