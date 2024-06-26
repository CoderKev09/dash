import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TechniciansList() {
  const [techniciansList, setTechniciansList] = useState([]);

  const fetchTechnicianData = async () => {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setTechniciansList(data);
    }
  };

  useEffect(() => {
    fetchTechnicianData();
  }, []);

  return (
    <div className="row">
      <div className="offset-1 col-10">
        <div className="shadow p-3 m-4">
          <h1 className="m-3">Technicians</h1>
          <div className="row gap-5 m-3">
            <Link
              to="new"
              style={{ backgroundColor: "#b2211f" }}
              className="btn btn-sm col-3 text-light"
            >
              Add a new Technician
            </Link>
          </div>
          <br />
          <table className="table table-hover table-dark text-center">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {techniciansList.technicians?.map((technician) => {
                return (
                  <tr className="align-middle" key={technician.id} value="">
                    <td>{technician.employee_id}</td>
                    <td>{technician.first_name}</td>
                    <td>{technician.last_name}</td>
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

export default TechniciansList;
