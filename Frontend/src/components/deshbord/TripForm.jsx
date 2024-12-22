import React from 'react';
import { useForm } from 'react-hook-form';

const TripForm = ({ onSubmit, isEditing, trip }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Reset the form with existing trip data when editing
    React.useEffect(() => {
        if (isEditing && trip) {
            reset(trip);
        }
    }, [isEditing, trip, reset]);

    return (
        <section className="my-4 p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Trip' : 'Add New Trip'}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Trip Name</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Trip name is required' })}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Enter trip name"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Destination</label>
                    <input
                        type="text"
                        {...register('destination', { required: 'Destination is required' })}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Enter destination"
                    />
                    {errors.destination && <p className="text-red-500">{errors.destination.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Date</label>
                    <input
                        type="date"
                        {...register('date', { required: 'Date is required' })}
                        className="w-full p-3 border rounded-lg"
                    />
                    {errors.date && <p className="text-red-500">{errors.date.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        {...register('price', { required: 'Price is required' })}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Enter price"
                    />
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                </div>

                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                    {isEditing ? 'Update Trip' : 'Add Trip'}
                </button>
            </form>
        </section>
    );
};

export default TripForm;
