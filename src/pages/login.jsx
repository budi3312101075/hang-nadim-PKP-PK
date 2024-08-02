import React from "react";

const Login = () => {
  return (
    <div className="bg-primary w-screen h-screen flex py-3 lg:px-0 px-10">
      <div className="lg:w-1/2 w-full h-full py-28 2xl:py-56">
        <div className="flex flex-col bg-secondary max-h-max max-w-xl mx-auto rounded-xl px-7 h-full justify-center xl:h-96 xl:-mt-14 ">
          <img src="./arff-logo.png" alt="logo" className="w-28 mx-auto mb-5" />
          <p className="text-white ml-1 mb-1">masukan username anda :</p>
          <input
            className="mb-5 pl-2 h-10 rounded-xl bg-slate-200 text-black outline-none"
            type="text"
            placeholder="Username"
          />
          <p className="text-white ml-1 mb-1">masukan password anda :</p>
          <input
            className="pl-2 h-10 rounded-xl bg-slate-200 text-black outline-none"
            type="password"
            placeholder="password"
          />
          <div className="w-full text-center px-20 ">
            <button className="bg-red-600 text-white rounded-xl w-full mx-auto mt-7 py-1">
              Masuk
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full bg rounded-xl mr-3 hidden lg:flex">
        <img className="mx-auto my-auto " src="./Fireprevention.gif" alt="" />
      </div>
    </div>
  );
};

export default Login;
