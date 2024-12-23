import React, { useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCalendarAlt, FaMoneyBillWave, FaUsers, FaRegClock, FaQuestionCircle } from 'react-icons/fa'; // Importing icons
import Loading from "../../components/Loading";
import { getTripById } from '../../../store/actions/trips';
import { addToCart } from '../../../store/actions/carts';
import ErrorPage from '../../components/ErrorPage';

const TripDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { tripInfo, isLoading, error } = useSelector(state => state.trips);
    const { isLogged, result } = useSelector(state => state.auth);


    const hendelAddToCart = (tripId) => {
        if (!isLogged) {
            return navigate("/user/login")
        }
        dispatch(addToCart({ url: `${import.meta.env.VITE_APP_BACKEND_URL}/cart/add`, tripId, token: result?.user?.accessToken }))
        navigate("/")
    }

    useEffect(() => {
        dispatch(getTripById({ url: `${import.meta.env.VITE_APP_BACKEND_URL}/trips/${id}` }));
    }, [id, dispatch]);

    if (isLoading) {
        return <Loading />;
    }

    if (error.isErr) {
        return <ErrorPage message={error?.message}/>;
    }

    if (tripInfo) {
        const { name, description, startDate, endDate, price, slotsAvailable, cancellationPolicy , _id} = tripInfo;
       const imageUrl = "https://cdn.pixabay.com/photo/2016/03/26/22/34/snow-1281636_1280.jpg" 
        // Mock data for additional information
        const itinerary = [
            "Day 1: Arrival and Welcome Dinner",
            "Day 2: Begin the trek to the base camp",
            "Day 3: Rest day at the base camp",
            "Day 4-6: Trekking through the Himalayas",
            "Day 7: Return to the starting point"
        ];

        const highlights = [
            "Trek through breathtaking Himalayan landscapes",
            "Visit local villages and interact with indigenous communities",
            "Stunning views of Everest, Annapurna, and other peaks",
            "Guided by experienced local trekking guides"
        ];

        const faqs = [
            {
                question: "What should I bring for this trip?",
                answer: "You should bring sturdy hiking boots, warm clothing, a camera, sunscreen, and any personal items you'll need during the trip."
            },
            {
                question: "Is the trek suitable for beginners?",
                answer: "While the trek is challenging, it is suitable for those with a basic level of fitness. Our guides will ensure everyone is supported along the way."
            }
        ];

 

        return (
            <div className="container mx-auto py-6 px-6 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600">{name}</h1>
                    <img src={imageUrl || "https://via.placeholder.com/800x400.png?text=Trip+Image"} alt="Trip Image" className="rounded-lg my-4 w-full h-72 object-cover" />

                    <p className="text-base sm:text-lg text-gray-700 mt-4">{description}</p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="text-sm text-gray-500 flex items-center">
                            <FaCalendarAlt className="mr-2 text-blue-600" />
                            <span><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                            <FaCalendarAlt className="mr-2 text-blue-600" />
                            <span><strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                            <FaUsers className="mr-2 text-blue-600" />
                            <span><strong>Slots Available:</strong> {slotsAvailable}</span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center col-span-2">
                            <FaRegClock className="mr-2 text-blue-600" />
                            <span><strong>Cancellation Policy:</strong> {cancellationPolicy}</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl sm:text-2xl font-semibold text-blue-600">Itinerary</h3>
                        <ul className="list-disc ml-6 mt-4 text-gray-700">
                            {itinerary?.map((item, index) => (
                                <li key={index} className="mt-2">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl sm:text-2xl font-semibold text-blue-600">Trip Highlights</h3>
                        <ul className="list-disc ml-6 mt-4 text-gray-700">
                            {highlights?.map((highlight, index) => (
                                <li key={index} className="mt-2">{highlight}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl sm:text-2xl font-semibold text-blue-600">Why Choose This Trip?</h3>
                        <p className="mt-4 text-gray-700">This is a perfect trip for those seeking adventure, serenity, and a unique cultural experience. Experience the wonders of the Himalayas like never before!</p>
                        <ul className="list-inside list-disc mt-4 text-gray-700">
                            <li className="mt-2">Personalized travel experience with a focus on comfort and safety</li>
                            <li className="mt-2">Opportunity to connect with fellow adventurers</li>
                            <li className="mt-2">Guided by experienced trekkers with local knowledge</li>
                        </ul>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl sm:text-2xl font-semibold text-blue-600">Trip FAQs</h3>
                        <div className="mt-4 text-gray-700">
                            {faqs?.map((faq, index) => (
                                <div key={index} className="mt-2">
                                    <strong><FaQuestionCircle className="mr-2 text-blue-600" />{faq.question}</strong>
                                    <p className="ml-4">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center flex-col sm:flex-row">
                        <p className="text-lg sm:text-xl font-semibold text-blue-600">${price}</p>
                        <button 
                            onClick={() => hendelAddToCart(_id)}
                         className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return <ErrorPage message="Trip details not found." />;
};

export default TripDetails;
