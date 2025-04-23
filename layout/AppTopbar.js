import { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import AppBreadcrumb from './AppBreadCrumb';
import { LayoutContext } from './context/layoutcontext';
import { Menu } from 'primereact/menu';
import { useRouter } from 'next/router';
import { color } from 'chart.js/helpers';

const AppTopbar = forwardRef((props, ref) => {
    const { onMenuToggle } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const menu = useRef(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current
    }));

    const items = [
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => {
                router.push('/profiles/detail');
            }
        },
        {
            label: 'Déconnexion',
            icon: 'pi pi-power-off',
            // Add logout logic here if necessary
        }
    ];

    return (
        <div className="layout-topbar">
            <div className="topbar-start">
                <button ref={menubuttonRef} type="button" className="topbar-menubutton p-link p-trigger" onClick={onMenuToggle}>
                    <i className="pi pi-bars"></i>
                </button>
                {/* <AppBreadcrumb className="topbar-breadcrumb" /> */}
            </div>

            <div className="topbar-end">
                <ul className="topbar-menu">
                    <li className="topbar-profile">
                        <button
                            type="button"
                            className="p-link"
                            onClick={(event) => menu.current.toggle(event)}
                        >
                            <img src="/layout/images/avatar1.png" alt="Profile" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
                        </button>
                        <Menu model={items} popup ref={menu} />
                    </li>
                </ul>
            </div>
        </div>
    );
});

export default AppTopbar;
