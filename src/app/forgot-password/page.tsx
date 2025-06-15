"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const handleSentOTP = async () => {
        // alert("Sending OTP to " + email);
        const res = await fetch("http://localhost:1337/api/forgot-password/send-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        })
        const data = await res.json()
        alert(data.message)
    }

    const handleVerifyOTP = async () => {
        // alert("Sending OTP to " + email);
        const res = await fetch("http://localhost:1337/api/forgot-password/verify-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                otp,
            }),
        })
        console.log(otp)
        const data = await res.json()
        console.log(data.message)
        if (res.ok) {
            localStorage.setItem("email", email);
            router.push("/reset-password");
        }
    }
    return (
        <div>
            <h1 className="font-bold">Forgot Password</h1>
            <form action="">
                <input type="email" className="border-black border-1 w-100" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
            </form>
            <button onClick={handleSentOTP}>Sent OTP</button>
            <form action="">
                <input type="text" className="border-black border-1 w-100" placeholder="Enter your OTP" onChange={e => setOtp(e.target.value)} />
            </form>
            <button onClick={handleVerifyOTP}>Verify OTP</button>
        </div>
    )
}