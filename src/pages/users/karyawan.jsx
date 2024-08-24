import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Karyawan = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentData, setCurrentData] = useState();
  const [showPhotoInput, setShowPhotoInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // jumlah item per halaman

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

  const getKaryawan = async () => {
    try {
      const response = await axios.get(`/employee`);
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKaryawan();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("division", data.division);
    formData.append("position", data.position);
    formData.append("noSk", data.noSk);
    formData.append("photo", data.photo[0]);

    try {
      await axios.post("/employee", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Berhasil menambahkan karyawan");
      document.getElementById("aldnaiolwdhn").close();
      getKaryawan();
      reset();
    } catch (error) {
      toast.error("Gagal menambahkan karyawan");
      reset();
      document.getElementById("aldnaiolwdhn").close();
      console.error(error);
    }
  };

  const openEditModal = (data) => {
    setCurrentData(data);
    setValue("name", data.name);
    setValue("position", data.position);
    setValue("division", data.division);
    setValue("noSk", data.no_sk);
    setValue("photo", data.photo);
    setShowPhotoInput(false);
    document.getElementById("bnakdswyuwad").showModal();
  };

  const onUpdate = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("division", data.division);
      formData.append("position", data.position);
      formData.append("noSk", data.noSk);
      formData.append("photo", data.photo[0]);

      await axios.patch(`/employee/${currentData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Berhasil memperbarui karyawan");
      document.getElementById("bnakdswyuwad").close();
      getKaryawan();
      resets();
    } catch (error) {
      document.getElementById("bnakdswyuwad").close();
      toast.error("Gagal memperbarui karyawan");
      console.error(error);
    }
  };

  const onDeleted = async (data) => {
    try {
      await axios.delete(`/employee/${data}`);
      await getKaryawan();
      toast.success("Data berhasil dihapus");
    } catch (error) {
      toast.error("Gagal menghapus data karyawan");
      console.log(error);
    }
  };

  // Logika untuk search
  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setCurrentPage(1); // Reset ke halaman pertama saat melakukan pencarian
  }, [searchQuery, data]);

  // Logika untuk pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className="bg-primary min-h-screen w-full text-black px-10 pt-16 ">
        <h1 className="text-2xl font-bold mb-8">Daftar Karyawan</h1>
        <div className="flex justify-between mb-6">
          <div className="flex my-auto gap-2">
            <button
              className="py-2 px-6 bg-secondary text-white rounded-md"
              onClick={() =>
                document.getElementById("aldnaiolwdhn").showModal()
              }
            >
              Register Akun Karyawan
            </button>
            <button className="py-2 px-6 bg-green-500 text-white rounded-md">
              Tambah Karyawan
            </button>
          </div>
          <input
            type="text"
            className="input input-bordered w-1/3 bg-white"
            placeholder="Cari nama karyawan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-black text-white text-center rounded-t-lg">
              <tr>
                <th className="rounded-tl-lg p-3 w-16">No</th>
                <th className="w-24">Foto</th>
                <th className="p-3">Name</th>
                <th className="p-3">Divisi</th>
                <th className="p-3">Posisi</th>
                <th className="p-3">No SK</th>
                <th className="rounded-tr-lg p-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentItems?.map((item, index) => (
                <tr key={index} className="h-16">
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/${item.photo}`}
                      alt="Foto Karyawan"
                      className="w-16 h-16 object-cover mx-auto rounded-lg"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.division}</td>
                  <td>{item.position}</td>
                  <td>{item.no_sk}</td>
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

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPage === page ? "bg-secondary text-white" : "bg-white"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* -------------- Modal add --------------- */}
      <dialog id="aldnaiolwdhn" className="modal">
        <div className="modal-box bg-primary text-black max-w-xl flex flex-col gap-8">
          <h3 className="font-bold text-lg">Tambah Data Mobil</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
          >
            {/* Input Nama */}
            <span className="text-sm mr-[480px] -mb-4 -mt-2 text-slate-600">
              Nama
            </span>
            <input
              {...register("name", {
                required: "Nama harus diisi",
                minLength: {
                  message: "Nama harus terdiri dari minimal 2 karakter",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Nama hanya boleh mengandung huruf dan spasi",
                },
              })}
              type="text"
              className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                errors.name && "input-error"
              }`}
              placeholder="Nama"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}

            {/* Select Divisi */}
            <span className="text-sm mr-[485px] -mb-4 -mt-2 text-slate-600">
              Divisi
            </span>
            <select
              {...register("division", {
                required: "Divisi harus dipilih",
              })}
              className={`select select-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                errors.division && "select-error"
              }`}
            >
              <option value="" disabled selected>
                Pilih Divisi
              </option>
              <option value="Bravo">Bravo</option>
              <option value="Charlie">Charlie</option>
              <option value="Alpha">Alpha</option>
            </select>
            {errors.division && (
              <span className="text-red-500 text-sm">
                {errors.division.message}
              </span>
            )}

            {/* Input Posisi */}
            <span className="text-sm mr-[483px] -mb-4 -mt-2 text-slate-600">
              Posisi
            </span>
            <input
              {...register("position", {
                required: "Posisi harus diisi",
                minLength: {
                  message: "Posisi harus terdiri dari minimal 3 karakter",
                },
              })}
              type="text"
              className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                errors.position && "input-error"
              }`}
              placeholder="Posisi"
            />
            {errors.position && (
              <span className="text-red-500 text-sm">
                {errors.position.message}
              </span>
            )}

            {/* Input No SK */}
            <span className="text-sm mr-[455px] -mb-4 -mt-2 text-slate-600">
              Nomor SK
            </span>
            <input
              {...register("noSk", {
                required: "Nomor SK harus diisi",
                pattern: {
                  message: "Nomor SK harus berupa angka",
                },
              })}
              type="text"
              className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                errors.noSk && "input-error"
              }`}
              placeholder="Nomor SK"
            />
            {errors.noSk && (
              <span className="text-red-500 text-sm">
                {errors.noSk.message}
              </span>
            )}

            {/* Input File Upload */}
            <span className="text-sm mr-[440px] -mb-4 -mt-2 text-slate-600">
              Upload Foto
            </span>
            <input
              {...register("photo", {
                required: "Foto harus diupload",
              })}
              type="file"
              className={`file-input file-input-bordered w-full bg-primary border border-black ${
                errors.photo && "input-error"
              }`}
              accept="image/*"
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
              >
                Kirim
              </button>
              <button
                className="w-full rounded-lg bg-red-500 py-2 px-5"
                onClick={() => {
                  document.getElementById("aldnaiolwdhn").close();
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

      {/* -------------- Modal update --------------- */}
      <dialog id="bnakdswyuwad" className="modal">
        <div className="modal-box bg-primary text-black max-w-xl flex flex-col gap-8">
          <h3 className="font-bold text-lg">Update Data Karyawan</h3>
          <form
            onSubmit={handleSubmits(onUpdate)}
            className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
          >
            {/* Input Nama */}
            <span className="text-sm mr-[480px] -mb-4 -mt-2 text-slate-600">
              Nama
            </span>
            <input
              {...registers("name", {
                required: "Nama harus diisi",
                minLength: {
                  message: "Nama harus terdiri dari minimal 2 karakter",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Nama hanya boleh mengandung huruf dan spasi",
                },
              })}
              type="text"
              className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                formState.name && "input-error"
              }`}
              placeholder="Nama"
            />
            {formState.name && (
              <span className="text-red-500 text-sm">
                {formState.name.message}
              </span>
            )}

            {/* Select Divisi */}
            <span className="text-sm mr-[485px] -mb-4 -mt-2 text-slate-600">
              Divisi
            </span>
            <select
              {...registers("division", {
                required: "Divisi harus dipilih",
              })}
              className={`select select-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                formState.division && "select-error"
              }`}
              defaultValue={currentData?.division || ""}
            >
              <option value="" disabled>
                Pilih Divisi
              </option>
              <option value="Bravo">Bravo</option>
              <option value="Charlie">Charlie</option>
              <option value="Alpha">Alpha</option>
            </select>
            {formState.division && (
              <span className="text-red-500 text-sm">
                {formState.division.message}
              </span>
            )}

            {/* Input Posisi */}
            <span className="text-sm mr-[483px] -mb-4 -mt-2 text-slate-600">
              Posisi
            </span>
            <input
              {...registers("position", {
                required: "Posisi harus diisi",
                minLength: {
                  message: "Posisi harus terdiri dari minimal 3 karakter",
                },
              })}
              type="text"
              className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                formState.position && "input-error"
              }`}
              placeholder="Posisi"
            />
            {formState.position && (
              <span className="text-red-500 text-sm">
                {formState.position.message}
              </span>
            )}

            {/* Input No SK */}
            <span className="text-sm mr-[455px] -mb-4 -mt-2 text-slate-600">
              Nomor SK
            </span>
            <input
              {...registers("noSk", {
                required: "Nomor SK harus diisi",
                pattern: {
                  message: "Nomor SK harus berupa angka",
                },
              })}
              type="text"
              className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                formState.noSk && "input-error"
              }`}
              placeholder="Nomor SK"
            />

            <div className="flex items-center -mt-2 -mb-1 mr-[432px]">
              <input
                type="checkbox"
                id="showPhotoInput"
                className="mr-2"
                onChange={(e) => setShowPhotoInput(e.target.checked)}
              />
              <label
                htmlFor="showPhotoInput"
                className="text-sm text-slate-600"
              >
                Ubah foto
              </label>
            </div>

            {/* Input File Upload */}
            {showPhotoInput && (
              <>
                <span className="text-sm mr-[435px] -mb-4 -mt-2 text-slate-600">
                  Upload Foto
                </span>
                <input
                  {...registers("photo")}
                  type="file"
                  className={`file-input file-input-bordered w-full bg-primary border border-black`}
                  accept="image/*"
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
                  document.getElementById("bnakdswyuwad").close();
                  resets();
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

export default Karyawan;
