import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";

export const LoginForm = ({ onSubmit, navigator }) => {
    const { isLogged } = useSelector(state => state.auth); 
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleFormSubmit = (data) => {
        onSubmit(data);

        if (isLogged) {
            reset();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                {/* Email Input */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className={`mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Input */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register("password")}
                        className={`mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Enter your password"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Login
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Don’t have an account?{" "}
                <span onClick={navigator} className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer">
                    Register here
                </span>
            </p>
        </>
    );
};
