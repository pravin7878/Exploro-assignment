import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-[30%] bg-gray-500 text-white p-6 shadow-lg  h-screen">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link to="/dashboard" className="text-lg hover:text-blue-300 transition">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/trips/new" className="text-lg hover:text-blue-300 transition">Add New Trip</Link>
                    </li>
                    <li>
                        {/* <Link to="/dashboard/settings" className="text-lg hover:text-blue-300 transition">Settings</Link> */}
                    </li>
                    <li>
                        {/* <Link to="/dashboard/profile" className="text-lg hover:text-blue-300 transition">Profile</Link> */}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
