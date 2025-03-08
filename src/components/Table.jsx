import { useEffect, useState } from "react";
import './table.css';

export default function Table() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/data?page=${page}&limit=${limit}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [page]);

  // Function to handle the deletion of a row
  const handleDelete = async (id) => {
    const isConfirmed=window.confirm('Are you sure you want to delete this row?')
    if(!isConfirmed){
      return;
    }
    try {
      // Make the DELETE request to the backend
      const response = await fetch(`http://localhost:5000/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete data');
      }

      // Remove the deleted item from the state (optimistic update)
      setData((prevData) => prevData.filter((entry) => entry.id !== id));

      alert("Row deleted successfully!");
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };

  return (
    <>
      <div className="table-container">
        <table>
          <caption> <h2>Stock Market Data</h2></caption>
          <thead>
            <tr>
              <th>Date</th>
              <th>Trade Code</th>
              <th>High</th>
              <th>Low</th>
              <th>Open</th>
              <th>Close</th>
              <th>Volume</th>
              <th>Actions</th> {/* Add an extra column for actions */}
            </tr>
          </thead>
          <tbody>
  {data.length > 0 ? (
    data.map((entry) => (
      <tr key={entry.id}> {/* Using `entry.id` as the key for the row */}
        <td>{entry.date}</td>
        <td>{entry.trade_code}</td>
        <td>{entry.high}</td>
        <td>{entry.low}</td>
        <td>{entry.open}</td>
        <td>{entry.close}</td>
        <td>{entry.volume}</td>
        <td>
          <button onClick={() => handleDelete(entry.id)}>Delete</button> {/* Passing `id` to handleDelete */}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8">No data available</td>
    </tr>
  )}
</tbody>

        </table>

        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
