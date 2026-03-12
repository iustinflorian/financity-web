"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAccounts } from "../hooks/useAccounts";

type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER" | null;

export default function TransactionsPage() {
    const { accounts, loading } = useAccounts(); 
    const [user, setUser] = useState<any>(null);
    const [activeModal, setActiveModal] = useState<TransactionType>(null);
    
    const [amount, setAmount] = useState("");
    const [targetIban, setTargetIban] = useState("");
    const [selectedAccountId, setSelectedAccountId] = useState(""); 

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
    }, [router]);

    useEffect(() => {
        if (accounts.length > 0 && !selectedAccountId) {
            setSelectedAccountId(accounts[0].id.toString());
        }
    }, [accounts, selectedAccountId]);

    const handleTransaction = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedAccountId) {
            alert("Please select an account first!");
            return;
        }

        const url = `http://localhost:8080/api/accounts/${selectedAccountId}/${activeModal?.toLowerCase()}`;
        let body;
        
        if (activeModal === "TRANSFER") {
            body = {
                targetIban: targetIban,
                amount: parseFloat(amount)
            };
        } else {
            body = parseFloat(amount); 
        }

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                alert(`${activeModal} success!`);
                closeModal();
                window.location.reload();
            } else {
                alert("Error: Transaction failed. Check console.");
            }
        } catch (err) {
            alert("Network error: Make sure Backend is running on 8080");
        }
    };

    const closeModal = () => {
        setActiveModal(null);
        setAmount("");
        setTargetIban("");
    };

    if (loading) return <div className="dashboard-wrapper" style={{color: 'white'}}>Loading accounts...</div>;

    return (
        <div className="max-w-md mx-auto">
            {!activeModal && (
                <div className="form">
                    <h2 className="heading">Financial Operations</h2>
                    
                    <label style={{color: 'black', fontSize: '0.8rem', fontWeight: 'bold'}}>SELECT SOURCE ACCOUNT</label>
                    <select 
                        className="input" 
                        value={selectedAccountId} 
                        onChange={(e) => setSelectedAccountId(e.target.value)}
                        style={{ cursor: 'pointer' }}
                    >
                        {accounts.map((acc: any) => (
                            <option key={acc.id} value={acc.id}>
                                {acc.name} ({acc.balance} RON)
                            </option>
                        ))}
                    </select>

                    <button className="btn" onClick={() => setActiveModal("DEPOSIT")}>Deposit Money</button>
                    <button className="btn" onClick={() => setActiveModal("WITHDRAW")}>Withdraw Money</button>
                    <button className="btn" onClick={() => setActiveModal("TRANSFER")}>Send Money (Transfer)</button>
                </div>
            )}

            {activeModal && (
                <form className="form" onSubmit={handleTransaction}>
                    <h3 className="heading">{activeModal}</h3>
                    
                    <p style={{fontSize: '0.8rem', textAlign: 'center', marginBottom: '1em'}}>
                        From: <b>{accounts.find(a => a.id.toString() === selectedAccountId)?.name}</b>
                    </p>

                    <input
                        className="input"
                        type="number"
                        placeholder="Amount (e.g. 100.00)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />

                    {activeModal === "TRANSFER" && (
                        <input
                            className="input"
                            type="text"
                            placeholder="Recipient IBAN"
                            value={targetIban}
                            onChange={(e) => setTargetIban(e.target.value)}
                            required
                        />
                    )}

                    <button className="btn" type="submit">Confirm {activeModal}</button>
                    <button className="btn" type="button" onClick={closeModal} style={{backgroundColor: '#ff4444', color: 'white'}}>
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
}