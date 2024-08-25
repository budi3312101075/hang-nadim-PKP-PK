import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-primary pb-14">
      <img src="../../404.gif" alt="404" className="w-2/5" />
      <Link
        to="/"
        className="text-black bg-secondary rounded-lg py-1 px-10 -mt-20"
      >
        Kembali
      </Link>
    </div>
  );
};

export default NotFound;
