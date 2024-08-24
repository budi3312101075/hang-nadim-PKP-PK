import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
import { TbPassword } from "react-icons/tb";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState } = useForm();
  const { setLoginResponse } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`/login`, data);

      if (response.data !== undefined && response.status === 200) {
        const userData = await response.data;
        setLoginResponse(userData.data);
        navigate("/");
        toast.success("Selamat Datang");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 bg-black ">
        <div className="px-5 flex">
          <div className="w-full max-w-md  bg-primary flex flex-col items-center mx-auto py-10 my-auto rounded-xl">
            <h2 className="text-2xl font-extrabold tracking-wide text-black -mt-3">
              Login
            </h2>
            <form
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col px-10 mt-5 text-black gap-4 w-full h-full "
            >
              {formState.errors.username && (
                <span className="text-red-600">
                  Hanya huruf dan angka yang diperbolehkan untuk Username
                </span>
              )}
              <div className="input input-bordered flex justify-between w-full gap-5 items-center bg-[#f2f4f6] border border-black focus-within:ring-1 focus-within:ring-black">
                <FaUser />
                <input
                  type="text"
                  className="w-full  bg-[#f2f4f6] -ml-1 placeholder:text-tertiary placeholder:tracking-widest placeholder:text-xs placeholder:font-bold"
                  {...register("username", {
                    required: true,
                    maxLength: 75,
                    pattern: /^[A-Za-z0-9]+$/i,
                  })}
                  placeholder="username"
                />
              </div>

              {formState.errors.password && (
                <span className="text-red-600">Password harus diisi.</span>
              )}
              <div className="input input-bordered flex justify-between w-full gap-5 items-center bg-[#f2f4f6] border border-black focus-within:ring-1 focus-within:ring-black">
                <TbPassword size={25} />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="password"
                  className="w-full bg-[#f2f4f6] -ml-2 placeholder:text-tertiary placeholder:tracking-widest placeholder:text-xs placeholder:font-bold"
                />
                {showPassword ? (
                  <AiFillEyeInvisible
                    size={25}
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <IoEyeSharp size={25} onClick={togglePasswordVisibility} />
                )}
              </div>
              <button className="btn bg-black">Login</button>
            </form>
          </div>
        </div>
        <video
          autoPlay
          loop
          muted
          className="w-full my-auto bg-primary h-full hidden md:block"
        >
          <source src="./hero.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default Login;
