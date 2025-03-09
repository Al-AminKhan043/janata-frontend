import { useEffect, useState } from "react";
import Table from "./Table";
import Chart from "./Chart";
import './table.css';

export default function ParentComponent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({
    date: "",
    trade_code: "",
    high: "",
    low: "",
    open: "",
    close: "",
    volume: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 50;

  // Fetch Data from Backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://janata-backend.onrender.com/data?page=${page}&limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);  
      } catch (error) {
        console.error('Error fetching data', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  // Handle Edit Button Click
  const handleEdit = (row) => {
    setEditingRow(row.id);
    setEditedData({ ...row }); 
  };

  // Handle Save Action
  const handleSave = async () => {
    try {
      const response = await fetch(`https://janata-backend.onrender.com/update/${editedData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === editedData.id ? { ...item, ...editedData } : item
          )
        );
        setEditingRow(null);
        alert('Row updated successfully!');
      } else {
        throw new Error('Failed to update data!');
      }
    } catch (error) {
      console.error('Failed to update data!', error);
    }
  };

  // Handle Delete Action
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this row?');
    if (!isConfirmed) return;

    try {
      const response = await fetch(`https://janata-backend.onrender.com/delete/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete data');

      setData((prevData) => prevData.filter((entry) => entry.id !== id));
      alert("Row deleted successfully!");
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };

  const chartData = {
    labels: data.map((row) => row.date),
    datasets: [
      {
        label: 'Close',
        data: data.map((row) => row.close),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Volume',
        data: data.map((row) => row.volume),
        backgroundColor: 'rgba(153,102,255,0.2)',
        borderColor: 'rgba(153,102,255,1)',
        type: 'bar',
      },
    ],
  };

  return (
    <div>
      {loading ? (
        <div>Loading data...</div>
      ) : (
        <>
          {error && <div>{error}</div>}
          <Chart chartData={chartData} />
          <Table
            data={data}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleSave={handleSave}
            editingRow={editingRow}
            editedData={editedData}
            setEditedData={setEditedData}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
}
