// react router
import { BrowserRouter,
  Route, Routes,Router,
  Navigate,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// layout
import RootLayout from "./layout/RootLayout";
// pages
import Home from "./pages/Home";
import ExploreProduct from "./pages/ExploreProducts";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import AuthForm from "./component/Auth/Authform";
import UserProfile from "./pages/UserProfile";

// react toast
import { Toaster } from "react-hot-toast";

// auth state check
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<RootLayout />}>
//       <Route index element={<Home />} />
//       <Route path="/explore/:category" element={<ExploreProduct />}></Route>
//       <Route path="/product/:productId" element={<Product />}></Route>
//       <Route path="/checkout" element={<Checkout />}></Route>
//     </Route>
//   )
// );

function App() {

  const [authUser] = useAuthState(auth);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={!authUser ? <AuthForm /> : <Navigate to='/' />} />
          <Route path='/:username' element={<UserProfile />} />
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/explore/:category" element={<ExploreProduct />} />
            <Route path="/product/:productId" element={<Product />} />
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
