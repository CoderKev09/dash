import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ManufacturerList() {
  const [manufacturerList, setManufacturerList] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setManufacturerList(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-1 col-10">
        <div className="shadow p-3 m-4">
          <h1 className="m-3">Manufacturers</h1>
          <div className="row gap-5 m-3">
            <Link
              to="new"
              style={{ backgroundColor: "#b2211f" }}
              className="btn btn-sm col-3 text-light"
            >
              Add a new manufacturer
            </Link>
          </div>
          <table className="table table-dark table-hover shadow">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {manufacturerList.manufacturers?.map((manufacturer) => {
                return (
                  <tr key={manufacturer.id}>
                    <td>{manufacturer.name}</td>
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

export default ManufacturerList;
