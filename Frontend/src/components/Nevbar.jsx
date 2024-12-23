import React, { lazy, Suspense } from "react";
import LoadingSpinner from "../utils/SuspanceLoadin";

const UserAuthInfo = lazy(()=>import("../utils/UserAuthInfo"))

const Navbar = () => {
    
    return (
        <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <div className="text-lg font-bold">Smart Trips</div>
            <Suspense fallback={<LoadingSpinner/>}>
                <UserAuthInfo />
            </Suspense>
        </nav>
    );
};
export default Navbar;
