"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
    const router = useRouter();


    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("userId");
        router.push("/");
    }
    }, []);
}