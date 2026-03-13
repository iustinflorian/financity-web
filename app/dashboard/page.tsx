"use client";
import { useRouter } from "next/navigation";
import { useAccounts } from "../hooks/useAccounts";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const { accounts, loading } = useAccounts();
    const router = useRouter();

    useEffect(() => {
        const session = localStorage.getItem("user_session");
        
        try {
            const parsed = JSON.parse(session || ""); 
            setUser(parsed);
        } catch (e) {
            localStorage.clear();
            router.push("/login");
        }
    }, []);

    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    const logout = () => {
        localStorage.clear();
        router.push("/login");
    };

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-grid">
                <div className="card">
                    <p className="heading" style={{ paddingBottom: '0.5em', fontSize: '1rem' }}>Balance (All accounts)</p>
                    <div className="placeholder-box">{loading ? "..." : `${totalBalance.toLocaleString()} RON`}</div>
                </div>

                <div className="card">
                    <p className="heading" style={{ paddingBottom: '0.5em', fontSize: '1rem' }}>Monthly Budget</p>
                    <div className="placeholder-box">...</div>
                </div>

                <div className="card span-full">
                    <p className="heading" style={{ textAlign: 'left', paddingBottom: '1em' }}>Analytics (Soon to be replaced by AI)</p>
                    <div className="placeholder-box">...</div>
                </div>
            </div>
        </div>
    );
}