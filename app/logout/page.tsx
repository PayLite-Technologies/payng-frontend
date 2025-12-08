"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

export default function LogoutPage() {
  const router = useRouter();
  const { setUser, setStudents } = useUserStore();

  useEffect(() => {
    // Clear user data
    setUser(null);
    setStudents([]);

    // Clear localStorage
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("authToken");
      window.localStorage.removeItem("payng-role");
      document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "payng-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    // Redirect to login
    router.push("/login");
  }, [router, setUser, setStudents]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000080] mx-auto"></div>
        <p className="mt-4" style={{ color: "#808080" }}>
          Logging out...
        </p>
      </div>
    </div>
  );
}

