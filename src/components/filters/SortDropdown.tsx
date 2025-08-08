import React, { FC, useState, useRef, useEffect } from "react";
import {SortDirection, SortKey, Transaction} from "@/types/types";
import Dropdown from "@/assets/icons/dropdown-light.svg"

interface SortDropdownProps {
    sortKey: SortKey;
    sortDirection: SortDirection;
    setSortKey: React.Dispatch<React.SetStateAction<SortKey>>;
    setSortDirection: React.Dispatch<React.SetStateAction<SortDirection>>;
}

type Option = {
    label: string;
    key: keyof Transaction;
    direction: SortDirection;
};

const options: Option[] = [
    { label: "Date Asc", key: "date", direction: "asc" },
    { label: "Date Desc", key: "date", direction: "desc" },
    { label: "Remark Asc", key: "remark", direction: "asc" },
    { label: "Remark Desc", key: "remark", direction: "desc" },
    { label: "Amount Asc", key: "amount", direction: "asc" },
    { label: "Amount Desc", key: "amount", direction: "desc" },
    { label: "Currency Asc", key: "currency", direction: "asc" },
    { label: "Currency Desc", key: "currency", direction: "desc" },
    { label: "Type Asc", key: "type", direction: "asc" },
    { label: "Type Desc", key: "type", direction: "desc" },
];

const SortDropdown: FC<SortDropdownProps> = ({ sortKey, sortDirection, setSortKey, setSortDirection }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if ( containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(
        (opt) => opt.key === sortKey && opt.direction === sortDirection
    );

    const handleSelect = (key: SortKey, direction: SortDirection) => {
        setSortKey(key);
        setSortDirection(direction);
        setOpen(false);
    };

    return (
        <div ref={containerRef} className="relative w-48">
            {/* Selected button */}
            <button
                type="button"
                className="w-full flex justify-between items-center p-2 border border-brand-600/20 rounded cursor-pointer bg-background"
                onClick={() => setOpen(!open)}
                aria-haspopup="listbox"
                aria-expanded={open}>
                    <span>{selectedOption?.label || "Select sorting"}</span>
                    <Dropdown className={`transition-all duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Options list */}
            {open && (
                <ul role="listbox" tabIndex={-1}
                    className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded border border-brand-600/20 bg-background shadow-md">
                    {options.map(({ label, key, direction }) => {
                        const isSelected = key === sortKey && direction === sortDirection;
                        return (
                            <li key={`${key}-${direction}`}
                                role="option"
                                aria-selected={isSelected}
                                tabIndex={0}
                                className={`cursor-pointer select-none px-4 py-2 hover:bg-brand-400-light ${
                                    isSelected ? "bg-brand-400-light font-medium" : ""
                                }`}
                                onClick={() => handleSelect(key, direction)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        handleSelect(key, direction);
                                    }
                                }} >
                                {label}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default SortDropdown;