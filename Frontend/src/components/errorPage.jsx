import React from 'react';

const ErrorPage = ({ message }) => {
    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{message}</p>
            <p className='text-blue-500'>Please Reload The page Or chack your Internate connection</p>
        </div>
    );
};

export default ErrorPage;
