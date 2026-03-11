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
        
        try {
            const parsed = JSON.parse(session || ""); 
            setUser(parsed);

            if (parsed.id != null) {
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
            }
        } catch (e) {
            localStorage.clear();
            router.push("/login");
        }
    }, [router]);

    return { accounts, user, loading };
}