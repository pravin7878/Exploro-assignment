import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeFromCart } from '../../store/actions/carts';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const CartPage = () => {
    const dispatch = useDispatch();
    const {result} = useSelector((state) => state.auth);
    /*
    error: null
    isLoading: false
    totalItem: 2
    trips: [{}]
    */

    const { trips, totalItem, isLoading, error } = useSelector((state) => state.cart);
    
    const totalPrice = trips.reduce((acc, trip) => acc + trip.price * trip.quantity, 0);


    const handleClearCart = () => {
        dispatch(clearCart({ url: `${import.meta.env.VITE_APP_BACKEND_URL}/cart`, token: result?.user?.accessToken }));
    };

    const handleDeleteItem = (tripId) => {
        dispatch(removeFromCart({ url: `${import.meta.env.VITE_APP_BACKEND_URL}/cart/${tripId}`, token: result?.user?.accessToken }));
    };

    const handleCheckout = () => {
        if (trips.length === 0) {
            toast.error('Your cart is empty. Add items before checking out.');
            return;
        }
        toast.success('Proceeding to checkout!');
        console.log('Checkout initiated with items:', trips);
    };

    return (
        <div className="container mx-auto p-4">
            <Link to={"/"} className='bg-red-500 text-white font-bold px-3 py-2 rounded-md'>Back To Home</Link>
            <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

            {/* Show loading spinner if data is loading */}
            {isLoading && <p className="text-center text-lg">Loading...</p>}

            {/* Show error if present */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Main content */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Cart Items */}
                <div className="w-full lg:w-2/3">
                    {trips.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {trips.map((trip) => (
                                <div
                                    key={trip._id}
                                    className="border rounded-lg p-4 shadow hover:shadow-lg bg-white"
                                >
                                    <h2 className="text-lg font-bold mb-2">{trip.name}</h2>
                                    <p className="text-gray-700 text-sm mb-1">{trip.description}</p>
                                    <p className="text-gray-700 text-sm">
                                        Start Date: {new Date(trip.startDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700 text-sm">
                                        End Date: {new Date(trip.endDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700 text-sm">
                                        Price: ₹{trip.price}
                                    </p>
                                    <p className="text-gray-700 text-sm">
                                        Quantity: {trip.quantity}
                                    </p>
                                    <p className="text-gray-700 text-sm">
                                        Total: ₹{trip.price * trip.quantity}
                                    </p>

                                    {/* Delete button */}
                                    <button
                                        onClick={() => handleDeleteItem(trip._id)}
                                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                                    >
                                        Remove Item
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-lg">Your cart is empty.</p>
                    )}
                </div>

                {/* Summary Section */}
                {trips.length > 0 && (
                    <div className="w-full lg:w-1/3 bg-gray-100 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
                        <p className="text-gray-700 text-lg">
                            Total Items: <span className="font-semibold">{totalItem}</span>
                        </p>
                        <p className="text-gray-700 text-lg">
                            Total Price: <span className="font-semibold">₹{totalPrice}</span>
                        </p>
                        <p className="text-gray-700 text-lg">
                            Estimated Tax: <span className="font-semibold">₹{(totalPrice * 0.18).toFixed(2)}</span>
                        </p>
                        <p className="text-gray-700 text-lg">
                            Grand Total: <span className="font-semibold">₹{(totalPrice * 1.18).toFixed(2)}</span>
                        </p>

                        {/* Checkout and Clear cart buttons */}
                        <div className="mt-6 flex flex-col gap-4">
                            <button
                                onClick={handleCheckout}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                            >
                                Checkout
                            </button>
                            <button
                                onClick={handleClearCart}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
