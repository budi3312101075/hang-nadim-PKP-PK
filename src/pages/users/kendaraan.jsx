import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners"; // Import a spinner library

const Kendaraan = () => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState();
  const [showPhotoInput, setShowPhotoInput] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for form submission

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

  const getCar = async () => {
    try {
      const response = await axios.get(`/car`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCar();
  }, []);

  const onSubmit = async (formData) => {
    const dataToSubmit = new FormData();
    dataToSubmit.append("name", formData.name);
    dataToSubmit.append("type", formData.type);
    dataToSubmit.append("photo", formData.photo[0]);

    setLoading(true); // Start loading

    try {
      await axios.post("/car", dataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Berhasil menambahkan mobil");
      document.getElementById("wadadw").close();
      reset();
      getCar();
    } catch (error) {
      toast.error("Gagal menambahkan mobil");
      document.getElementById("wadadw").close();
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const onDeleted = async (data) => {
    try {
      await axios.delete(`/car/${data}`);
      await getCar();
      toast.success("Data berhasil dihapus");
    } catch (error) {
      toast.error("Gagal menghapus data mobil");
      console.log(error);
    }
  };

  const openEditModal = (data) => {
    setCurrentData(data);
    setValue("name", data.name);
    setValue("type", data.type);
    setValue("photo", data.photo);
    setShowPhotoInput(false); // Reset state checkbox saat modal dibuka
    document.getElementById("alfjnak").showModal();
  };

  const onUpdate = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("photo", data.photo[0]);

    setLoading(true); // Start loading

    try {
      await axios.patch(`/car/${currentData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await getCar();
      resets();
      toast.success("Data berhasil di update");
      document.getElementById("alfjnak").close();
    } catch (error) {
      document.getElementById("alfjnak").close();
      console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className="bg-primary min-h-screen w-full text-black px-10 pt-16 pb-40">
        <h1 className="text-2xl font-bold mb-8">Daftar Kendaraan</h1>

        <button
          className="py-2 px-6 bg-secondary text-white rounded-md mb-6"
          onClick={() => document.getElementById("wadadw").showModal()}
        >
          Tambah Kendaraan
        </button>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-black text-white text-center rounded-t-lg">
              <tr>
                <th className="rounded-tl-lg p-3 w-16">No</th>
                <th className="w-24">Foto</th>
                <th className="p-3">Name</th>
                <th className="p-3">Type</th>
                <th className="rounded-tr-lg p-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data.map((item, index) => (
                <tr className="h-20" key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`${item.photo}`}
                      alt="Car"
                      className="w-16 h-16 object-cover mx-auto rounded-lg"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td className="flex flex-col gap-2 my-3">
                    <button
                      className="text-yellow-500"
                      onClick={() => openEditModal(item)}
                    >
                      Ubah
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => onDeleted(item.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* -------------- Modal add --------------- */}
      <dialog id="wadadw" className="modal">
        <div className="modal-box bg-primary text-black max-w-xl flex flex-col gap-8">
          <h3 className="font-bold text-lg">Tambah Data Mobil</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
          >
            {/* Input Nama Mobil */}
            <span className="text-sm mr-[440px] -mb-4 -mt-2 text-slate-600">
              Nama mobil
            </span>
            <input
              {...register("name", {
                required: "Nama mobil harus diisi",
              })}
              type="text"
              className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                errors.name && "input-error"
              }`}
              placeholder="Nama mobil"
              disabled={loading} // Disable during loading
            />

            {/* Input Type Mobil */}
            <span className="text-sm mr-[450px] -mb-4 -mt-2 text-slate-600">
              Type Mobil
            </span>
            <input
              {...register("type", {
                required: "Type mobil harus diisi",
                pattern: {
                  value: /^[A-Za-z\s/-]+$/i,
                  message: "Type mobil hanya boleh mengandung huruf",
                },
              })}
              type="text"
              className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                errors.type && "input-error"
              }`}
              placeholder="Type mobil"
              disabled={loading} // Disable during loading
            />

            {/* Input File Upload */}
            <span className="text-sm mr-[400px] -mb-4 -mt-2 text-slate-600">
              Upload Foto Mobil
            </span>
            <input
              {...register("photo", {
                required: "File foto mobil harus diupload",
              })}
              type="file"
              className={`file-input file-input-bordered w-full bg-primary border border-black ${
                errors.photo && "input-error"
              }`}
              accept="image/*"
              disabled={loading} // Disable during loading
            />
            {errors.photo && (
              <span className="text-red-500 text-sm">
                {errors.photo.message}
              </span>
            )}

            <div className="flex w-full mt-2 gap-2">
              <button
                className="w-full rounded-lg bg-cyan-500 py-2 px-5"
                type="submit"
                disabled={loading} // Disable during loading
              >
                {loading ? <BeatLoader size={8} color="#fff" /> : "Kirim"}
                {/* Spinner during loading */}
              </button>
              <button
                className="w-full rounded-lg bg-red-500 py-2 px-5"
                onClick={() => {
                  document.getElementById("wadadw").close();
                  reset();
                }}
                type="button"
                disabled={loading} // Disable during loading
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* -------------- Modal update --------------- */}
      <dialog id="alfjnak" className="modal">
        <div className="modal-box bg-primary text-black max-w-xl flex flex-col gap-8">
          <h3 className="font-bold text-lg">Edit Data Mobil</h3>
          <form
            onSubmit={handleSubmits(onUpdate)}
            className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
          >
            {/* Input Nama Mobil */}
            <span className="text-sm mr-[440px] -mb-4 -mt-2 text-slate-600">
              Nama mobil
            </span>
            <input
              {...registers("name", {
                required: "Nama mobil harus diisi",
              })}
              type="text"
              className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                formState.errors.name && "input-error"
              }`}
              placeholder="Nama mobil"
              disabled={loading} // Disable during loading
            />

            {/* Input Type Mobil */}
            <span className="text-sm mr-[450px] -mb-4 -mt-2 text-slate-600">
              Type Mobil
            </span>
            <input
              {...registers("type", {
                required: "Type mobil harus diisi",
                pattern: {
                  value: /^[A-Za-z\s/-]+$/i,
                  message: "Type mobil hanya boleh mengandung huruf",
                },
              })}
              type="text"
              className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                formState.errors.type && "input-error"
              }`}
              placeholder="Type mobil"
              disabled={loading} // Disable during loading
            />

            {/* Checkbox for new photo */}
            <div className="flex justify-center items-center gap-2">
              <input
                type="checkbox"
                id="showPhotoInput"
                className="checkbox checkbox-primary"
                checked={showPhotoInput}
                onChange={() => setShowPhotoInput(!showPhotoInput)}
                disabled={loading} // Disable during loading
              />
              <label htmlFor="showPhotoInput">Upload foto baru?</label>
            </div>

            {showPhotoInput && (
              <input
                {...registers("photo")}
                type="file"
                className="file-input file-input-bordered w-full bg-primary border border-black"
                accept="image/*"
                disabled={loading} // Disable during loading
              />
            )}

            <div className="flex w-full mt-2 gap-2">
              <button
                className="w-full rounded-lg bg-cyan-500 py-2 px-5"
                type="submit"
                disabled={loading} // Disable during loading
              >
                {loading ? <BeatLoader size={8} color="#fff" /> : "Update"}
                {/* Spinner during loading */}
              </button>
              <button
                className="w-full rounded-lg bg-red-500 py-2 px-5"
                onClick={() => {
                  document.getElementById("alfjnak").close();
                  resets();
                }}
                type="button"
                disabled={loading} // Disable during loading
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

export default Kendaraan;
