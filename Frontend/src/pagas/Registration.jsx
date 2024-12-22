import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import RegisterForm from '../components/RegisterForm';
import { registerNewUser } from '../../store/actions/auth';
import { resetState } from '../../store/slices/authSlice';
import { useEffect } from 'react';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isLoading, isRegister } = useSelector(state => state.auth);

    const handleSubmit = (data, activeTab) => {
        if (activeTab === "organizer"){
            dispatch(registerNewUser({
                url: `${import.meta.env.VITE_APP_BACKEND_URL}/organizer/register`,
                userData: data
            }));
        }
        else{
            dispatch(registerNewUser({
                url: `${import.meta.env.VITE_APP_BACKEND_URL}/users/register`,
                userData: data
            }));
        }
       
    };

    useEffect(() => {
        if (isRegister) {
            setTimeout(() => {
                navigate("/user/login");
            }, 500);
        }
        
    }, [isRegister, error, navigate]);

    const navigateToLogin = () => {
        dispatch(resetState());
        navigate("/user/login");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="flex flex-col w-[90%] bg-white p-6 rounded-lg shadow-lg md:w-[45%]">
                <h2 className="text-2xl font-bold mb-4 text-center">Register Now</h2>
                {error && <p className='text-red-500 py-3'>{error.message}</p>}
                <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
                <p className="mt-4 text-sm text-center">
                    Already have an account?{' '}
                    <span
                        onClick={navigateToLogin}
                        className="text-blue-600 underline cursor-pointer"
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
