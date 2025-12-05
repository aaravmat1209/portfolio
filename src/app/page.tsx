"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/content');
    }, [router]);

    return (
        <div className="w-full h-screen bg-[#0B0C10] flex items-center justify-center">
            <div className="text-[#66FCF1] text-xl">Loading...</div>
        </div>
    );
}
