import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  LandingPages,
  Login,
  Dashboard,
  Maintenance,
  Kendaraan,
  Berita,
  Karyawan,
  NotFound,
  Users,
  TambahBerita,
  DetailBerita,
} from "./pages";
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
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/kendaraan" element={<Kendaraan />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/karyawan" element={<Karyawan />} />
          <Route path="/users" element={<Users />} />
          <Route path="/TambahBerita" element={<TambahBerita />} />
          <Route path="/DetailBerita/:id" element={<DetailBerita />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  if (role === 0) {
    return (
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/kendaraan" element={<Kendaraan />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/TambahBerita" element={<TambahBerita />} />
          <Route path="/DetailBerita/:id" element={<DetailBerita />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
