import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {createTrip , deleteTrip , updateTrip} from "../../../store/actions/trips"

const TripForm = ({ isEditing, trip }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
const dispatch = useDispatch()
const {result : {user}} = useSelector(state=>state.auth)
const {error} = useSelector(state=>state.trips)
    // console.log(useSelector(state => state.trips));


    // Reset the form with existing trip data when editing
    React.useEffect(() => {
        if (isEditing && trip) {
            reset(trip);
        }
    }, [isEditing, trip, reset]);

    const onSubmit = (data) => {
        console.log(data);
        const tripData = { ...data, price: Number(data.price), slotsAvailable: Number(data.slotsAvailable)}
        dispatch(createTrip({ url: `${import.meta.env.VITE_APP_BACKEND_URL}/trips`, token: user?.accessToken, data: tripData }))

    }

    return (
        <section className="my-8 p-8 bg-white shadow-md rounded-md max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">{isEditing ? 'Edit Trip' : 'Add New Trip'}</h3>
            {/* {error.isErr && <p>{error.message}</p>} */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Trip Name</label>
                    <input
                        type="text"
                        {...register('name', {
                            required: 'Trip name is required',
                            minLength: { value: 3, message: 'Must be at least 3 characters' },
                            maxLength: { value: 100, message: 'Cannot exceed 100 characters' },
                        })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter trip name"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        {...register('description', {
                            required: 'Description is required',
                            maxLength: { value: 2000, message: 'Cannot exceed 2000 characters' },
                        })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter description"
                        rows="4"
                    ></textarea>
                    {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Start Date</label>
                        <input
                            type="date"
                            {...register('startDate', {
                                required: 'Start date is required',
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.startDate && <p className="text-red-600 text-sm mt-1">{errors.startDate.message}</p>}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">End Date</label>
                        <input
                            type="date"
                            {...register('endDate', {
                                required: 'End date is required',
                                validate: (value) => new Date(value) > new Date() || 'End date must be after start date',
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.endDate && <p className="text-red-600 text-sm mt-1">{errors.endDate.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Price</label>
                        <input
                            type="number"
                            {...register('price', {
                                required: 'Price is required',
                                min: { value: 0, message: 'Price must be greater than or equal to 0' },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter price"
                        />
                        {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Slots Available</label>
                        <input
                            type="number"
                            {...register('slotsAvailable', {
                                required: 'Slots available is required',
                                min: { value: 0, message: 'Slots must be greater than or equal to 0' },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter available slots"
                        />
                        {errors.slotsAvailable && <p className="text-red-600 text-sm mt-1">{errors.slotsAvailable.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Cancellation Policy</label>
                    <select
                        {...register('cancellationPolicy', { required: 'Cancellation policy is required' })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="full refund">Full Refund</option>
                        <option value="50% refund">50% Refund</option>
                        <option value="no refund">No Refund</option>
                    </select>
                    {errors.cancellationPolicy && <p className="text-red-600 text-sm mt-1">{errors.cancellationPolicy.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white text-lg font-medium py-3 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    {isEditing ? 'Update Trip' : 'Add Trip'}
                </button>
            </form>
        </section>
    );
};

export default TripForm;
