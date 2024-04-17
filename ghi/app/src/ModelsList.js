import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ModelsList() {
  const [modelList, setModelList] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setModelList(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div>
        <h1 className="display-3">Models</h1>
      </div>
      <div>
        <Link to="new">
          <button type="button" className="btn btn-success btn-sm">
            Add a new vehicle model
          </button>
        </Link>
      </div>
      <table className="table shadow p-1 m-3 table-dark table-hover">
        <thead className="table-success">
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {modelList.models?.map((model) => {
            return (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>{model.manufacturer.name}</td>
                <td>
                  <img className="carpic" src={model.picture_url} alt=''/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ModelsList;
