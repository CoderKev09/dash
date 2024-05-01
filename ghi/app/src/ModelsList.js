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
      <div className="col-12">
        <div className="shadow p-3 m-4">
          <h1>Models</h1>
          <div>
            <Link
              to="new"
              style={{ backgroundColor: "#b2211f" }}
              className="btn btn-sm text-light"
            >
              Add a new vehicle model
            </Link>
          </div>
          <br />
          <table className="table table-hover text-center table-dark">
            <thead>
              <tr>
                <th style={{ width: "600px" }}>Picture</th>
                <th>Name</th>
                <th>Manufacturer</th>
              </tr>
            </thead>
            <tbody>
              {modelList.models?.map((model) => {
                return (
                  <tr className="align-middle" key={model.id}>
                    <td>
                      <img className="carpic" src={model.picture_url} alt="" />
                    </td>
                    <td>{model.name}</td>
                    <td>{model.manufacturer.name}</td>
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

export default ModelsList;
