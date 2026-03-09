"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InfoPage() {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const session = localStorage.getItem("user_session");
        
        try {
            const parsed = JSON.parse(session || ""); 
            setUser(parsed);

            if (parsed.id != null){
                fetch(`http://localhost:8080/api/accounts/${parsed.id}/acc`)
                    .then(res => res.json())
                    .then(data => setAccounts(Array.isArray(data) ? data : []))
                    .catch(err => console.error("API Error"));
            }
        } catch (e) {
            localStorage.clear();
            router.push("/login");
        }
    }, []);

    return (
        <div>
            <h1>Account metrics</h1>
            <p>Here's a list of your financial entities, <b>{user?.username}</b>!</p>
            
            {accounts.map((acc: any) => (
                <div key={acc.id}>
                    IBAN: {acc.iban} | <b>{acc.balance} RON</b>
                </div>
            ))}

            <button onClick={() => router.push("/dashboard")}>Go back</button>
        </div>
    );
}