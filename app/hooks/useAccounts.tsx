"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAccounts() {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
    const session = localStorage.getItem("user_session");
    
    if (!session) {
        router.push("/login");
        return;
    }

    try {
        const parsed = JSON.parse(session); 
        setUser(parsed);

        if (parsed?.id) {
            fetch(`http://localhost:8080/api/accounts/${parsed.id}/acc`)
                .then(res => res.json())
                .then(data => {
                    setAccounts(Array.isArray(data) ? data : []);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("API Error", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    } catch (e) {
        localStorage.removeItem("user_session");
        router.push("/login");
    }
}, []);

    return { accounts, user, loading };
}