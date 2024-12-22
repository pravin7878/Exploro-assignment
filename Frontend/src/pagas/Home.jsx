import React, { useEffect } from 'react'
import { TripsCont } from './trips/TripsCont'
import { useDispatch, useSelector } from 'react-redux'
import { getCartData } from '../../store/actions/carts'
import { getTrips } from '../../store/actions/trips'

export const Home = () => {
  const dispatch = useDispatch()
  const { result, isLogged } = useSelector(state=>state.auth)
  console.log(result);
  
  useEffect(() => {
    dispatch(getTrips({ url: `${import.meta.env.VITE_APP_BACKEND_URL}/trips` }));
    if (isLogged){
      dispatch(getCartData({ url: `${import.meta.env.VITE_APP_BACKEND_URL}/cart`, token: result?.user?.accessToken }))
    }
  }, [dispatch]);
  return (<>
    <TripsCont/>
  </>
  )
}
