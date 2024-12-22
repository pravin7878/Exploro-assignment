import React from 'react';
import { format } from 'date-fns';
import { FaRegCalendarAlt, FaRegClock, FaRegUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/actions/carts';

const TripCard = ({ trip }) => {
    const { name, description, startDate, endDate, price, slotsAvailable, cancellationPolicy } = trip;
    const { result, isLogged } = useSelector(state=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const hendelAddToCart = (tripId)=>{
        if (!isLogged){
            return navigate("/user/login")
        }
        dispatch(addToCart({ url: `${import.meta.env.VITE_APP_BACKEND_URL}/cart/add`, tripId, token: result?.user?.accessToken  }))
    }
    return (
        <div className="flex justify-between gap-4  flex-col bg-white rounded-lg shadow-lg hover:shadow-xl transition-all px-2 duration-300 ease-in-out border-black border py-3">
            <div >
                <img
                    src="https://cdn.pixabay.com/photo/2016/03/26/22/34/snow-1281636_1280.jpg"
                    alt={name}
                    className="w-full h-48 object-cover rounded-t-lg rounded"
                />

                <h2 className="text-xl font-semibold text-blue-600">{name}</h2>
                <p className="text-sm text-gray-600 mt-2">{description}</p>

                <div className="mt-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FaRegCalendarAlt />
                        <span>{format(new Date(startDate), 'MMM dd, yyyy')} - {format(new Date(endDate), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
                        <FaRegUser />
                        <span>{slotsAvailable} slots available</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
                        <FaRegClock />
                        <span>{cancellationPolicy}</span>
                    </div>
                    <p className="text-lg font-bold text-blue-600">price : ${price}</p>
                </div>
            </div>

            <div className='flex justify-between w-full  '>
                <button
                    onClick={() => hendelAddToCart(trip._id)}
                    className="bg-blue-600 md:text-[12px] text-center w-[45%] text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add To Cart
                </button>
                <Link
                    to={`/trips/${trip._id}`}
                    className="bg-blue-600 md:text-[12px] text-center w-[45%] text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    More Info
                </Link>
            </div>

        </div>
    );
};

export default TripCard;
