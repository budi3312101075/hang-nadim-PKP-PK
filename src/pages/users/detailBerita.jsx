import axios from "axios";
import HTMLReactParser from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../../store/auth";
import { jwtDecode } from "jwt-decode";

const DetailBerita = () => {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const { loginResponse } = useAuth();
  const data = jwtDecode(loginResponse);

  const fetchBerita = async () => {
    try {
      const response = await axios.get(`/news/${id}`);
      setBerita(response.data);
    } catch (error) {
      console.error("Gagal mengambil data berita:", error);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, [id]);

  if (!berita) {
    return (
      <div className="bg-primary min-h-screen w-full text-black px-10 pt-16 pb-40">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen w-full text-black px-10 pt-16 pb-40">
      <h1 className="text-3xl font-bold mb-5 text-center uppercase">
        {berita.title}
      </h1>
      <div className="flex justify-between">
        <div className="text-gray-600 mb-5">By: {berita.name}</div>
        <div className="text-gray-500 mb-10">
          Published on: {moment(berita.creadAt).format("DD-MM-YYYY")}
        </div>
      </div>
      <div className="prose mb-10">{HTMLReactParser(berita.content)}</div>

      <div className="flex justify-end mt-10">
        <Link
          {...(data.role === 1
            ? { to: "/Berita" }
            : data.role === 0
            ? { to: "/Berita" }
            : { to: "/" })}
          className="py-2 px-6 bg-secondary text-white rounded-md "
        >
          Kembali
        </Link>
      </div>
    </div>
  );
};

export default DetailBerita;
