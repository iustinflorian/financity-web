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
                router.push("/dashboard");
            }
        } catch (error){
            console.error("Login failed:", error);
        }
    };
    
  return (
    <form className="form">
        <p className="heading">
                    Get back into 
                    <span className="bg-gradient-to-r from-blue-800 to-green-500 bg-clip-text text-transparent font-bold"> FinanCity</span>
                </p>
        <input 
          className="input"
          type="email" 
          placeholder="email@example.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          className="input"
          type="password" 
          placeholder="•••••••••••" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        /> 
        <button 
          className="btn" 
          type="button"
          onClick={handleLogin}>Login</button>
        <button 
          className="cursor-pointer text-sm bg-blue-700 bg-clip-text text-transparent"
          type="button"
          onClick={
            () => {
              router.push("/register")
            }
        }>Don't have an account? Create one!</button>
    </form>
  );
}