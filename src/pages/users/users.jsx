import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Users = () => {
  const [data, setData] = useState([]);
  const [karyawan, setKaryawan] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // jumlah item per halaman
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const getUsers = async () => {
    try {
      const response = await axios.get("/users");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKaryawan = async () => {
    try {
      const response = await axios.get("/employee");
      setKaryawan(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    getKaryawan();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/register", data);
      reset();
      getUsers();
      toast.success(response.data.message);
      document.getElementById("alsdjashduia").close();
    } catch (error) {
      reset();
      document.getElementById("alsdjashduia").close();
      toast.error(error.response.data);
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      getUsers();
      toast.success("Data user berhasil di hapus");
    } catch (error) {
      toast.error("Gagal hapus data user");
      console.log(error);
    }
  };

  const ubahRole = async (id) => {
    try {
      const response = await axios.get(`/ubahRole/${id}`);
      getUsers();
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Gagal ubah role user");
      console.log(error);
    }
  };
  // ---------------------------------- Start Logic Table ------------------------------------------------

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

  // ---------------------------------- End Logic Table ------------------------------------------------
  return (
    <>
      <div className="bg-primary min-h-screen w-full text-black px-10 pt-16 ">
        <h1 className="text-2xl font-bold mb-8">Daftar Users</h1>
        <div className="flex justify-between mb-6">
          <button
            className="py-2 px-6 bg-secondary text-white rounded-md"
            onClick={() => document.getElementById("alsdjashduia").showModal()}
          >
            Tambah Users
          </button>

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
                <th className="p-3">Username</th>
                <th className="p-3">Role</th>
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
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td className="flex flex-col gap-2 my-3">
                    <button
                      className={` ${
                        item.role === "Admin"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                      onClick={() => ubahRole(item.uuid)}
                    >
                      Ubah Role
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => onDelete(item.uuid)}
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

      <dialog id="alsdjashduia" className="modal">
        <div className="modal-box bg-primary text-black max-w-xl flex flex-col gap-8">
          <h3 className="font-bold text-lg">Tambah Karyawan</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="form-group">
              <label className="text-sm  text-slate-600">Karyawan</label>
              <select
                {...register("idEmployee", {
                  required: "Pilih Karyawan yang ingin dibuatkan akun",
                })}
                className={`select select-bordered w-full bg-primary border border-black text-black ${
                  errors["idEmployee"] && "input-error"
                }`}
              >
                <option value="">Pilih Karyawan</option>
                {karyawan?.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </select>
              {errors["idEmployee"] && (
                <span className="text-red-500 text-sm">
                  {errors["idEmployee"].message}
                </span>
              )}
            </div>

            {/* Input Nama */}
            <div className="form-group -mt-2">
              <label htmlFor="username" className="text-sm  text-slate-600">
                Username
              </label>
              <input
                id="username"
                {...register("username", {
                  required: "username akun harus diisi",
                  minLength: {
                    value: 2,
                    message: "username harus terdiri dari minimal 2 huruf",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "username hanya boleh mengandung huruf dan spasi",
                  },
                })}
                className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary  ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Username"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Input Password */}
            <div className="form-group -mt-2">
              <label htmlFor="password" className="text-sm text-slate-600">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password harus diisi",
                  minLength: {
                    value: 6,
                    message: "Password harus terdiri dari minimal 6 karakter",
                  },
                })}
                className={`input input-bordered w-full bg-primary border border-black placeholder:text-tertiary ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="form-group -mt-2">
              <label className="text-sm  text-slate-600">Role</label>
              <select
                {...register("isAdmin", {
                  required: "Pilih Role",
                })}
                className={`select select-bordered w-full bg-primary border border-black text-black ${
                  errors["isAdmin"] && "input-error"
                }`}
              >
                <option value="">Pilih Role</option>
                <option value="0">Karyawan</option>
                <option value="1">Admin</option>
              </select>
              {errors["isAdmin"] && (
                <span className="text-red-500 text-sm">
                  {errors["isAdmin"].message}
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
                  document.getElementById("alsdjashduia").close();
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
    </>
  );
};

export default Users;
