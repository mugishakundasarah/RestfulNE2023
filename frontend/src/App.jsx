import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import 'typeface-poppins'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import jwtDecode from 'jwt-decode'

import './App.css'
import Dashboard from './pages/Dashboard'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {
  function PrivateRoutes() {
    const token = localStorage.getItem('token');
    if(!token){
      return <Navigate to={'/login'} />;
    }
    const user = jwtDecode(token)
    if(!user){
      localStorage.removeItem('token')
    }
    return <Outlet />;
  }

  function PublicRoutes() {
    const token = localStorage.getItem('token');
    if(token){
      const user = jwtDecode(token)
      if (user) {
        return <Navigate to={'/dashboard'} />;
      }
    }
    return <Outlet />;
  }

  return (
    <div className='font-poppins h-[100vh] w-[100%]'>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Route>
          <Route element={<PublicRoutes/>}>
            <Route path='/login' element={<Signin/>}/>
            <Route path='/register' element={<Signup/>}/>
            <Route path='/' element={<Signin/>}/>
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        style={{zIndex: 9999999999}}
        theme="colored"
        position="top-right"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  )
}

export default App

