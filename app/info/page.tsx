"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccounts } from "../hooks/useAccounts";

export default function InfoPage() {
    const { accounts, user, loading } = useAccounts();
    const router = useRouter();

    if (loading) return <div className="dashboard-wrapper">Loading...</div>;

    return (
        <div>
            <h1>Account metrics</h1>
            <p>Here's a list of your financial entities, <b>{user?.username}</b>!</p>
            
            {accounts.map((acc: any) => (
                <div key={acc.id}>
                    NAME: {acc.name} | TYPE: {acc.accountType} | IBAN: {acc.iban} | <b>{acc.balance} RON</b>
                </div>
            ))}

            <button onClick={() => router.push("/dashboard")}>Go back</button>
        </div>
    );
}