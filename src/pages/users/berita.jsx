import React from "react";

const Berita = () => {
  return (
    <div className="bg-primary min-h-screen w-full text-black px-10 pt-16 pb-40">
      <h1 className="text-2xl font-bold mb-8">Daftar Berita</h1>
      <button className="py-2 px-6 bg-secondary text-white rounded-md mb-6">
        Tambah Berita
      </button>
      <div className="grid grid-cols-3 gap-3">
        <div className="card lg:card-side bg-primary shadow-xl ">
          <figure>
            <img
              className="h-full"
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-lg ">New album is released!</h1>
            <p className="text-xs">
              Click the button to Lihat on Spotiwhy app.
            </p>
            <div className="card-actions justify-end">
              <button className="bg-black text-white px-4 py-2 rounded-xl w-full text-xs">
                Lihat
              </button>
            </div>
          </div>
        </div>
        <div className="card lg:card-side bg-primary shadow-xl ">
          <figure>
            <img
              className="h-full"
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-lg ">New album is released!</h1>
            <p className="text-xs">
              Click the button to Lihat on Spotiwhy app.
            </p>
            <div className="card-actions justify-end">
              <button className="bg-black text-white px-4 py-2 rounded-xl w-full text-xs">
                Lihat
              </button>
            </div>
          </div>
        </div>
        <div className="card lg:card-side bg-primary shadow-xl ">
          <figure>
            <img
              className="h-full"
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-lg ">New album is released!</h1>
            <p className="text-xs">
              Click the button to Lihat on Spotiwhy app.
            </p>
            <div className="card-actions justify-end">
              <button className="bg-black text-white px-4 py-2 rounded-xl w-full text-xs">
                Lihat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Berita;
