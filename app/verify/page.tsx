"use client";
import {use, useState} from "react";
import {useRouter} from "next/navigation";

export default function RegisterPage() {
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleVerify = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    code: code
                })
            });

            if (response.ok){
                const data = await response.json();
                console.log("Register & verification successful:", data);
                localStorage.setItem("user_session", JSON.stringify(data));
                router.push("/dashboard");
            }
        } catch (error){
            console.error("Registration failed:", error);
        }
    };

    return (
        <div>
            <form className="form">
                <p className="heading">
                    One more step! <br/>Type the email and the
                    <span className="bg-gradient-to-r from-blue-800 to-green-500 bg-clip-text text-transparent font-bold"> code </span>
                    you received.
                </p>
                <input
                    className="input"
                    type = "text"
                    placeholder = "example@email.com"
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="input"
                    type = "password"
                    placeholder = "• • • • • •"
                    value = {code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button 
                    className="btn"
                    type="button"
                    onClick={handleVerify}
                    >Submit</button>
            </form>
        </div>
    );
}