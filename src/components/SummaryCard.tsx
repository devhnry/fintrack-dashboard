import React from "react";
import Ellipsis from "@/assets/icons/ellipsis.svg"
import {formatNumber} from "@/util";

interface SummaryCardProps {
    label: string;
    value: number;
    change: number;
    isCurrency?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, change, isCurrency }) => {
    return (
        <div className="flex-shrink-0 max-w-[223px] sm:max-w-full w-full rounded-[20px] p-[28px] bg-brand-500-light max-h-[158px] h-full space-y-[18px] transition-all duration-500">
            <div className="leading-[24px] text-[17px] -tracking-[0.5%] font-bold flex items-center justify-between">
                <p>{label}</p>
                <Ellipsis className={`cursor-pointer`} />
            </div>
            <div className={`space-y-1`}>
                <p className={`font-bold text-[34px] leading-[40px] tracking-[-2%]`}>
                    {isCurrency && '$'}{formatNumber(value)}
                </p>
                <span className="inline-block text-[13px] leading-[16px] text-brand-200">
                    {(Number(change) >= 0 ? '+' : '') + change}%
                </span>
            </div>
        </div>
    );
};
