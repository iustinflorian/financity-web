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
    <main className="login-page">
      <div className="login-card">
        <h1>LOGIN</h1>
        
        <div className="input-group">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="login-btn-container" onClick={handleLogin}>
          <span className="btn-text">Sign In</span>
        </div>
      </div>
    </main>
  );
}