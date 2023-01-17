import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookingCar from "./Pages/BookingCar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./App.css";
import Mybookings from "./Pages/Mybookings";
import AddCar from "./Pages/AddCar";
import AdminHome from "./Pages/AdminHome";
import EditCar from "./Pages/EditCar";

//check login 

function App() {
  const user = localStorage.getItem("user");
  
  const [token, setToken] = useState("");
  const [expiration, setExpiration] = useState("");

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token")));
    setExpiration(new Date(new Date().getTime() + 1000 *60*60));
  }, []);


  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href="/"
  }, []);

  let logoutTimer;
  useEffect(() => {
    if (token && expiration) {
      const remainingTime =
        new Date(expiration).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, expiration]);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={token ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/bookingcar/:carId"
            element={token ? <BookingCar /> : <Login />}
          />
          <Route
            path="/mybookings"
            element={token ? <Mybookings /> : <Login />}
          />
          <Route path="/addcar" element={token ? <AddCar /> : <Login />} />
          <Route path="/admin" element={token ? <AdminHome /> : <Login />} />
          <Route
            path="/editcar/:editId"
            element={token ? <EditCar /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
