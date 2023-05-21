import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import ForgotPass from "./Components/Auth/ForgotPass";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Scholarships/Home";
import Details from "./Components/Scholarships/Details";
import ComingSoon from "./Components/Layout/ComingSoon";

import "./Components/Assets/Styles/main.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/scholarship" element={<Layout />}>
            <Route index element={<Home />} />
            <Route exact path="/scholarship/details/:id" element={<Details />} />
          </Route>

          <Route exact path="/" element={<ComingSoon />}></Route>

          {/* Auth Routes */}
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/forgotpassword" element={<ForgotPass />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
