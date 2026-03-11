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
        <div className="btn" onClick={() => router.push("/dashboard")}>
          Dashboard
        </div>
        <div className="btn" onClick={() => router.push("/info")}>
          Information
        </div>
        <div className="btn" onClick={() => router.push("/logs")}>
          Transactions
        </div>
        {/* Putem adăuga un stil special pentru Logout dacă vrei */}
        <div className="btn" onClick={logout} style={{ color: '#d32f2f' }}>
          Logout
        </div>
      </div>
    </div>
  </nav>
);
}