import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrips } from '../../../store/actions/trips';
// import ErrorPage from "../../components/ErrorPage"
import Loading from "../../components/Loading"

const TripList = ({ onDelete, onEdit }) => {
    const dispatch = useDispatch()
    const { result, isLodding, error } = useSelector(state => state.trips)
    console.log(useSelector(state => state.trips));


    useEffect(() => {
        dispatch(getTrips({ url: `${import.meta.env.VITE_APP_BACKEND_URL}/trips` }))
    }, [dispatch])


    if (error.isErr){
        // return <ErrorPage message={error?.message}/>
        return <p>Error...</p>
}

    if (!result || result.length === 0) {
        return <div className='flex flex-col justify-center items-center shadow-md py-3 border rounded-lg'>
            <h3 className="text-2xl font-semibold text-red-500">You Do Not added any trip yet!</h3>
            <p>please add new trip</p>
        </div>
    }

    return <section className="my-4">
        <h3 className="text-2xl font-semibold mb-4">My Trips</h3>

        {isLodding ? (
            <Loading/>
        ) : (
            <ul className="space-y-4">
                    {result?.map((trip) => (
                    <li key={trip._id} className="p-4 border rounded-lg shadow-lg flex justify-between items-center">
                        <div>
                            <h4 className="text-xl font-semibold">{trip.name}</h4>
                            <p className="text-gray-600">{trip.destination}</p>
                            <p className="text-sm text-gray-500">{trip.date}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => onEdit(trip)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(trip.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </section>
    }


export default TripList;





