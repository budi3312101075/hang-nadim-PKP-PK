import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "../../utils";

const Maintenance = () => {
  const [data, setData] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  const getMaintenance = async () => {
    try {
      const response = await axios.get(`/maintenance`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMaintenance();
  }, []);

  const handleRowClick = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-primary h-full w-full text-black px-10 py-16">
      <h1 className="text-2xl font-bold mb-8">Daftar Maintenance</h1>

      <button className="py-2 px-6 bg-secondary text-white rounded-md mb-6">
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
                    <div className="avatar mask mask-squircle h-12 w-12 mx-auto">
                      <img
                        src={`http://localhost:5000/${item.photo}`}
                        alt="Avatar"
                        className="rounded-md"
                      />
                    </div>
                  </td>
                  <td className="p-3">
                    <h1 className="font-semibold">{item.name}</h1>
                  </td>
                  <td className="p-3">{item.type}</td>
                </tr>
                {expandedRows[index] && (
                  <tr>
                    <td colSpan={4}>
                      <div className="p-4 bg-gray-50 rounded-b-lg transition-all duration-300 ease-in-out">
                        <h3 className="font-bold text-lg mb-4">
                          Maintenance Records
                        </h3>
                        {item.maintenanceRecords.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="table-auto w-full bg-white shadow-sm rounded-lg">
                              <thead className="bg-gray-200 text-gray-600 text-sm">
                                <tr>
                                  <th className="p-2">No</th>
                                  <th className="p-2 w-10">Jenis Perbaikan</th>
                                  <th className="p-2">Deskripsi</th>
                                  <th className="p-2">Waktu Masuk</th>
                                  <th className="p-2">Waktu Keluar</th>
                                  <th className="p-2">Aksi</th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-700 text-sm">
                                {item.maintenanceRecords.map(
                                  (record, recordIndex) => (
                                    <tr
                                      key={recordIndex}
                                      className="hover:bg-gray-100"
                                    >
                                      <td className="p-2 ">
                                        {recordIndex + 1}
                                      </td>
                                      <td className="p-2">
                                        {record.jenisPerbaikan}
                                      </td>
                                      <td className="p-2">
                                        {record.description}
                                      </td>
                                      <td className="p-2">
                                        {formatDate(record.date_in)}
                                      </td>
                                      <td className="p-2">
                                        {formatDate(record.date_out)}
                                      </td>
                                      <td className="p-2 gap-1 flex flex-col">
                                        <p
                                          className="text-yellow-500"
                                          onClick={() => console.log(record.id)}
                                        >
                                          Ubah
                                        </p>
                                        <p
                                          className="text-red-500"
                                          onClick={() => console.log(record.id)}
                                        >
                                          Hapus
                                        </p>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-gray-600">No records available</p>
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
  );
};

export default Maintenance;
