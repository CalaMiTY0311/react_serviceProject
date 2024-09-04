import { useEffect } from 'react';
import { BrowserRouter,
  Route, Routes,
  Navigate,
  // Switch
} from "react-router-dom";

// layout
import RootLayout from "./layout/RootLayout";
// pages
import Home from "./pages/Home";
import ExploreProduct from "./pages/ExploreProducts";
import Product from "./pages/Product";
import ModelsPage from "./pages/ModelsPage";
import ModelPost from "./pages/ModelPost";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import UserProfile from "./pages/UserProfile";
// react toast
import { Toaster } from "react-hot-toast"
// auth state check
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";

import useAuthStore from './store/authStore';

function App() {
  const authUser = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logout);
  console.log(authUser)

  useEffect(() => {
    const userInfo = localStorage.getItem('user-info');
    const tokenInfo = localStorage.getItem('token')
    console.log(authUser)
    if (userInfo) {
      try {
        const token = JSON.parse(tokenInfo);
        const expireAt = token.expireAt;
        if (expireAt) {
          const currentTime = new Date().getTime();
          const expireTime = parseInt(expireAt, 10);
          if (currentTime > expireTime) {
            localStorage.removeItem('token');
            localStorage.removeItem('user-info')
            logoutUser();
            console.log('User info expired and removed from local storage.');
          }
        }
      } catch (error) {
        console.error('Error parsing user-info:', error);
      }
    }
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  const isAuthenticated = checkAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to='/' />} />
          <Route path='/signup' element={!isAuthenticated ? <Signup /> : <Navigate to='/' />} />

          <Route path='/profile/:username' element={<UserProfile />} />

          <Route path='/modelPost' element={isAuthenticated ? <ModelPost /> : <Navigate to='/login' />} />


          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/explore/:category" element={<ExploreProduct />} />

            <Route path="/product/:createdAt" element={<Product />} />
            <Route path="/models/:category" element={<ModelsPage />} />
          </Route>
          
        </Routes>
        <Toaster
          toastOptions={{
            style: {
              padding: "16px",
              fontSize: "1.6rem",
            },
          }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
