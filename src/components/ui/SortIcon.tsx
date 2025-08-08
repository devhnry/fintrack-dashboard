import React, {FC} from 'react';
import Dropdown from "@/assets/icons/dropdown-light.svg";
import {SortDirection} from "@/types/types";

const SortIcon: FC<{ active: boolean; direction: SortDirection }> = ({ active, direction }) => {
    return (
        <span className={`size-6 flex items-center justify-center`}>
            <Dropdown className={`transform transition-transform duration-200 
            ${ active && direction === "desc" ? "rotate-180" : ""}`} />
        </span>
    );
};

export default SortIcon;