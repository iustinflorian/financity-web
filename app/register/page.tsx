"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = () => {
        //todo: java connecton
        localStorage.setItem("user_session", "active");
        router.push("/home");
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