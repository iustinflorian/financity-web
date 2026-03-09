"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="nav-container">
      {/* STANGA: Dropdown & Burger */}
      <div className="flex-1 flex">
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)}> Test </button>

          {isOpen && (
            <div className="nav-dropdown">
              <button className="nav-link" onClick={() => router.push("/dashboard")}>Dashboard</button>
              <button className="nav-link" onClick={() => router.push("/info")}>Accounts</button>
              <button className="nav-link" onClick={() => router.push("/settings")}>Settings</button>
            </div>
          )}
        </div>
      </div>

      {/* MIJLOC: Logo */}
      <div className="flex-none">
        <span className="nav-logo">FINANCITY</span>
      </div>

      {/* DREAPTA: Account */}
      <div className="flex-1 flex justify-end">
        <button className="nav-account-btn" onClick={() => router.push("/settings")}>
          👤
        </button>
      </div>
    </nav>
  );
}