import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SalespeopleList() {
  const [salespeopleList, setSalesPeopleList] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8090/api/salespeople/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setSalesPeopleList(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div>
        <h1 className="display-3">Salespeople</h1>
      </div>
      <div>
        <Link to="new" className="btn btn_primary btn-sm">
          <button type="button" className="btn btn-success btn-sm">
            Add a salesperson
          </button>
        </Link>
      </div>
      <table className="table table-dark table-hover shadow p-1 m-3">
        <thead className="table-success">
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {salespeopleList.salespeople?.map((salesperson) => {
            return (
              <tr key={salesperson.employee_id}>
                <td>{salesperson.employee_id}</td>
                <td>{salesperson.first_name}</td>
                <td>{salesperson.last_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SalespeopleList;
