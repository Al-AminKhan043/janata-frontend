import { useEffect, useState } from "react";
import './table.css';

export default function Table() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const limit = 50;

  // Handle Edit Button Click
  const handleEdit = (row) => {
    setEditingRow(row.id);
    setEditedData({ ...row }); // Set old values into editedData state
  };

  // Handle Input Change
  const handleInputChange = (e, field) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  // Handle Save Action
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/update/${editedData.id}`, {
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

  // Handle Cancel Edit
  const handleCancel = () => {
    setEditingRow(null);
  };

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/data?page=${page}&limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [page]);

  // Handle Delete Action
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this row?');
    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/delete/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete data');

      setData((prevData) => prevData.filter((entry) => entry.id !== id));
      alert("Row deleted successfully!");
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };

  return (
    <div className="table-container">
      <table>
        <caption><h2>Stock Data</h2></caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Trade Code</th>
            <th>High</th>
            <th>Low</th>
            <th>Open</th>
            <th>Close</th>
            <th>Volume</th>
            <th>Edit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {data.map((entry) => (
    <tr key={entry.id} className={editingRow === entry.id ? 'editing' : ''}>
      {["date", "trade_code", "high", "low", "open", "close", "volume"].map((field) => (
        <td key={field}>
          {editingRow === entry.id ? (
            <input
              type="text"
              value={editedData[field] || ""}
              onChange={(e) => handleInputChange(e, field)}
            />
          ) : (
            entry[field]
          )}
        </td>
      ))}
      <td>
        {editingRow === entry.id ? (
          <>
            <button onClick={handleSave}>Save</button>
            {/* <button onClick={handleCancel}>Cancel</button> */}
          </>
        ) : (
          <button onClick={() => handleEdit(entry)}>Edit</button>
        )}
      </td>
      <td>
        <button className="del" onClick={() => handleDelete(entry.id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
      {/* Pagination Controls */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
