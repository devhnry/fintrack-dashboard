"use client"

import Navbar from "@/components/navigation/Navbar";
import Container from "@/components/layout/Container";
import Ellipsis from "@/assets/icons/ellipsis.svg"
import Dropdown from "@/assets/icons/dropdown.svg"
import {StaticImageData} from "next/image";

import Profile1 from "@/assets/images/profile-1.png"
import Profile2 from "@/assets/images/profile-2.png"
import Profile3 from "@/assets/images/profile-3.png"
import Profile4 from "@/assets/images/profile-4.png"
import AvatarGroup from "@/components/ui/AvatarGroup";
import {StatusBadge} from "@/components/ui/StatusBadge";
import React, {useEffect, useState} from "react";
import {DashboardSummary} from "@/types/types";
import SummarySection from "@/components/tables/SummarySection";
import Tabs from "@/components/navigation/Tabs";
import TransactionTable from "@/components/tables/TransactionTable";
import {transactions} from "@/data/data";
import Sidebar from "@/components/navigation/Sidebar";


const summaryConfig = [
    { key: "totalBalance", label: "Total Balance", changeKey: "balanceChange", isCurrency: true },
    { key: "totalCredits", label: "Total Credits", changeKey: "creditsChange", isCurrency: true },
    { key: "totalDebits", label: "Total Debits", changeKey: "debitsChange", isCurrency: true },
    { key: "transactionCount", label: "Transactions", changeKey: "transactionChange", isCurrency: false },
];

export function mapSummaryCards(summary: DashboardSummary) {
    if (!summary) return [];
    return summaryConfig.map(({ key, label, changeKey, isCurrency }) => ({
        key,
        label,
        value: summary[key as keyof DashboardSummary] as number,
        change: summary[changeKey as keyof DashboardSummary] as number || 0,
        isCurrency,
    }));
}

const dashboardSummary: DashboardSummary = {
    totalBalance: 12345,
    totalCredits: 7890,
    totalDebits: 4455,
    transactionCount: 150,
    balanceChange: 5,
    creditsChange: 3,
    debitsChange: -2,
    transactionChange: 10,
}

const profiles: StaticImageData[] = [Profile1, Profile2, Profile3, Profile4];
const participantNames = "Ava, Liam, Noah";
const extraParticipants = "+12 others";
const tableTabs: string[] = ['Overview', 'Transactions'];

export default function Page() {
    const [activeTab, setActiveTab] = useState<string>('Overview')
    const [loading, setLoading] = useState(true);
    const summaryCards = mapSummaryCards(dashboardSummary);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);


    return (
        <>
            <main>
                <Navbar/>
                <Container className="my-[28px] mb-[76px] relative">
                    <Sidebar/>
                    <section className={``}>
                        <section className="flex flex-col gap-[15px] 2xs:flex-row 2xs:justify-between items-start flex-shrink-0 ">
                            <div className="flex flex-col gap-[15px] sm:gap-[22px] md:gap-[28px]">
                                <div className="flex items-center gap-4 justify-between">
                                    <h1 className="font-bold text-heading leading-[40px] tracking-[-2%] flex items-center">
                                        Wallet Ledger
                                        <span className="pl-1 size-6 flex items-center justify-center">
                                    <Dropdown/>
                                </span>
                                    </h1>
                                    <StatusBadge text={'Active'} success={true}/>
                                </div>

                                <div className="flex gap-3">
                                    <AvatarGroup profiles={profiles}/>
                                    <p className="flex items-center gap-1 text-neutral-700-light tracking-[-0.5%] text-[12.5px] sm:text-[13.5px] md:text-[15px]">
                                        {participantNames}<span>{extraParticipants}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-center">
                                <button className="primary-btn">Share</button>
                                <div
                                    className="rounded-2xl size-9 flex items-center justify-center border-[1.5px] border-brand-600/20">
                                    <Ellipsis/>
                                </div>
                            </div>
                        </section>
                        <section className="space-y-[28px] mt-[28px]">
                            <Tabs tabs={tableTabs} activeTab={activeTab} onTabChange={setActiveTab}/>
                            {activeTab === "Overview" && (
                                <>
                                    <SummarySection summaryCards={summaryCards}/>
                                    <TransactionTable transactions={transactions} loading={loading}/>
                                </>
                            )}

                            {activeTab === "Transactions" && (
                                <div className={`flex items-center justify-center py-3`}>
                                    <div className="space-y-[18px] w-full">
                                        <h2 className="text-[20px] leading-[24px] font-bold -tracking-[2%]">All Transactions</h2>
                                        <TransactionTable transactions={transactions} loading={loading}/>
                                    </div>
                                </div>
                            )}
                        </section>
                    </section>
                </Container>
            </main>

        </>
    )
}