import React from 'react'
import Login from '../pagas/Login'
import { Home } from '../pagas/Home'
import Register from '../pagas/Registration'
import Dashboard from '../pagas/Deshboard'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import TripDetails from '../pagas/trips/TripDetailPage'
import { CartPage } from '../pagas/CartPage'
import TripForm from './deshbord/TripForm'
import TripList from './deshbord/TripList'

export const AllRoutes = () => {
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
         <Route path="/dashboard" element={
              <PrivateRoute>
                  <Dashboard />
              </PrivateRoute>
          }>
                  <Route index element={<TripList />} />
                  <Route path="trips/new" element={<TripForm />} />
                  {/* <Route path="settings" element={<Settings />} /> */}
                  {/* <Route path="profile" element={<Profile />} /> */}
          </Route>
         

          <Route path="/trips/:id" element={<TripDetails />} />
          <Route path="/cart" element={
            <PrivateRoute>
                  <CartPage />
            </PrivateRoute>
          } />
      </Routes>
  )
}
