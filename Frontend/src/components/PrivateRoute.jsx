import { useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom'

export const PrivateRoute = ({children}) => {
  const { isLogged} = useSelector(state => state.auth)
  console.log(isLogged);
  
  
  return (
    isLogged ? children : <Navigate to={"/user/login"}/>
)
  
}
