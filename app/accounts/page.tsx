"use client";
import { useRouter } from "next/navigation";
import { useAccounts } from "../hooks/useAccounts";
import { useState } from "react";

export default function AccountsPage() {
    const { accounts, user, loading } = useAccounts();
    const [ showModal, setShowModal ] = useState(false);
    const [ accountName, setAccountName ] = useState<any>("");
    const [ isCurrent, setIsCurent ] = useState(true);
    const router = useRouter();

    if (loading) return <div className="dashboard-wrapper" style={{color: 'white'}}>Loading...</div>;

    const handleAccountCreation = async (e: React.SubmitEvent) => {

        const url = `http://localhost:8080/api/accounts/createacc`;
        let body;

        body = {
            ownerId: user.id,
            accountName: accountName,
            isCurrent: isCurrent
        }

        try {
            const res = await fetch(url , {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                alert(`Account created succesfully`);
                closeModal;
                window.location.reload();
            }
        } catch (error){
            alert(error);
        }

    };

    const accountTypeSelector = () => {
        
    };

    const closeModal = () => {
        setShowModal(false);
        setAccountName("");
        setIsCurent(true);
    };

    return (
        <div>
            {showModal && (
                <div className="form">
                    <h3 className="heading">Enter account details</h3>
                    <input
                        className="input"
                        type="text"
                        placeholder="Account name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                    />

                    <div className="btn-group">
                        <button className="btn" type="button" onClick={accountTypeSelector}>Next</button>
                        <button className="btn" style={{backgroundColor: '#ff4444', color: 'white'}} type="button" onClick={closeModal}>Cancel</button>
                    </div>
                </div>

            )}



            {!showModal && (
                <div className="form">
                    <button className="btn" type="button" onClick={() => setShowModal(true)}>Create account</button>
                </div>
            )}

            <div className="dashboard-wrapper">
                <div className="dashboard-grid">
                    {accounts.map((acc: any) => (
                        <div key={acc.id} className="form">
                            <h3 className="heading" style={{ paddingBottom: '0.5em' }}>{acc.name}</h3>
                            
                            <div className="placeholder-box" style={{ padding: '0.8em', marginBottom: '1em' }}>
                                {acc.accountType}
                            </div>

                            <input 
                                className="input" 
                                readOnly 
                                value={acc.iban} 
                                style={{ textAlign: 'center' }}
                            />

                            <div style={{ textAlign: 'center', marginTop: '2em' }}>
                                <span style={{ fontSize: '0.75rem', display: 'block', color: '#666' }}>
                                    CURRENT BALANCE
                                </span>
                                <b style={{ fontSize: '1.8rem', color: 'black' }}>
                                    {acc.balance} <small style={{ fontSize: '0.9rem' }}>RON</small>
                                </b>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function async(SubmitEvent: any) {
    throw new Error("Function not implemented.");
}
