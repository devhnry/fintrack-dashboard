import React, {FC, useMemo, useState} from "react";
import {SortDirection, SortKey, Transaction} from "@/types/types";
import {formatNumber} from "@/util/util";
import {StatusBadge} from "@/components/ui/StatusBadge";
import {useUIStore} from "@/store/uiStore";
import TransactionCard from "@/components/cards/TransactionCard";
import SortIcon from "@/components/ui/SortIcon";
import SortDropdown from "@/components/filters/SortDropdown";
import ErrorMessage from "@/components/ui/ErrorMessage";
import TransactionTableSkeleton from "@/components/ui/TransactionTableSkeleton";

interface Props {
    transactions: Transaction[];
    loading: boolean;
}

const transactionHeads: { label: string; key: keyof Transaction }[] = [
    {label: "Date", key: "date"},
    {label: "Remark", key: "remark"},
    {label: "Amount", key: "amount"},
    {label: "Currency", key: "currency"},
    {label: "Type", key: "type"},
];

const columnWidths = [
    "max-w-[555px] lg:max-w-full w-full min-w-[150px]", // Date
    "max-w-[122px] w-full min-w-[122px] 2xl:max-w-[150px]", // Remark
    "max-w-[73px] w-full min-w-[73px] 2xl:max-w-[100px]", // Amount
    "max-w-[80px] w-full min-w-[80px]", // Currency
    "max-w-[74px] w-full min-w-[74px]", // Type
];

const TransactionTable: FC<Props> = ({transactions, loading}) => {
    const {search} = useUIStore();

    const [sortKey, setSortKey] = useState<SortKey>("date");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }
    };

    const filtered = useMemo(() => {
        if (!transactions) return [];

        const query = search.toLowerCase();
        return transactions.filter((txn) => {
            return (
                txn.remark.toLowerCase().includes(query) ||
                txn.date.toLowerCase().includes(query) ||
                txn.currency.toLowerCase().includes(query) ||
                txn.type.toLowerCase().includes(query) ||
                txn.amount.toString().includes(query)
            );
        });
    }, [search, transactions]);

    const sortedData = useMemo(() => {
        return [...filtered].sort((a, b) => {
            let comp = 0;

            switch (sortKey) {
                case "date":
                    comp = new Date(a.date).getTime() - new Date(b.date).getTime();
                    break;

                case "remark":
                    comp = a.remark.localeCompare(b.remark);
                    break;

                case "amount":
                    const aAmount = a.type === "Debit" ? -a.amount : a.amount;
                    const bAmount = b.type === "Debit" ? -b.amount : b.amount;
                    comp = aAmount - bAmount;
                    break;

                case "currency":
                    comp = a.currency.localeCompare(b.currency);
                    break;

                case "type":
                    comp = a.type.localeCompare(b.type);
                    break;
            }

            return sortDirection === "asc" ? comp : -comp;
        });
    }, [filtered, sortKey, sortDirection]);

    const isValidTransaction = (txn: unknown): txn is Transaction => {
        if (typeof txn !== "object" || txn === null) return false;
        // Typecast txn as Record<string, unknown> for safe prop access
        const obj = txn as Record<string, unknown>;
        return (
            typeof obj.id === "string" &&
            typeof obj.amount === "number" &&
            typeof obj.date === "string" &&
            typeof obj.remark === "string" &&
            typeof obj.currency === "string" &&
            (obj.type === "Debit" || obj.type === "Credit")
        );
    };

    const hasInvalidTransaction = transactions.some(txn => !isValidTransaction(txn));
    if (!transactions || hasInvalidTransaction) {
        return (
            <ErrorMessage
                title="Oops! Something went wrong."
                message="We couldn’t load your transactions due to invalid data. Please try refreshing the page or contact support if the problem persists."
            />
        );
    }

    if (transactions.length === 0) {
        return (
            <ErrorMessage
                title="No transactions found"
                message="Your wallet ledger is empty right now. Once transactions occur, they’ll show up here."
                className="text-gray-500"
            />
        );
    }

    if (loading) {
        return (
            <TransactionTableSkeleton />
        );
    }

    return (
        <div className="w-full">
            {/* MOBILE dropdown for sorting */}
            <div className="sm:hidden space-y-2">
                <SortDropdown
                    sortKey={sortKey}
                    sortDirection={sortDirection}
                    setSortKey={setSortKey}
                    setSortDirection={setSortDirection}
                />
                <div>
                    {sortedData.map((txn) => (
                        <TransactionCard key={txn.id} transaction={txn}/>
                    ))}
                </div>
            </div>

            {/* DESKTOP table */}
            <div className="overflow-x-scroll scrollbar-hide hidden sm:block">
                <div className="w-full flex-shrink-0">
                    <div className="flex items-center gap-[18px]">
                        {transactionHeads.map(({label, key}, index) => (
                            <h3 key={key}
                                onClick={() => toggleSort(key)}
                                className={`transaction-heads cursor-pointer py-1 whitespace-nowrap ${columnWidths[index]} flex items-center gap-1 select-none`}
                                aria-sort={
                                    sortKey === key
                                        ? sortDirection === "asc"
                                            ? "ascending"
                                            : "descending"
                                        : undefined
                                }
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") toggleSort(key);
                                }} >
                                {label}
                                <SortIcon active={sortKey === key} direction={sortDirection}/>
                            </h3>
                        ))}
                    </div>
                </div>

                <div>
                    {sortedData.length > 0 ? (
                        sortedData.map((txn) => (
                            <div className="flex items-center flex-shrink-0 gap-[18px]" key={txn.id} >
                                {[txn.date, txn.remark,
                                    `${txn.type === "Debit" ? "-" : ""}$${formatNumber(Math.abs(txn.amount))}`,
                                    txn.currency,
                                ].map((val, index) => (
                                    <p key={index} className={`transaction-data whitespace-nowrap ${columnWidths[index]} py-[18px]`}>
                                        {val}
                                    </p>
                                ))}

                                <div className={`transaction-data whitespace-nowrap ${columnWidths[4]} py-[14px] border-t-[1.5px] border-brand-600/20`}>
                                    <StatusBadge text={txn.type} success={txn.type === "Credit"}/>
                                </div>
                            </div>
                        ))
                    ) : (
                        <ErrorMessage
                            title="No transactions found"
                            message="We couldn't find any transactions matching your search. Try adjusting your keywords or filters."
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionTable;
