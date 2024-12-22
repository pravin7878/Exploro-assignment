import React from 'react'
import Login from '../pagas/loginPage'
import { Home } from '../pagas/Home'
import Register from '../pagas/Registration'
import Dashboard from '../pagas/Deshboard'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import AdminLogin from '../pagas/admin'
import TripDetails from '../pagas/trips/TripDetailPage'
// import AddLeadForm from '../pagas/leads/AddNewLead'

export const AllRoutes = () => {
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          {/* <Route path="/dashboard" element={
              <PrivateRoute>
                  <Dashboard />
              </PrivateRoute>
          } />
          <Route path="/addnew" element={
              <PrivateRoute>
                  <AddLeadForm />
              </PrivateRoute>
          } />

          <Route path='/admin/login' element={<AdminLogin/>}/> */}
          <Route path="/trips/:id" element={<TripDetails />} />
          {/* <Route path='/private' element={<PrivateRoute />} /> */}
      </Routes>
  )
}
