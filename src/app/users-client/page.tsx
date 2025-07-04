"use client";
import { useState, useEffect } from "react";

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export default function UsersClient() {
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!res.ok) throw new Error("Failed to fetch users");
                const data = await res.json();
                setUsers(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    },[]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
       <ul className="space-y-4">
        {users.map((user) => (
            <li key={user.id} className="p-4 bg-white shadow-md rounded-lg text-gray-700">
                {user.name} - {user.email}
            </li>
        ))}
       </ul>
    );
}

