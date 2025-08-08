import {DashboardSummary} from "@/types/types";
import {summaryConfig} from "@/data/data";

export function formatNumber(value: number): string {
    return value.toLocaleString();
}

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
