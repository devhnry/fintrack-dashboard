import {Transaction} from "@/types/types";

export const summaryConfig = [
    { key: "totalBalance", label: "Total Balance", changeKey: "balanceChange", isCurrency: true },
    { key: "totalCredits", label: "Total Credits", changeKey: "creditsChange", isCurrency: true },
    { key: "totalDebits", label: "Total Debits", changeKey: "debitsChange", isCurrency: true },
    { key: "transactionCount", label: "Transactions", changeKey: "transactionChange", isCurrency: false },
];

export const transactions: Transaction[] = [
    {
        id: "1",
        date: "2023-10-01",
        remark: "Salary",
        amount: 3000,
        currency: "USD",
        type: "Credit",
    },
    {
        id: "2",
        date: "2023-10-02",
        remark: "Groceries",
        amount: 150,
        currency: "USD",
        type: "Debit",
    },
    {
        id: "3",
        date: "2023-10-03",
        remark: "Gym Membership",
        amount: 50,
        currency: "USD",
        type: "Debit",
    },
    {
        id: "4",
        date: "2023-10-03",
        remark: "Dinner",
        amount: 40,
        currency: "USD",
        type: "Debit",
    },
    {
        id: "5",
        date: "2023-10-05",
        remark: "Movie Tickets",
        amount: 30,
        currency: "USD",
        type: "Debit",
    },
    {
        id: "6",
        date: "2023-10-06",
        remark: "Rent",
        amount: 3200,
        currency: "USD",
        type: "Debit",
    },
    {
        id: "7",
        date: "2023-10-07",
        remark: "Utilities",
        amount: 100,
        currency: "USD",
        type: "Debit",
    },
    {
        id: "8",
        date: "2023-10-08",
        remark: "Car Payment",
        amount: 400,
        currency: "USD",
        type: "Debit",
    },
    {
        id: "9",
        date: "2023-10-09",
        remark: "Insurance",
        amount: 200,
        currency: "USD",
        type: "Debit",
    },
];