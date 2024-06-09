import React from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import FilteredProducts from "./Components/FiltredProducts/FilteredProducts";
// import ModelPosts from "./Components/ModelPosts/ModelPosts";
// import ProfilePage from "./Components/ProfilePage/ProfilePage";
import SingleProduct from "./Components/FiltredProducts/SingleProduct";
import SignupLogin from "./Components/Login/SignupLogin";
import AuthForm from "./Components/Auth/Authform";
import Write from "./Components/Write/Write";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";


function App() {

  const [authUser] = useAuthState(auth);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            // element={authUser ? <Main></Main> : <Login></Login>}
            element={<Main></Main>}
          ></Route>
          <Route path='/auth' element={!authUser ? <AuthForm /> : <Navigate to='/' />} />
          <Route path="/post" element = {<Write/>}></Route>
          <Route path="/post" element = {<Write/>}></Route>
          <Route
            path="/filteredProducts/:type"
            element={<FilteredProducts></FilteredProducts>}
          ></Route>
          {/* <Route
            path="/ModelPosts"
            element={<ModelPosts/>}
          ></Route> */}
          {/* <Route path='/:username' element={<ProfilePage />} /> */}
          <Route
            path="/filteredProducts/:type/:id"
            element={<SingleProduct></SingleProduct>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
