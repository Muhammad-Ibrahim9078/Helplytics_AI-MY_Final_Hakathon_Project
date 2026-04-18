import { Navigate } from 'react-router-dom'
import { getData } from '../context/UserContext'

const PublicRoute = ({ children }) => {
  const { user, isAuthChecked } = getData()

  if (!isAuthChecked) {
    return null // Or a loading spinner
  }

  return (
    <div>
      {
        user ? <Navigate to={'/home'} /> : children
      }
    </div>
  )
}

export default PublicRoute
