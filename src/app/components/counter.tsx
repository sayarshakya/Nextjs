"use client";
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export const Counter = () => {

    const {isLoaded, userId, sessionId} = useAuth();

    console.log("Counter component");
    const [count, setCount] = useState(0);

    if(!isLoaded || !userId || !sessionId) {
        return null;
    }

    return(
        <button onClick={() => setCount(count + 1)}>Clicked {count} times </button>
    );
};