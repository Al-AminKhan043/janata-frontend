import React from "react";

export default function Table({
  data,
  handleDelete,
  handleEdit,
  handleSave,
  editingRow,
  setEditedData,
  editedData, 
  page,
  setPage
}) {
  const handleInputChange = (e, field) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  return (
    <>
      <table>
        <caption>
          <h2>Stock Data</h2>
        </caption>
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
          {data.length > 0 ? (
            data.map((entry) => (
              <tr key={entry.id} className={editingRow === entry.id ? "editing" : ""}>
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
                    <button onClick={handleSave}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(entry)}>Edit</button>
                  )}
                </td>
                <td>
                  <button className="del" onClick={() => handleDelete(entry.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No data available.</td>
            </tr>
          )}
        </tbody>
      </table>

     
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </>
  );
}
