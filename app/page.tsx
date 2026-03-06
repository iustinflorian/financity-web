"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function MainPage() {
    const router = useRouter();
    const [isLogged, setIsLogged] = useState(false);

    useEffect(
        () => {
            const user = localStorage.getItem("user_session");
            if(user){
                router.push("/home");
            }
        }
    )

    return (
        <div>
            <h1>FinanCity (TEMP)</h1>
            <p>Welcome to FinanCity. This is the landing page.</p>
            <button 
                style={{background: "blue", color: "white"}} 
                onClick={
                    () => {
                        router.push("/register")
                    }
            }>Get Started</button>
        </div>
    )
}