"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(
    () => {
      const session = localStorage.getItem("user_session");
      setIsLogged(!!session);
  }, [pathname]);

  const logout = () => {
        localStorage.removeItem("user_session");
        setIsLogged(false);
        router.push("/login");
  };

  if (!isLogged || isLogged === null) {
    return null;
  }

  return (
    <nav className="nav-container">
      <div className="nav">
        <div className="container">
          <div className="btn" onClick={() => router.push("/dashboard")}>Dashboard</div>
          <div className="btn" onClick={() => router.push("/info")}>Information</div>
          <div className="btn" onClick={() => router.push("/logs")}>Transactions</div>
          <div className="btn" onClick={logout}>Logout</div>
          <svg
            className="outline"
            overflow="visible"
            width="600"
            height="60"
            viewBox="0 0 600 60"
            xmlns="http://www.w3.org/2000/svg"
          >
          <rect
            className="rect"
            pathLength="100"
            x="0"
            y="0"
            width="600"
            height="60"
            fill="transparent"
            strokeWidth="4"
          ></rect>
          </svg>
        </div>
      </div>
    </nav>
  );
}