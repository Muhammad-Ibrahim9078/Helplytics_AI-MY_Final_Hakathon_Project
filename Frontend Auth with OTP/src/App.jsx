import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import Verify from './pages/Verify'
import ProtectedRoute from './components/ProtectedRoutes'
import PublicRoute from './components/PublicRoute'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOtp from './pages/VerifyOtp'
import ChangePassword from './pages/ChangePassword'
import Profile from './pages/Profile'
import Landing from './pages/Landing'
import CreateRequest from './pages/CreateRequest'
import Messages from './pages/Messages'
import Leaderboard from './pages/Leaderboard'
import AiCenter from './pages/AiCenter'
import Notifications from './pages/Notifications'
import Explore from './pages/Explore'
import RequestDetail from './pages/RequestDetail'
import Onboarding from './pages/Onboarding'

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute><Landing /></PublicRoute>
  },
  {
    path: "/home",
    element: <ProtectedRoute><Home /></ProtectedRoute>
  },
  {
    path: "/profile",
    element: <ProtectedRoute><Profile /></ProtectedRoute>
  },
  {
    path: "/create-request",
    element: <ProtectedRoute><CreateRequest /></ProtectedRoute>
  },
  {
    path: "/messages",
    element: <ProtectedRoute><Messages /></ProtectedRoute>
  },
  {
    path: "/leaderboard",
    element: <ProtectedRoute><Leaderboard /></ProtectedRoute>
  },
  {
    path: "/ai-center",
    element: <ProtectedRoute><AiCenter /></ProtectedRoute>
  },
  {
    path: "/notifications",
    element: <ProtectedRoute><Notifications /></ProtectedRoute>
  },
  {
    path: "/explore",
    element: <ProtectedRoute><Explore /></ProtectedRoute>
  },
  {
    path: "/onboarding",
    element: <ProtectedRoute><Onboarding /></ProtectedRoute>
  },
  {
    path: "/request/:id",
    element: <ProtectedRoute><RequestDetail /></ProtectedRoute>
  },
  {
    path: "/signup",
    element: <PublicRoute><Signup /></PublicRoute>
  },
  {
    path: "/login",
    element: <PublicRoute><Login /></PublicRoute>
  },
  {
    path: "/forgot-password",
    element: <PublicRoute><ForgotPassword /></PublicRoute>
  },
  {
    path: "/verify",
    element: <VerifyEmail />
  },
  {
    path: "/verify/:token",
    element: <Verify />
  },
  {
    path: "/verify-otp/:email",
    element: <VerifyOtp />
  },
  {
    path: "/change-password/:email",
    element: <ChangePassword />
  },
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
