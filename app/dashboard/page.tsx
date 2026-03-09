"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const session = localStorage.getItem("user_session");
        
        try {
            const parsed = JSON.parse(session || ""); 
            setUser(parsed);
        } catch (e) {
            localStorage.clear();
            //router.push("/login");
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        router.push("/login");
    };

    return (
        <div>
            <h1>Dashboard - Track your financial stats</h1>
            <p>Hello, <b>{user?.username}</b>!</p>
        
            <button className="button" onClick={() => router.push("/info")}>Accounts</button>
            <button className="button" onClick={() => router.push("/settings")}>Settings</button>
            <button className="button" onClick={logout}>Logout</button>
        </div>
    );
}