import { useEffect,useState } from "react";
import './table.css';

export default function Table(){
  const [data,setData]=useState([]);
  const [page,setPage]=useState(1);
  const limit=50;
  useEffect( ()=>{
    const fetchData= async()=>{
    try{
     const response= await fetch(`http://localhost:5000/data?page=${page}&limit=${limit}`);
     if(!response.ok){
      throw new Error('failed to fetch data');
     }
     const jsonData= await response.json();
     setData(jsonData);
    }
    catch(error){
      console.error('Error fetching data',error);
    }
  }
  fetchData();
  },[page])
  return (
    <>
    <div className="table-container">
      <table>
        <caption>Stock Market Data</caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Trade Code</th>
            <th>High</th>
            <th>Low</th>
            <th>Open</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.trade_code}</td>
                <td>{entry.high}</td>
                <td>{entry.low}</td>
                <td>{entry.open}</td>
                <td>{entry.close}</td>
                <td>{entry.volume}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available</td>
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
  )
}