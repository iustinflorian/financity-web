"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        
        const userData = {
            email: email,
            username: username,
            password: password
        };

        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (response.ok){
                router.push("/verify");
            }
        } catch (error){
            alert("Registration failed: " + error);
        }
    };

    return (
        <div>
            <form className="form">
                <p className="heading">
                    Get started with 
                    <span className="bg-linear-to-r from-blue-800 to-green-500 bg-clip-text text-transparent font-bold"> FinanCity</span>
                </p>
                <input 
                    className="input"
                    type = "email"
                    placeholder = "email@example.com"
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    className="input"
                    type = "username"
                    placeholder = "username"
                    value = {username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="input"
                    type = "password"
                    placeholder = "•••••••••••"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    className="btn"
                    type="button"
                    onClick={handleRegister}
                    >Register</button>
                <button 
                    className="cursor-pointer text-sm bg-blue-700 bg-clip-text text-transparent"
                    type="button"
                    onClick={
                    () => {
                        router.push("/login")
                    }
                }>Already have an account?</button>
            </form>
        </div>
    );
}