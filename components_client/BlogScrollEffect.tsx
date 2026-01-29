"use client";

import { useEffect } from "react";

export default function BlogScrollEffect({ id }: { id?: string }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return null;
}