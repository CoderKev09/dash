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
      <div className="offset-1 col-10">
        <div className="shadow p-3 m-4">
          <h1 className="m-3">Salespeople</h1>
          <div className="row gap-5 m-3">
            <Link
              to="new"
              style={{ backgroundColor: "#b2211f" }}
              className="btn btn-sm col-3 text-light"
            >
              Add a salesperson
            </Link>
          </div>
          <table className="table table-dark table-hover shadow">
            <thead>
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
      </div>
    </div>
  );
}

export default SalespeopleList;
