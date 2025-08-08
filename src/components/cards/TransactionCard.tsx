import React, {FC} from 'react';
import {StatusBadge} from "@/components/ui/StatusBadge";
import {Transaction} from "@/types/types";
import {formatNumber} from "@/util/util";

interface TransactionCardProps {
    transaction: Transaction;
}

const TransactionCard: FC<TransactionCardProps> = ({transaction: txn}) => {
    return (
        <div className={`text-[15px] leading-[20px] tracking-[-0.5%] border-t-[1.5px] py-[18px] border-brand-600/20 space-y-1.5 hover:bg-brand-400-light/20`}>
            <div className={`flex justify-between items-center`}>
                <p>{txn.remark}</p>
                <p>{txn.type === 'Debit' ? '-' : ''}${formatNumber(Math.abs(txn.amount))}</p>
            </div>
            <div className={`flex justify-between items-center`}>
                <p className={`opacity-80`}>{txn.date}</p>
                <div className={``}>
                    <StatusBadge text={txn.type} success={txn.type === "Credit"}/>
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;