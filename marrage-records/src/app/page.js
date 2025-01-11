"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    wifeName: "",
    husbandName: "",
    dateOfMarriage: "",
    pageNo: "",
    balamNo: "",
  });

  const [searchData, setSearchData] = useState({
    wifeName: "",
    husbandName: "",
    dateOfMarriage: "",
    pageNo: "",
    balamNo: "",
  });

  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords(); // Load all records on page load
  }, []);

  const handleChange = (e, stateSetter) => {
    const { name, value } = e.target;
    stateSetter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const newRecord = await res.json();
        setRecords((prev) => [...prev, newRecord]);
        setFormData({
          wifeName: "",
          husbandName: "",
          dateOfMarriage: "",
          pageNo: "",
          balamNo: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecords = async () => {
    try {
      const queryParams = new URLSearchParams(searchData).toString();
      const res = await fetch(`/api/records?${queryParams}`);
      if (res.ok) {
        const data = await res.json();
        setRecords(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchRecords(); // Fetch records based on search criteria
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Marriage Records
      </h1>

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Add a Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="wifeName"
              placeholder="Wife's Name"
              value={formData.wifeName}
              onChange={(e) => handleChange(e, setFormData)}
              required
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="husbandName"
              placeholder="Husband's Name"
              value={formData.husbandName}
              onChange={(e) => handleChange(e, setFormData)}
              required
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="date"
              name="dateOfMarriage"
              value={formData.dateOfMarriage}
              onChange={(e) => handleChange(e, setFormData)}
              required
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="number"
              name="pageNo"
              placeholder="Page No"
              value={formData.pageNo}
              onChange={(e) => handleChange(e, setFormData)}
              required
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="number"
              name="balamNo"
              placeholder="Balam No"
              value={formData.balamNo}
              onChange={(e) => handleChange(e, setFormData)}
              required
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Add Record
          </button>
        </form>
      </div>

      {/* Search Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Search Records</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            name="wifeName"
            placeholder="Search by Wife's Name"
            value={searchData.wifeName}
            onChange={(e) => handleChange(e, setSearchData)}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-green-300"
          />
          <input
            type="text"
            name="husbandName"
            placeholder="Search by Husband's Name"
            value={searchData.husbandName}
            onChange={(e) => handleChange(e, setSearchData)}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-green-300"
          />
          <input
            type="date"
            name="dateOfMarriage"
            value={searchData.dateOfMarriage}
            onChange={(e) => handleChange(e, setSearchData)}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-green-300"
          />
          <input
            type="number"
            name="pageNo"
            placeholder="Search by Page No"
            value={searchData.pageNo}
            onChange={(e) => handleChange(e, setSearchData)}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-green-300"
          />
          <input
            type="number"
            name="balamNo"
            placeholder="Search by Balam No"
            value={searchData.balamNo}
            onChange={(e) => handleChange(e, setSearchData)}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>
        <button
          onClick={handleSearch}
          className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
        >
          Search
        </button>
      </div>

      {/* Records Table */}
      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Records Table</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 p-3 text-gray-700 font-medium">
                Wife's Name
              </th>
              <th className="border-b-2 p-3 text-gray-700 font-medium">
                Husband's Name
              </th>
              <th className="border-b-2 p-3 text-gray-700 font-medium">
                Date of Marriage
              </th>
              <th className="border-b-2 p-3 text-gray-700 font-medium">
                Page No
              </th>
              <th className="border-b-2 p-3 text-gray-700 font-medium">
                Balam No
              </th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record._id} className="hover:bg-gray-100">
                  <td className="p-3">{record.wifeName}</td>
                  <td className="p-3">{record.husbandName}</td>
                  <td className="p-3">
                    {new Date(record.dateOfMarriage).toLocaleDateString()}
                  </td>
                  <td className="p-3">{record.pageNo}</td>
                  <td className="p-3">{record.balamNo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-3 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
