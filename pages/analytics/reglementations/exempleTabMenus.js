import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { TabMenu } from 'primereact/tabmenu';

export default function BlogEdit() {
    const router = useRouter();
    const [dateApplication, setDateApplication] = useState(null);
    const [version, setVersion] = useState('');
    const toast = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Mise à jour : 3 onglets
    const tabs = [
        { label: "Méthodes d'analyse" },
        { label: "Versions" },
        { label: "Paramètres" }
    ];

    const onDateChange = (e) => {
        const selectedDate = e.value;
        setDateApplication(selectedDate);
        selectedDate ? setVersion(selectedDate.getFullYear().toString()) : setVersion('');
    };

    return (
        <div className="card">
            <Toast ref={toast} position="top-right" />
            <span className="block text-900 text-xl font-bold mb-4 text-blue-700">
                <i className="pi pi-stop" />&nbsp;&nbsp;Modifier la méthode d&apos;analyse
            </span>

            <TabMenu
                model={tabs}
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
                className="mb-4"
            />

            {/* Contenu vide pour chaque onglet */}
            <div className="flex justify-content-between">
                {activeIndex === 0 && <div className="col-12"></div>}
                {activeIndex === 1 && <div className="col-12"></div>}
                {activeIndex === 2 && <div className="col-12"></div>}
            </div>
        </div>
    );
}
