import React from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPages, Dashboard } from "./pages";
import Login from "./pages/login";
import axios from "axios";
import { useAuth } from "./store/auth";
import { jwtDecode } from "jwt-decode";
import { Sidebar } from "./components";

const App = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  const { loginResponse } = useAuth();
  let role;
  let decoded;

  if (loginResponse) {
    const token = loginResponse;
    decoded = jwtDecode(token);
  }

  role = decoded?.role;

  if (role === 1) {
    return (
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    );
  }

  if (role === 0) {
    return (
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
