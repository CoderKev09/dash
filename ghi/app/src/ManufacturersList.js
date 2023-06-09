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
      <div>
        <h1 className="display-4">Manufacturers</h1>
      </div>
      <div>
        <Link to="new">
          <button type="button" className="btn btn-success btn-sm">
            Add a new manufacturer
          </button>
        </Link>
      </div>
      <table className="table table-striped shadow p-1 m-3">
        <thead className="table-success">
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
  );
}

export default ManufacturerList;
