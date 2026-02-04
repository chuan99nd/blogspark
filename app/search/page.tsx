import SearchPage from "./SearchPage";
import { Suspense } from "react";

export default function Search() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchPage />
        </Suspense>
    )
}