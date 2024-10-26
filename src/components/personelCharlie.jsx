import React from "react";

const PersonelCharlie = ({ visible, dataCharlie }) => {
  return (
    <>
      {dataCharlie.slice(0, visible).map((item) => (
        <div
          key={item.id}
          className="relative w-64 h-96 rounded-xl shadow-lg flex flex-col mx-auto"
        >
          <div className="w-full h-2/3 relative">
            <img
              className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl"
              src="./arff.jpg"
              alt="arff"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                className="w-40 mt-4"
                src={`${import.meta.env.VITE_API_FOTO}/${item.photo}`}
                alt="pas-foto"
              />
            </div>
          </div>
          <div className="w-full h-1/3 bg-white rounded-b-xl p-4 flex flex-col items-center justify-center text-center">
            <h1 className="uppercase font-bold text-base text-black">
              {item.name}
            </h1>
            <h2 className="uppercase text-sm text-black">{item.division}</h2>
            <p className="uppercase text-xs text-black">{item.no_sk}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default PersonelCharlie;
