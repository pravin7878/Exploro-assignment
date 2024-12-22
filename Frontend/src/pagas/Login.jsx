import React, { useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../store/slices/authSlice";
import { loginUser } from "../../store/actions/auth";


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { result: { user }, isLogged, error } = useSelector(state=>state.auth)
    console.log(useSelector(state => state.auth));
    

    const onSubmit = (data) => {
        console.log("Form data:", data);
        dispatch(loginUser({
            url: `${import.meta.env.VITE_APP_BACKEND_URL}/users/login`, data
        }))

    };

    const navigator = () => {
        dispatch(resetState())
        navigate("/user/register")
    }

    useEffect(()=>{
        if (isLogged ){
            user?.role === "organizer" ? 
            navigate("/dashboard")
                : navigate("/")
        }
    } , [isLogged , dispatch])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 from-blue-500 to-indigo-500">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Login Now
                </h2>
                {error && (
                    <p className="py-3 text-red-500">
                        {error.message || "An error occurred. Please try again."}
                    </p>
                )}

                <LoginForm onSubmit={onSubmit} navigator={navigator} />
            </div>
        </div>
    );
};

export default Login;
