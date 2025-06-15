"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function RegisterForm() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setLoading] = useState(false)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("http://localhost:1337/api/auth/local/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            })

            const data = await res.json()
            if (res.ok) {
                // localStorage.setItem("token", data.jwt)
                console.log("Register successfully!")
                router.push("/login")
            } else {
                console.log(data.error?.message || "Register failed!")
            }
        }
        // catch (err) {
        //     console.log("Server error, please try again later.")
        // } 
        finally {
            setLoading(false)
        }
    }


    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Create to your account</h1>
                <p className="text-gray-600">
                    Enter the field below to create to your account
                </p>
            </div>
            <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="username">
                        Username
                    </Label>
                    <Input
                        placeholder="Enter your username"
                        id="username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">
                        Email
                    </Label>
                    <Input
                        placeholder="Enter your email"
                        id="email"
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input
                        placeholder="Enter your password"
                        id="password"
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                        Re-enter password
                    </Label>
                    <Input
                        placeholder="Re-enter your password"
                        id="confirmPassword"
                        type="password"
                        required
                    />
                </div>
                <Button
                    className="w-full bg-black text-white hover:bg-gray-800"
                    type="submit"
                    disabled={isLoading}
                    onClick={handleRegister}
                >
                    {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
            </form>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="text-blue-600 hover:text-blue-800"
                >
                    Login
                </Link>
            </div>
        </div>
    )
}
