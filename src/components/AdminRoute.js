import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const ADMIN_EMAILS = [
  "sakindu.weenath3621@gmail.com", 
];

export default function AdminRoute({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  if (checking) return <div className="p-6 text-center">Checking authentication…</div>;

  // not logged in or not one of admin emails -> redirect
  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    return <Navigate to="/" replace />;
  }

  // authorized
  return children;
}
