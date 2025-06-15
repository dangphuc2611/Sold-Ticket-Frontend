"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {

    const route = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Call API to reset password
        const res = await fetch("http://localhost:1337/api/forgot-password/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: localStorage.getItem("email"),
                password,
            }),
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.removeItem("email");
            alert("Password reset successfully!");
            route.push("/login");
        } else {
            alert(data.error?.message || "Failed to reset password.");
        }
    };
    return (
        <div>
            <form action="">
                <input type="text" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
                <input type="text" placeholder="Re-enter Password" onChange={e => setConfirmPassword(e.target.value)} />
            </form>
            <button onClick={handleResetPassword}>
                Reset Password
            </button>
        </div>
    )
}