import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatDate } from "../../utils"; // Asumsikan ini adalah custom date formatter Anda
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const Maintenance = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [data, setData] = useState([]);
  const [car, setCar] = useState();
  const [currentData, setCurrentData] = useState();
  const [expandedRows, setExpandedRows] = useState({});
  const [showDates, setShowDates] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: registers,
    handleSubmit: handleSubmits,
    reset: resets,
    setValue,
    formState,
  } = useForm();

  // -------------- Action untuk get data -------------------
  const getMaintenance = async () => {
    try {
      const response = await axios.get(`/maintenance`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const optionCars = async () => {
    try {
      const response = await axios.get(`/car`);
      setCar(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMaintenance();
    optionCars();
  }, []);

  const handleRowClick = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCheckboxChange = () => {
    setShowDates(!showDates);
  };
  // ------------------------------------------------------

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("type", data.type);
    formData.append("description", data.description);
    formData.append("dateIn", moment(startDate).format("YYYY-MM-DD"));
    formData.append("dateOut", moment(endDate).format("YYYY-MM-DD"));
    formData.append("idCar", data.idCar);
    try {
      await axios.post("/maintenance", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await getMaintenance();
      reset();
      toast.success("Data maintenance berhasil ditambahkan");
      document.getElementById("apdjowp").close();
    } catch (error) {
      reset();
      toast.error(error.response.data.message);
      document.getElementById("apdjowp").close();
      console.log("Error adding maintenance data:", error);
    }
  };

  const onUpdate = async (data) => {
    try {
      await axios.patch(`/maintenance/${currentData.id}`, data);
      await getMaintenance();
      resets();
      toast.success("Data berhasil di update");
      document.getElementById("my_modal_2").close();
    } catch (error) {
      toast.error("Gagal update data maintenance");
      resets();
      document.getElementById("my_modal_2").close();
    }
  };

  const openEditModal = (data) => {
    setCurrentData(data);
    setValue("type", data.jenisPerbaikan);
    setValue("description", data.description);
    setValue("dateIn", data.date_in);
    setValue("dateOut", data.date_out);
    document.getElementById("my_modal_2").showModal();
  };

  const onDeleted = async (data) => {
    try {
      await axios.delete(`/maintenance/${data}`);
      await getMaintenance();
      toast.success("Data berhasil di hapus");
    } catch (error) {
      toast.error("Gagal hapus data maintenance");
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-primary min-h-screen w-full text-black px-10 pt-16 pb-40">
        <h1 className="text-2xl font-bold mb-8">Daftar Maintenance</h1>

        <button
          className="py-2 px-6 bg-secondary text-white rounded-md mb-6"
          onClick={() => document.getElementById("apdjowp").showModal()}
        >
          Tambah Maintenance
        </button>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-black text-white text-center rounded-t-lg">
              <tr>
                <th className="rounded-tl-lg p-3 w-16">No</th>
                <th className="w-24">Foto</th>
                <th className="p-3">Name</th>
                <th className="rounded-tr-lg p-3">Type</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data.map((item, index) => (
                <React.Fragment key={index}>
                  <tr
                    onClick={() => handleRowClick(index)}
                    className={`cursor-pointer hover:bg-gray-200 transition-colors duration-300 ${
                      expandedRows[index] ? "bg-gray-100" : ""
                    }`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">
                      <img
                        src={`${item.photo}`}
                        alt="Avatar"
                        className="w-16 h-16 object-cover mx-auto rounded-lg"
                      />
                    </td>
                    <td className="p-3">
                      <h1 className="font-semibold">{item.name}</h1>
                    </td>
                    <td className="p-3">{item.type}</td>
                  </tr>
                  {expandedRows[index] && (
                    <tr>
                      <td colSpan={4}>
                        <div className="p-4 bg-gray-400 rounded-b-lg transition-all duration-300 ease-in-out">
                          <h3 className="font-bold text-lg mb-4">
                            Maintenance Records
                          </h3>
                          {item.maintenanceRecords.length > 0 ? (
                            <div className="overflow-x-auto">
                              <table className="table-auto w-full bg-white shadow-sm rounded-lg">
                                <thead className="bg-gray-200 text-gray-600 text-sm">
                                  <tr>
                                    <th className="p-2 w-10">No</th>
                                    <th className="p-2 w-52">
                                      Jenis Perbaikan
                                    </th>
                                    <th className="p-2 w-96">Deskripsi</th>
                                    <th className="p-2 w-40">Waktu Masuk</th>
                                    <th className="p-2 w-40">Waktu Keluar</th>
                                    <th className="p-2 w-28">Aksi</th>
                                  </tr>
                                </thead>
                                <tbody className="text-gray-700 text-sm">
                                  {item.maintenanceRecords.map(
                                    (record, recordIndex) => (
                                      <tr
                                        key={recordIndex}
                                        className="hover:bg-gray-100"
                                      >
                                        <td className="py-4">
                                          {recordIndex + 1}
                                        </td>
                                        <td className="py-4">
                                          {record.jenisPerbaikan}
                                        </td>
                                        <td className="py-4">
                                          {record.description}
                                        </td>
                                        <td className="py-4">
                                          {formatDate(record.date_in)}
                                        </td>
                                        <td className="py-4">
                                          {formatDate(record.date_out)}
                                        </td>
                                        <td className="gap-1 flex flex-col py-3">
                                          <button
                                            className="text-yellow-500"
                                            onClick={() =>
                                              openEditModal(record)
                                            }
                                          >
                                            Ubah
                                          </button>

                                          <button
                                            className="text-red-500"
                                            onClick={() => onDeleted(record.id)}
                                          >
                                            Hapus
                                          </button>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p className="text-gray-600">
                              No records available
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add */}
      <dialog id="apdjowp" className="modal">
        <div className="modal-box bg-primary text-black max-w-xl flex flex-col gap-8">
          <h3 className="font-bold text-lg">Tambah Data Maintenance</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
          >
            {/* Select Mobil */}
            <span className="text-sm mr-[470px] -mb-4 text-slate-600">
              Mobil
            </span>
            <select
              {...register("idCar", {
                required: "Mobil wajib dipilih",
              })}
              className={`select select-bordered w-full bg-primary border border-black text-black ${
                errors["idCar"] && "input-error"
              }`}
            >
              <option value="">Pilih Mobil</option>
              {car?.map((data, index) => (
                <option key={index} value={data.id}>
                  {data.name}
                </option>
              ))}
            </select>
            {errors["idCar"] && (
              <span className="text-red-500 text-sm">
                {errors["idCar"].message}
              </span>
            )}

            {/* Input Jenis Perbaikan */}
            <span className="text-sm mr-[415px] -mb-4 -mt-2 text-slate-600">
              Jenis Perbaikan
            </span>
            <input
              {...register("type", {
                required: "Jenis Perbaikan harus diisi",
                pattern: {
                  value: /^[A-Za-z\s / -]+$/i,
                  message: "Jenis Perbaikan hanya boleh mengandung huruf",
                },
              })}
              type="text"
              className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                errors.type && "input-error"
              }`}
              placeholder="Jenis Perbaikan"
            />

            {/* Input Deskripsi */}
            <span className="text-sm mr-[460px] -mb-4 -my-2 text-slate-600">
              Deskripsi
            </span>
            <textarea
              {...register("description", {
                required: "Deskripsi wajib diisi",
              })}
              placeholder="Deskripsi"
              className={`textarea textarea-bordered w-full bg-primary border border-black text-black ${
                errors.description && "input-error"
              }`}
            />

            {/* Date Range Picker */}
            <span className="text-sm -mb-4 -my-2 mr-[220px] text-slate-600">
              Tanggal Masuk - Tanggal Keluar perbaikan
            </span>
            <div className="flex flex-col w-full">
              <DatePicker
                selected={startDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                isClearable
                dateFormat="dd-MM-yyyy"
                className="input input-bordered w-full bg-primary border border-black placeholder:text-tertiary"
                placeholderText="Pilih rentang tanggal"
              />
              {errors.dateIn && (
                <span className="text-red-500 text-sm w-full">
                  Tanggal wajib diisi
                </span>
              )}
            </div>

            <div className="flex w-full mt-2 gap-2">
              <button
                className="w-full rounded-lg bg-cyan-500 py-2 px-5"
                type="submit"
              >
                Kirim
              </button>
              <button
                className="w-full rounded-lg bg-red-500 py-2 px-5"
                onClick={() => {
                  document.getElementById("apdjowp").close();
                  reset();
                }}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Modal Update */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-primary text-black max-w-xl flex flex-col gap-8">
          <h3 className="font-bold text-lg">Ubah Data</h3>
          <form
            onSubmit={handleSubmits(onUpdate)}
            className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
          >
            <span className="text-sm mr-[415px] -mb-4 text-slate-600">
              Jenis Perbaikan
            </span>
            <input
              {...registers("type", {
                required: "Jenis Perbaikan harus diisi",
                pattern: {
                  value: /^[A-Za-z\s / -]+$/i,
                  message: "Jenis Perbaikan hanya boleh mengandung huruf",
                },
              })}
              type="text"
              className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                formState.errors.type && "input-error"
              }`}
              placeholder="Jenis Perbaikan"
            />

            <span className="text-sm mr-[445px] -mb-4 -my-2 text-slate-600">
              Description
            </span>
            <textarea
              {...registers("description", {
                required: "Deskripsi wajib diisi",
              })}
              placeholder="Deskripsi"
              className={`textarea textarea-bordered w-full bg-primary border border-black text-black ${
                formState.errors.description && "input-error"
              }`}
            />

            <div className="flex items-center gap-2 -my-2 mr-[270px]">
              <input
                type="checkbox"
                id="showDatesCheckbox"
                onClick={handleCheckboxChange}
              />
              <label htmlFor="showDatesCheckbox">
                Edit tangal masuk dan keluar
              </label>
            </div>

            {showDates == true && (
              <>
                <span className="text-sm mr-[415px] -mb-4 -my-2 text-slate-600 ">
                  Tanggal Masuk
                </span>
                <input
                  {...registers("dateIn")}
                  type="date"
                  className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                    formState.errors.dateIn && "input-error"
                  }`}
                  defaultValue={currentData?.dateIn?.split("T")[0]}
                />

                <span className="text-sm mr-[415px] -mb-4 -my-2 text-slate-600">
                  Tanggal Keluar
                </span>
                <input
                  {...registers("dateOut")}
                  type="date"
                  className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                    formState.errors.dateOut && "input-error"
                  }`}
                  defaultValue={currentData?.dateOut?.split("T")[0]}
                />
              </>
            )}

            <div className="flex w-full mt-2 gap-2">
              <button
                className="w-full rounded-lg bg-cyan-500 py-2 px-5"
                type="submit"
              >
                Kirim
              </button>
              <button
                className="w-full rounded-lg bg-red-500 py-2 px-5"
                onClick={() => {
                  document.getElementById("my_modal_2").close();
                  resets();
                  setShowDates(false);
                  setShowDates(false);
                }}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Maintenance;
