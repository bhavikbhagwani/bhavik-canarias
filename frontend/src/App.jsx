import { Route, Routes, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'
import { useAuthContext } from "./context/AuthContext"
import { Toaster } from 'react-hot-toast'
import Loading from './components/loading/Loading'

// Lazy load pages
const Home = lazy(() => import('./pages/home/Home'))
const Login = lazy(() => import('./pages/login/Login'))
const Signup = lazy(() => import('./pages/signup/Signup'))
const Flights = lazy(() => import('./pages/flights/Flights'))
const BookingPage = lazy(() => import('./pages/booking/BookingPage'))
const SuccessPage = lazy(() => import('./pages/success/SuccessPage'))
const UserBookings = lazy(() => import('./pages/userbookings/UserBookings'))
const Islands = lazy(() => import('./pages/islands/Islands'))
const Faqs = lazy(() => import('./pages/faqs/Faqs'))
const ContactUs = lazy(() => import('./pages/contactus/ContactUs'))
const NotFound = lazy(() => import('./pages/notfound/NotFound'))

function App() {
  const { authUser } = useAuthContext()

  return (  
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            authUser ? (
              <Suspense fallback={<Loading />}><Home /></Suspense>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            authUser ? (
              <Navigate to="/" />
            ) : (
              <Suspense fallback={<Loading />}><Login /></Suspense>
            )
          } 
        />
        <Route 
          path="/signup" 
          element={
            authUser ? (
              <Navigate to="/" />
            ) : (
              <Suspense fallback={<Loading />}><Signup /></Suspense>
            )
          } 
        />
        <Route 
          path="/flights" 
          element={
            authUser ? (
              <Suspense fallback={<Loading />}><Flights /></Suspense>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/booking" 
          element={
            authUser ? (
              <Suspense fallback={<Loading />}><BookingPage /></Suspense>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/success" 
          element={
            authUser ? (
              <Suspense fallback={<Loading />}><SuccessPage /></Suspense>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/mybookings" 
          element={
            authUser ? (
              <Suspense fallback={<Loading />}><UserBookings /></Suspense>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/islands" 
          element={
            authUser ? (
              <Suspense fallback={<Loading />}><Islands /></Suspense>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/faqs" 
          element={
            authUser ? (
              <Suspense fallback={<Loading />}><Faqs /></Suspense>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/contactus" 
          element={
            authUser ? (
              <Suspense fallback={<Loading />}><ContactUs /></Suspense>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="*" 
          element={
            <Suspense fallback={<Loading />}><NotFound /></Suspense>
          } 
        />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
