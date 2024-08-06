// react router
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

function App() {

  const [authUser] = useAuthState(auth);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
          <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to='/' />} />

          <Route path='/modelPost' element={authUser ? <ModelPost /> : <Navigate to='/login' />} />
          {/* <Route path="/modelPost" element={<ModelPost />} /> */}

          <Route path='/profile/:username' element={<UserProfile />} />
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/explore/:category" element={<ExploreProduct />} />
            <Route path="/product/:productId" element={<Product />} />
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
