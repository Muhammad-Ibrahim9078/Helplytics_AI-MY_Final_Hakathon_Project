import { Navigate } from 'react-router-dom'
import { getData } from '../context/UserContext'

const ProtectedRoute = ({children}) => {
    const { user, isAuthChecked } = getData()

  if (!isAuthChecked) {
    return null // Or a loading spinner
  }

  return (
    <div>
      {
        user ? children : <Navigate to={'/login'}/>
      }
    </div>
  )
}

export default ProtectedRoute