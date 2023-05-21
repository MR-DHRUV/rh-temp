import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Sidebar/Navbar";
import { useNavigate } from "react-router-dom";
import { url } from "../Constants";

const Layout = () => {
  const navigate = useNavigate();

  const checkToken = async () => {
    const response = await fetch(`${url}/auth/verifyuser`, {
      method: 'POST'
      ,
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'token': localStorage.getItem('token')
      },
    })

    const json = await response.json()

    // corrupted token
    if (json.success === false) {
      localStorage.removeItem('token');
      navigate("/login");
    }

    localStorage.setItem('UserFilter', json.data.filter);
  }

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    checkToken();
  }, []);

  return (
    <>
      <div className="container-fluid d-flex px-0">
        <div className="page-container">
          <Sidebar />
          <>
            <Navbar />
            <Outlet />
          </>
        </div>
      </div>
    </>
  );
};

export default Layout;
