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
                const data = await response.json();
                console.log("Registration successful:", data);
                localStorage.setItem("user_session", JSON.stringify(data));
                router.push("/home");
            }
        } catch (error){
            console.error("Registration failed:", error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input 
                type = "email"
                placeholder = "Enter your email"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type = "username"
                placeholder = "Enter your username"
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type = "password"
                placeholder = "Enter your password"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={
                () => {
                    router.push("/login")
                }
            }>Already have an account?</button>
        </div>
    );
}