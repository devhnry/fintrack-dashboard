import React, {FC} from 'react';
import {SummaryCard} from "@/components/cards/SummaryCard";
import {mapSummaryCards} from "@/app/page";

interface Props {
    summaryCards: ReturnType<typeof mapSummaryCards>
}

const SummarySection: FC<Props> = ({summaryCards}) => {
    if (!summaryCards || summaryCards.length === 0) {
        return <div className="flex items-center justify-center text-heading">Summary data not available.</div>;
    }

    return (
        <div className="py-3 space-y-[18px] w-full">
            <h2 className="text-[20px] leading-[24px] font-bold -tracking-[2%]">Summary</h2>
            <div className="flex whitespace-nowrap overflow-x-scroll sm:overflow-x-visible gap-[28px] scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4">
                {summaryCards.map((card) => (
                    <SummaryCard
                        key={card.key}
                        label={card.label}
                        value={card.value}
                        change={card.change}
                        isCurrency={card.isCurrency}
                    />
                ))}
            </div>
        </div>
    );
};

export default SummarySection;