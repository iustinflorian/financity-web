"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try{
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (response.ok){
                const data = await response.json();
                console.log("Login successful:", data);
                localStorage.setItem("user_session", JSON.stringify(data));
                router.push("/home");
            }
        } catch (error){
            console.error("Login failed:", error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input 
                type = "email"
                placeholder = "Enter your email"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type = "password"
                placeholder = "Enter your password"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}