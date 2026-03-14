"use client";
import { useRouter } from "next/navigation";
import { useAccounts } from "../hooks/useAccounts";
import { useState } from "react";
import { copyFile } from "fs";

export default function AccountsPage() {
    const { accounts, user, loading } = useAccounts();
    const [ showModal, setShowModal ] = useState(false);
    const [ showModalType, setShowModalType ] = useState(false);
    const [ accountName, setAccountName ] = useState<any>("");
    const [ isCurrent, setIsCurent ] = useState<any>(true);
    const router = useRouter();

    if (loading) return <div className="dashboard-wrapper" style={{color: 'white'}}>Loading...</div>;

    const handleAccountCreation = async (isCurrentSelected: boolean) => {

        const url = `http://localhost:8080/api/accounts/createacc`;
        let body;

        body = {
            ownerId: user.id,
            accountName: accountName,
            isCurrent: isCurrentSelected
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

    const handleCopy = (e: React.MouseEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        navigator.clipboard.writeText(value);
        alert("Copied to clipboard: " + value);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowModalType(false);
        setAccountName("");
        setIsCurent(true);
    };

    return (
        <div>  
            {showModal && showModalType && (
                <div className="dashboard-wrapper">
                    <div className="dashboard-grid">
                        <div className="card">
                            <h3 className="heading">Current Account</h3>
                            <h2 className="heading text-sm">Your money, available anywhere, anytime</h2>
                            <div>
                                <p>
                                    Standard checking
                                </p>
                                <p>
                                    Interest rate: 0% per year
                                </p>
                                <p>
                                    0% commission on standard operations
                                </p>
                            </div><br/>
                            <button className="btn" type="button" 
                                style={{backgroundColor: '#065dba', color: 'white'}}
                                onClick={
                                    () => {
                                        handleAccountCreation(true);
                                    }
                                }
                            >Choose</button>
                        </div>
                        <div className="card" style={{backgroundColor: '#40cf66'}}>
                            <h3 className="heading">Savings Account</h3>
                            <h2 className="heading text-sm">Stop spending. Start growing</h2>
                            <div>
                                <p>
                                    High-yield savings
                                </p>
                                <p>
                                    Interest rate: 6.25% per year
                                </p>
                                <p>
                                    Only withdrawing to current accounts
                                </p>
                            </div><br/>
                            <button className="btn" type="button" 
                                style={{backgroundColor: '#20ba06', color: 'white'}}
                                onClick={
                                    () => {
                                        handleAccountCreation(false);
                                    }
                                }
                            >Choose</button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && !showModalType && (
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
                        <span 
                            className={!accountName.trim() ? "tooltip-wrap" : ""}
                            data-tooltip="Please enter an account name!"
                            style={{ cursor: !accountName.trim() ? 'not-allowed' : 'default' }} 
                        >
                            <button className="btn" type="button" 
                                disabled={!accountName.trim()}
                                style={{
                                    opacity: !accountName.trim() ? 0.5 : 1,
                                    cursor: !accountName.trim() ? 'not-allowed' : 'pointer',
                                }}
                                onClick={() => setShowModalType(true)}
                            >Next</button>
                        </span>
                        <button className="btn" style={{backgroundColor: '#ff4444', color: 'white'}} type="button" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}

            {!showModal && (
                <div className="form">
                    <button className="btn" type="button" 
                        onClick={ () => setShowModal(true)}
                    >Create account</button>
                </div>
            )}

            <div className="dashboard-wrapper">
                <div className="dashboard-grid">
                    {accounts.map((acc: any) => (
                        <div key={acc.id} className="card">
                            <h3 className="heading" style={{ paddingBottom: '0.5em' }}>{acc.name}</h3>
                            
                            <div className="placeholder-box" style={{ padding: '0.8em', marginBottom: '1em' }}>
                                {acc.accountType}
                            </div>

                            <input 
                                className="input-nohover" 
                                readOnly 
                                onClick={handleCopy}
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
