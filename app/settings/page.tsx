"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SettingsPage () {
    const [user, setUser] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const router = useRouter();

    useEffect( () => {
        const session = localStorage.getItem("user_session");
        
        try{
            const parsed = JSON.parse(session || "");
            setUser(parsed);
        } catch (e) {
            localStorage.clear();
            router.push("/login");
        }
    }, []);

    const handleUpdatePassword = async () => {
        if(confirmPassword == oldPassword){
            try {
                const res = await fetch(`http://localhost:8080/api/users/${user.id}/update`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({ 
                    oldPassword: oldPassword,
                    newPassword: newPassword 
                    })
                });

                if (res.ok) {
                    alert("Password successfully updated!");
                    setShowModal(false);
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                } else {
                    const errorData = await res.json();
                    alert("Error: " + (errorData.message || "Invalid old password"));
                }
            } catch (e) {
                alert("Error: " + e);
            }
        } else {
            alert("Passwords don't match!");
        }
    };

    return (
        <div className={`max-w-md mx-auto`}>
                    {!showModal && (
                        <form className="form">
                            <h2 className="heading">Available Settings</h2>
                            <button className="btn" type="button" onClick={() => setShowModal(true)}>Change password</button><br/>
                        </form>
                    )}
        
                    {showModal && (
                        <form className="form">
                            <h3 className="heading">Enter your old password</h3>
                            <input
                                className="input"
                                type="password"
                                placeholder="Enter password.."
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <input
                                className="input"
                                type="password"
                                placeholder="Confirm password.."
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <h3 className="heading">Enter your new password</h3>
                            <input
                                className="input"
                                type="password"
                                placeholder="New password.."
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            
                            <div className="btn-group">
                                <button className="btn" type="button" onClick={handleUpdatePassword}>Submit</button>
                                <button className="btn" type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                            
                        </form>
                    )}
        </div>
    );
}