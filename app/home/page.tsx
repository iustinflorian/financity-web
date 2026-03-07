"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const session = localStorage.getItem("user_session");
        
        try {
            const parsed = JSON.parse(session || ""); 
            setUser(parsed);

            fetch(`http://localhost:8080/api/accounts/${parsed.id}/acc`)
                .then(res => res.json())
                .then(data => setAccounts(Array.isArray(data) ? data : []))
                .catch(err => console.error("API Error"));
        } catch (e) {
            localStorage.clear();
            router.push("/login");
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        router.push("/login");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard Financity</h1>
            <p>Salut, <b>{user?.username}</b>!</p>
            
            {accounts.map((acc: any) => (
                <div key={acc.id} style={{ margin: "10px 0", borderBottom: "1px solid #ccc" }}>
                    IBAN: {acc.iban} | <b>{acc.balance} RON</b>
                </div>
            ))}

            <button onClick={logout} style={{ marginTop: "20px" }}>Logout</button>
        </div>
    );
}