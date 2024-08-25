import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Berita = () => {
  const [berita, setBerita] = useState([]);

  const fetchBerita = async () => {
    try {
      const response = await axios.get("/news"); // Sesuaikan endpoint
      setBerita(response.data);
    } catch (error) {
      console.error("Gagal mengambil data berita:", error);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  // Fungsi untuk memotong string menjadi 7 karakter
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const onDeleted = async (data) => {
    try {
      await axios.delete(`/news/${data}`);
      toast.success("Berhasil menghapus berita");
      fetchBerita();
    } catch (error) {
      toast.error("Gagal menghapus berita");
      console.error(error);
    }
  };

  return (
    <div className="bg-primary min-h-screen w-full text-black px-10 pt-16 pb-40">
      <h1 className="text-2xl font-bold mb-8">Daftar Berita</h1>
      <Link
        to="/TambahBerita"
        className="py-2 px-6 bg-secondary text-white rounded-md "
      >
        Tambah Berita
      </Link>
      <div className="grid grid-cols-3 gap-3 mt-10">
        {berita.map((item) => (
          <div
            key={item.uuid}
            className="card lg:card-side bg-primary shadow-xl "
          >
            <figure>
              <img
                className="h-full"
                src={
                  /<img[^>]+src="([^">]+)"/g.exec(item.content)?.[1] ||
                  "https://mgmall.s3.amazonaws.com/img/062023/390bed03e54f6440416f0568f61a82b563176996.jpg" // Placeholder image
                }
                alt={item.title}
              />
            </figure>
            <div className="card-body">
              <h1 className="card-title text-lg ">
                {truncateText(item.title, 10)}
              </h1>
              <p className="text-xs">
                {truncateText(item.content.replace(/<[^>]+>/g, ""), 20)}
              </p>
              <div className="flex gap-1 ">
                <Link
                  to={`/DetailBerita/${item.uuid}`}
                  className="bg-secondary text-white px-4 py-2 rounded-xl w-full text-xs text-center"
                >
                  Lihat
                </Link>
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded-xl w-full text-xs text-center"
                  onClick={() => onDeleted(item.uuid)}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Berita;
