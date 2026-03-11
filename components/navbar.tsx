"use client";
import { useState, useEffect, Profiler } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { LogOut, LucidePersonStanding, PersonStanding, Settings } from "lucide-react";

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

  const isActive = (path : string) => pathname === path;

  return (
  <nav className="nav-container">
    <div className="nav">
      <div className="container">
        <div className={`btn ${isActive("/dashboard") ? "active" : ""}`} onClick={() => router.push("/dashboard")}>
          Dashboard
        </div>
        <div className={`btn ${isActive("/info") ? "active" : ""}`} onClick={() => router.push("/info")}>
          Information
        </div>
        <div className={`btn ${isActive("/trx") ? "active" : ""}`} onClick={() => router.push("/trx")}>
          Transactions
        </div>
        <div className={`btn ${isActive("/settings") ? "active" : ""}`} onClick={() => router.push("/settings")}>
          <Settings size={18} strokeWidth={2.5} /> <span></span>
        </div>
        <div className={`btn ${isActive("/personal") ? "active" : ""}`} onClick={() => router.push("/personal")}>
          <PersonStanding size={18} strokeWidth={2.5} /> <span></span>
        </div>
        <div className="btn" onClick={logout}>
          <LogOut size={18} strokeWidth={2.5} /> <span></span>
        </div>
      </div>
    </div>
  </nav>
);
}