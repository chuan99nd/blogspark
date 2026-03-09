import SearchPage from "./SearchPage";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search",
    description: "Search blog posts by title, tag, or topic.",
    robots: { index: false, follow: true },
};

export default function Search() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchPage />
        </Suspense>
    )
}