import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/deshbord/Sidebar';
import { getTrips } from '../../store/actions/trips';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
    
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 p-6 bg-white shadow-lg rounded-lg m-6">
                <header className="mb-6">
                    <h2 className="text-3xl font-semibold text-gray-700">Welcome to Your Dashboard</h2>
                </header>

                {/* Nested routes will be rendered here */}
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
