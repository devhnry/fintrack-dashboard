import React, { useEffect, useState } from "react";
import { useUIStore } from "@/store/uiStore";

const Sidebar = () => {
    const { sidebarOpen, toggleSidebar } = useUIStore();
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    const tabs = ["Dashboard", "Transactions", "Report", "Settings"];
    const [activeTab, setActiveTab] = useState("Dashboard");

    return (
        <aside className={`fixed top-[64px] left-0 h-full z-50 bg-background transition-[width,opacity] duration-300 ease-in-out overflow-hidden flex flex-col
        ${ sidebarOpen ? "w-[350px] opacity-100" : isDesktop
            ? "w-0 opacity-0"
            : "w-0 opacity-0"
        }
        `} style={{ maxWidth: 320 }} aria-hidden={!sidebarOpen && !isDesktop} >
            <nav className="my-[28px] grid px-[15px]">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`btn-sidebar ${
                            activeTab === tab ? "bg-brand-400-light text-brand-300" : ""
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;