"use client"
import { RegisterForm } from "@/components/register-form"
// import Link from "next/link"

export default function RegisterPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2 bg-white">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-start">
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        <RegisterForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-gray-200 lg:block">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 border-2 rounded-3xl relative">
                        <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 rounded-full border-2"></div>
                        <div className="absolute bottom-0 right-0 w-3/4 h-1/2 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full border-t-2 border-r-2 transform rotate-45 origin-top-right"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
