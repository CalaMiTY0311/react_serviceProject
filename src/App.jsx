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
import ModelPosts from "./pages/ModelPosts";
import Checkout from "./pages/Checkout";
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
          {/* <Switch> */}
          <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
          <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to='/' />} />
          {/* </Switch> */}
          <Route path='/profile/:username' element={<UserProfile />} />
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/explore/:category" element={<ExploreProduct />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/models/:category" element={<ModelPosts />} />
            <Route path="/checkout" element={<Checkout />} />
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
