import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const RegisterForm = ({ onSubmit, isLoading }) => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const { isRegister } = useSelector((state) => state.auth);

    const [activeTab, setActiveTab] = useState("customer"); 

    const handleFormSubmit = (data) => {
        onSubmit(data , activeTab);

        if (isRegister) {
            reset();
        }
    };

    const registrationType = watch("registrationType");

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Tab Navigation */}
            <div className="flex justify-start mb-4">
                <button
                    type="button"
                    onClick={() => setActiveTab("customer")}
                    className={`px-4 py-2 font-medium text-sm rounded-l ${activeTab === "customer" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                    Customer
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("organizer")}
                    className={`px-4 py-2 font-medium text-sm rounded-r ${activeTab === "organizer" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                    Organizer
                </button>
            </div>

            
            <div>
                <h3 className="font-bold text-lg mb-4">User Details</h3>

                {/* Name Input */}
                <label className="block mb-2 font-bold text-[12px]">Name</label>
                <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-2 py-1 mb-4 border rounded"
                    placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500 text-[12px]">{errors.name.message}</p>}

                {/* Email Input */}
                <label className="block mb-2 font-bold text-[12px]">Email</label>
                <input
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address"
                        }
                    })}
                    className="w-full px-2 py-1 mb-4 border rounded"
                    placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-[12px]">{errors.email.message}</p>}

                {/* Password Input */}
                <label className="block mb-2 font-bold text-[12px]">Password</label>
                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters long" }
                    })}
                    className="w-full px-2 py-1 mb-4 border rounded"
                    placeholder="Enter your password"
                />
                {errors.password && <p className="text-red-500 text-[12px]">{errors.password.message}</p>}

                {/* Mobile Number Input */}
                <label className="block mb-2 font-bold text-[12px]">Mobile Number</label>
                <input
                    type="tel"
                    {...register("mobileNumber", {
                        required: "Mobile Number is required",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Mobile Number must be 10 digits"
                        }
                    })}
                    className="w-full px-2 py-1 mb-4 border rounded"
                    placeholder="Enter your mobile number"
                />
                {errors.mobileNumber && <p className="text-red-500 text-[12px]">{errors.mobileNumber.message}</p>}

                {/* Additional Fields for Organizer */}
                {activeTab === "organizer" && (
                    <>
                        {/* Organization Name */}
                        <label className="block mb-2 font-bold text-[12px]">Organization Name</label>
                        <input
                            type="text"
                            {...register("organizationName", { required: "Organization name is required" })}
                            className="w-full px-2 py-1 mb-4 border rounded"
                            placeholder="Enter your organization name"
                        />
                        {errors.organizationName && <p className="text-red-500 text-[12px]">{errors.organizationName.message}</p>}
                    </>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`relative flex items-center justify-center w-full px-4 py-2 text-white font-medium rounded ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                    {isLoading ? (
                        <>
                            <div className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4 mr-2"></div>
                            Registering...
                        </>
                    ) : (
                        "Register"
                    )}
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
