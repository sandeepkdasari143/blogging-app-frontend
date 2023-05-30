import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { CookiesProvider } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie';
import Cookie from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  // const isExistingUser = useSelector(state => state.auth.isExistingUser)
  
  const authToken = Cookie.get("token");
  console.log(authToken)
  if (authToken) {
    return children;
  }
  return <Navigate to="/"/>
}

const AuthProtectedRoute = ({ children }) => {
  // const isExistingUser = useSelector(state => state.auth.isExistingUser)
  
  const authToken = Cookie.get("token");
  console.log(authToken)
  if (authToken) {
    return <Navigate to="/home"/>
  }
  return children;
}

const App = () => {
  return (
    <>
      <CookiesProvider>  
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthProtectedRoute><LogIn /></AuthProtectedRoute>} />
            <Route path="/signup" element={<AuthProtectedRoute><SignUp /></AuthProtectedRoute> } />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </CookiesProvider>
    </>
  )
}

export default App