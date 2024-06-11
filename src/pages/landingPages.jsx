import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import {
  Navbar,
  PersonelAlpha,
  PersonelBravo,
  PersonelCharlie,
} from "../components";

const LandingPages = () => {
  const [personel, setPersonel] = useState("alpha");
  const [visible, setVisible] = useState(4);
  const [dataAlpha, setDataAlpha] = useState([
    {
      id: 1,
      foto: "./budi.png",
      nama: "Budi Prayoga, A.Md.Kom.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "charlie",
    },
    {
      id: 2,
      foto: "./budi.png",
      nama: "Budi Prayoga, A.Md.Kom.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "charlie",
    },
    {
      id: 3,
      foto: "./budi.png",
      nama: "Budi Prayoga, A.Md.Kom.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "bravo",
    },
    {
      id: 4,
      foto: "./budi.png",
      nama: "Budi Prayoga, A.Md.Kom.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "bravo",
    },
    {
      id: 5,
      foto: "./budi.png",
      nama: "Budi Prayoga, A.Md.Kom.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "alpha",
    },
    {
      id: 6,
      foto: "./budi.png",
      nama: "Budi Prayoga, A.Md.Kom.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "alpha",
    },
    {
      id: 7,
      foto: "./budi.png",
      nama: "Budi Prayoga, A.Md.Kom.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "alpha",
    },
    {
      id: 8,
      foto: "./budi.png",
      nama: "Budi Prayoga, A.Md.Kom.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "alpha",
    },
  ]);

  const [dataCharlie, setDataCharlie] = useState([
    {
      id: 1,
      foto: "./zulkarnain.png",
      nama: "ZULKARNAIN, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "charlie",
    },
    {
      id: 2,
      foto: "./zulkarnain.png",
      nama: "ZULKARNAIN, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "charlie",
    },
    {
      id: 3,
      foto: "./zulkarnain.png",
      nama: "ZULKARNAIN, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "bravo",
    },
    {
      id: 4,
      foto: "./zulkarnain.png",
      nama: "ZULKARNAIN, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "bravo",
    },
    {
      id: 5,
      foto: "./zulkarnain.png",
      nama: "ZULKARNAIN, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "alpha",
    },
    {
      id: 6,
      foto: "./zulkarnain.png",
      nama: "ZULKARNAIN, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "alpha",
    },
    {
      id: 7,
      foto: "./zulkarnain.png",
      nama: "ZULKARNAIN, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "alpha",
    },
    {
      id: 8,
      foto: "./zulkarnain.png",
      nama: "ZULKARNAIN, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "alpha",
    },
  ]);

  const [dataBravo, setDataBravo] = useState([
    {
      id: 1,
      foto: "./atong.png",
      nama: "atong, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "charlie",
    },
    {
      id: 2,
      foto: "./atong.png",
      nama: "atong, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "charlie",
    },
    {
      id: 3,
      foto: "./atong.png",
      nama: "atong, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "bravo",
    },
    {
      id: 4,
      foto: "./atong.png",
      nama: "atong, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "bravo",
    },
    {
      id: 5,
      foto: "./atong.png",
      nama: "atong, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "alpha",
    },
    {
      id: 6,
      foto: "./atong.png",
      nama: "atong, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "alpha",
    },
    {
      id: 7,
      foto: "./atong.png",
      nama: "atong, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "alpha",
    },
    {
      id: 8,
      foto: "./atong.png",
      nama: "atong, S.KOM.",
      jabatan: "ARFF OPERATION MANAGER",
      nip: "0353/PKP-S1/DBU/IV/2020",
      divisi: "alpha",
    },
  ]);

  const handleLoadMore = () => {
    setVisible((prevVisible) => prevVisible + 4);
  };

  return (
    <div className="bg-white">
      <Navbar />
      <video autoPlay loop muted className="w-full">
        <source src="./hero.mp4" type="video/mp4" />
      </video>
      <div className="bg-secondary text-white max-h-max justify-center md:flex md:flex-row items-center flex-col flex">
        <div className="items-center flex">
          <img
            src="./logo.png"
            alt="logo"
            className="lg:w-64 lg:h-28 md:mr-10 w-60 h-20 mt-2 md:mt-0"
          />
        </div>
        <div className="bg-white opacity-25 w-[3px] h-40 hidden md:block" />
        <div className="w-4/5 lg:w-96 p-5">
          <h1 className="text-xl italic font-bold md:mb-5 mb-3 text-center">
            VISI MISI
          </h1>
          <p className="text-sm">
            Mengubah Bandara Hang Nadim ke level selanjutnya
          </p>
        </div>
        <div className="bg-white opacity-25 w-[3px] h-40 hidden md:block" />
        <div className="w-4/5 lg:w-96 p-5">
          <h1 className="text-xl italic font-bold md:mb-5 mb-3 text-center">
            ORGANISASI
          </h1>
          <p className="text-sm">
            Kami menciptakan sejarah baru sebagai bandara terbaik di dunia.
          </p>
        </div>
        <div className="bg-white opacity-25 w-[3px] h-40 hidden md:block" />
        <div className="w-4/5 lg:w-96 p-5">
          <h1 className="text-xl italic font-bold md:mb-5 mb-3 text-center">
            PENGUMUMAN
          </h1>
          <p className="text-sm">
            Informasi secara jelas menjadi bentuk layanan prioritas kami
          </p>
        </div>
        <div className="bg-white opacity-25 w-[3px] h-40 hidden md:block" />
      </div>
      <Marquee className="max-h-max flex py-10 bg-white">
        <img src="./angkasaPura.webp" alt="AP2" />
        <img src="./incheon.webp" alt="AP2" />
        <img src="./wika.webp" alt="AP2" />
        <img src="./angkasaPura.webp" alt="AP2" />
        <img src="./incheon.webp" alt="AP2" />
        <img src="./wika.webp" alt="AP2" />
      </Marquee>
      <div className="max-h-max md:px-14 px-5 py-10 bg-primary">
        <h1 className="md:text-2xl text-xl text-black text-center font-semibold">
          Hang Nadim Batam ARFF Personnel
        </h1>
        <div className="md:w-96 sm:w-72 w-64 h-[1px] bg-slate-400 mx-auto mt-1 flex items-center">
          <div className="w-24 h-[3px] bg-secondary mx-auto" />
        </div>
        <div className="join w-full flex justify-center my-5">
          <input
            className="join-item btn btn-square px-10"
            type="radio"
            name="options"
            aria-label="Alpha"
            onClick={() => setPersonel("alpha")}
            defaultChecked
          />
          <input
            className="join-item btn btn-square px-10"
            type="radio"
            name="options"
            aria-label="Charlie"
            onClick={() => setPersonel("charlie")}
          />
          <input
            className="join-item btn btn-square px-10"
            type="radio"
            name="options"
            aria-label="Bravo"
            onClick={() => setPersonel("bravo")}
          />
        </div>
        {/* Personel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {personel === "alpha" ? (
            <PersonelAlpha
              visible={visible}
              dataAlpha={dataAlpha}
              handleLoadMore={handleLoadMore}
            />
          ) : personel === "charlie" ? (
            <PersonelCharlie
              visible={visible}
              dataCharlie={dataCharlie}
              handleLoadMore={handleLoadMore}
            />
          ) : personel === "bravo" ? (
            <PersonelBravo
              visible={visible}
              dataBravo={dataBravo}
              handleLoadMore={handleLoadMore}
            />
          ) : null}
        </div>
        <div className="flex justify-center mt-5 ">
          {visible < dataAlpha.length && (
            <button
              onClick={handleLoadMore}
              className="bg-[#14191e] py-2 px-4 rounded-lg text-[#a6adbb] text-base font-semibold hover:bg-[#646ee4] hover:text-black duration-300 "
            >
              Load More
            </button>
          )}
        </div>
      </div>
      <div className="max-h-max md:px-14 px-5 py-10  ">
        <h1 className="md:text-2xl text-xl text-black text-center font-semibold">
          Tentang Kami
        </h1>
        <div className="md:w-32 sm:w-28 w-28 h-[1px] bg-slate-400 mx-auto mt-1 flex items-center">
          <div className="w-10 h-[3px] bg-secondary mx-auto" />
        </div>
        <div className="flex flex-col md:flex-row w-full mt-5">
          <div className="md:w-1/2 w-11/12 md:py-5 md:px-10 px-5 rounded-xl md:h-72 h-60 my-auto mx-auto flex flex-col md:gap-5 gap-2 bg-primary outline-secondary outline outline-1">
            <h1 className="md:text-lg text-base text-black text-center font-semibold mt-5">
              Apa itu ARFF Hang Nadim
            </h1>
            <h1 className="md:text-sm text-[10px] text-black text-justify font-medium">
              ARFF (Aircraft Rescue and Fire Fighting) Hang Nadim Batam adalah
              unit penyelamatan dan pemadam kebakaran pesawat terbang yang
              beroperasi di Bandara Internasional Hang Nadim, Batam. ARFF
              memainkan peran krusial dalam memastikan keselamatan dan keamanan
              penerbangan dengan menyediakan layanan darurat yang responsif dan
              profesional.
            </h1>
          </div>
          <img
            className="md:w-2/5 w-11/12 mt-5 md:mt-0 rounded-xl my-auto mx-auto "
            src="./ziegler.jpeg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPages;
