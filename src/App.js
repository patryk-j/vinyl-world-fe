import React, { useEffect } from "react";
import "./assets/style/app.less";
import { ConfigProvider } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "pages/Login.pages";
import Rental from "pages/Rental.pages";
import Home from "pages/Home.pages";
import NavigationHeader from "components/NavigationHeader.component";
import Register from "pages/Register.pages";
import Profile from "pages/Profile.pages";
import AdminPanel from "pages/AdminPanel";
import Vinyl from "components/Vinyl.component";
import isAuthenticated from "auth/auth";
import isAdmin from "auth/adminAuth";

const App = () => {
  const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
      navigate("/home", { replace: true });
    }, [navigate]);

    return null;
  };

  return (
    <>
      <NavigationHeader />
      <ConfigProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rental" element={<Rental />} />
          {isAuthenticated() ? (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="rental/vinyl/:_id" element={<Vinyl />} />
            </>
          ) : null}

          {isAuthenticated() && isAdmin() ? (
            <Route path="/adminpanel" element={<AdminPanel />} />
          ) : null}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </ConfigProvider>
    </>
  );
};

export default App;
