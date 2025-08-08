import React, {FC} from 'react';

interface Props {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}
const Tabs: FC<Props> = ({tabs, activeTab, onTabChange}) => {
    return (
        <nav className="flex font-medium border-b-[1.5px] border-brand-600/20" aria-label="Dashboard Tabs">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`py-3 px-[28px] relative cursor-pointer border-none bg-transparent ${
                        activeTab === tab ? "text-brand-100" : "text-neutral-700-light"
                    }`}
                    aria-current={activeTab === tab ? "page" : undefined}
                >
                    {tab}
                    {activeTab === tab && (
                        <span className="inline-block absolute left-0 -bottom-[1.5px] h-[1.5px] w-full bg-brand-50"></span>
                    )}
                </button>
            ))}
        </nav>
    );
};

export default Tabs;