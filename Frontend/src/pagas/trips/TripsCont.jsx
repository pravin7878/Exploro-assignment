import { useSelector } from 'react-redux';
import Loading from "../../components/Loading";
import ErrorPage from '../../components/ErrorPage';
import TripCard from './TripCard';

export const TripsCont = () => {
  const { result, isLoading, Error } = useSelector(state => state?.trips);

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Error state
  if (Error?.isErr) {
    return <ErrorPage message={Error?.message} />;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Our Available Trips</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {result?.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </div>
  );
};
