import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaUsersGear } from "react-icons/fa6";

const Sidebar = () => {
  const navigate = useNavigate();
  const { loginResponse, setLoginResponse, setLogOut } = useAuth();
  const [getMe, setGetMe] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getMes = async () => {
    try {
      const response = await axios.get(`/getMe`);
      setGetMe(response.data.getMe);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMes();
  }, []);

  //-------------------- Logic Sidebarrr ----------------------

  let role;
  let decoded;
  if (loginResponse) {
    const token = loginResponse;
    decoded = jwtDecode(token);
  }
  role = decoded?.role;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const logout = await axios.get(`/Logout`);
    setLoginResponse(logout);
    navigate("/");
    setLogOut();
    toast.success("Logout Berhasil");
  };

  //---------------------- End Logic Sidebarrr -----------------
  return (
    <>
      <label htmlFor="my-drawer-2" className="mt-5 drawer-button sm:hidden">
        <GiHamburgerMenu size={26} />
      </label>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-black min-h-full w-80 p-4 text-white relative">
            <div className="dropdown mx-auto text-center relative">
              <div
                className="avatar mx-auto my-5 cursor-pointer"
                tabIndex={0}
                role="button"
                onClick={toggleDropdown}
              >
                <div className="w-24 rounded-full">
                  {getMe?.photo != null ? (
                    <img
                      src={`${import.meta.env.VITE_API_FOTO}/${getMe?.photo}`}
                    />
                  ) : (
                    <img src="./../user.png" />
                  )}
                </div>
              </div>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-48 bg-slate-800 py-1 rounded-lg shadow-lg"
                >
                  <ul className="rounded-lg overflow-hidden">
                    <button
                      className="p-2  cursor-pointer"
                      onClick={() => {
                        document.getElementById("my_modal_70").showModal();
                      }}
                    >
                      Ubah Profile
                    </button>
                    <button
                      className="p-2  cursor-pointer"
                      onClick={() => {
                        document.getElementById("my_modal_69").showModal();
                      }}
                    >
                      Reset Password
                    </button>
                  </ul>
                </div>
              )}
            </div>

            <div
              className={` transition-all duration-300 ${
                dropdownOpen ? "mt-20" : "mt-0"
              }`}
            >
              {role === 1 ? (
                <>
                  <Link
                    to="/"
                    className="flex pl-20 items-center h-8 border-b gap-3 py-5"
                  >
                    <RiDashboardHorizontalFill size={18} /> Dashboard
                  </Link>
                  <Link
                    to="/maintenance"
                    className="flex pl-20 items-center h-8 border-b gap-3 py-5"
                  >
                    <GiAutoRepair size={18} /> Maintenance
                  </Link>
                  <Link
                    to="/kendaraan"
                    className="flex pl-20 items-center h-8 border-b gap-3 py-5"
                  >
                    <FaCar size={18} /> Kendaraan
                  </Link>
                  <Link
                    to="/berita"
                    className="flex pl-20 items-center h-8 border-b gap-3 py-5"
                  >
                    <IoNewspaperSharp size={18} /> Berita
                  </Link>
                  <Link
                    to="/karyawan"
                    className="flex pl-20 items-center h-8 border-b gap-3 py-5"
                  >
                    <FaUsers size={18} /> Karyawan
                  </Link>
                  <Link
                    to="/users"
                    className="flex pl-20 items-center h-8 border-b gap-3 py-5"
                  >
                    <FaUsersGear size={18} /> Users
                  </Link>
                </>
              ) : role === 0 ? (
                <>
                  <Link
                    to="/"
                    className="flex pl-20 items-center h-8 border-b gap-3 py-5"
                  >
                    <RiDashboardHorizontalFill size={18} /> Dashboard
                  </Link>
                  <Link
                    to="/maintenance"
                    className="flex pl-20 items-center h-8 border-b gap-3 py-5"
                  >
                    <GiAutoRepair size={18} /> Maintenance
                  </Link>
                  <Link
                    to="/kendaraan"
                    className="flex pl-20 items-center h-8 border-b gap-3 py-5"
                  >
                    <FaCar size={18} /> Kendaraan
                  </Link>
                  <Link
                    to="/berita"
                    className="flex pl-20 items-center h-8 border-b gap-3 py-5"
                  >
                    <IoNewspaperSharp size={18} /> Berita
                  </Link>
                </>
              ) : (
                <>maaf anda tidak punya akses</>
              )}
            </div>

            <div className="absolute bottom-8 left-8">
              <button
                className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
