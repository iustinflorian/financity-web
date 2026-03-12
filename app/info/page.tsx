"use client";
import { useRouter } from "next/navigation";
import { useAccounts } from "../hooks/useAccounts";

export default function InfoPage() {
    const { accounts, user, loading } = useAccounts();
    const router = useRouter();

    if (loading) return <div className="dashboard-wrapper" style={{color: 'white'}}>Loading...</div>;

    return (
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
    );
}