import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { customer, organizer } from "../scripts/constent";

import CartInfo from ".././utils/CartInfo"

import { IoBagAdd } from "react-icons/io5";
const UserAuthInfo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLogged, result } = useSelector((state) => state.auth);
    const user = result?.user; 

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    if (!isLogged) {
        return (
            <button
                onClick={() => navigate("/user/login")}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
                Login
            </button>
        );
    }

    return (
        <div className="flex items-center space-x-4">
            <p>
                Hello👋 <span className="font-bold">{user?.name || "User"}</span>
            </p>
            {user?.role === organizer && <span>Organization Penal</span>}
            <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
            {user?.role === customer && <CartInfo />}
        </div>
    );
};


export default UserAuthInfo
