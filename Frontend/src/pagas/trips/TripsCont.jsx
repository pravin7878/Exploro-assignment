import { useSelector } from 'react-redux';
import Loading from "../../components/Loading";
import ErrorPage from '../../components/ErrorPage';
import TripCard from './TripCard';

export const TripsCont = () => {
  const { result, isLodding, error } = useSelector(state => state?.trips);
  console.log(useSelector(state => state?.trips));
  
console.log(error);

  // Loading state
  if (isLodding) {
    return <Loading />;
  }

  // Error state
  if (error?.isErr) {
    return <ErrorPage message={error.message}/>
  }

  // return (
  //   <div className="container mx-auto py-6 px-4">
  //     {!result || result.length === 0 ?
  //       <div className='flex justify-center align-middle items-center flex-col py-10 border shadow-lg rounded-lg'>
  //         <h1 className="text-2xl font-bold text-center text-red-500">No Trip Available Right Now.</h1>
  //         <p className='text-xl font-bold text-center text-green-500'>We will add new trip soon.</p>
  //       </div>
  //       :
  //       <>
  //         <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Our Available Trips</h1>
  //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  //           {result?.map((trip) => (
  //             <TripCard key={trip._id} trip={trip} />
  //           ))}
  //         </div>
  //       </>}
  //   </div>
  // );
};
