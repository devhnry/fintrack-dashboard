export interface Transaction {
    id: string;
    date: string;
    remark: string;
    amount: number;
    currency: string;
    type: 'Credit' | 'Debit';
}

export interface DashboardSummary {
    totalBalance: number;
    totalCredits: number;
    totalDebits: number;
    transactionCount: number;
    balanceChange: number;
    creditsChange: number;
    debitsChange: number;
    transactionChange: number;
}

export type SortKey = keyof Transaction;

export type SortDirection = "asc" | "desc";