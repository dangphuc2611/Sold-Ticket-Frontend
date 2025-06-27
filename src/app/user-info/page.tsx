"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
    id: number;
    username: string;
    email: string;
};

export default function UserInfo() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const jwt = localStorage.getItem("token");
        if (!jwt) return;

        fetch("http://localhost:1337/api/users/me", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data) => setUser(data))
            .catch(() => {
                localStorage.removeItem("token");
                router.push("/login");
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
            <button
                onClick={handleLogout}
            >
                Logout
            </button>
            <br />
            <button
                onClick={() => router.push("/")}
            >
                CRUD
            </button>
        </div>
    );
}
