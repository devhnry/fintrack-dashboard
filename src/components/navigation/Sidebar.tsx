import React, { useState } from "react";
import {useUIStore} from "@/store/uiStore";

const Sidebar = () => {
    const tabs = ["Dashboard", "Transactions", "Report", "Settings"];
    const [activeTab, setActiveTab] = useState("Dashboard");
    const { sidebarOpen } = useUIStore();

    if (!sidebarOpen) return null; // early return

    return (
        <aside className="max-w-[350px] px-[15px] h-[100vh] w-full flex-shrink-0 -top-[28px] bg-background absolute inset-0 z-50">
            <div className="my-[28px] grid">
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
            </div>
        </aside>
    );
};


export default Sidebar;