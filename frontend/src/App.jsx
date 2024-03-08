import React from "react";
import WeatherApp from "./components/WeatherApp";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<WeatherApp />} path="/" exact />
        </Route>
        <Route element={<SignIn />} path="/signin" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </Router>
  );
};

export default App;
