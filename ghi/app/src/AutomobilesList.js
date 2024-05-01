import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function AutomobilesList() {
  const [automobileList, setAutomobileList] = useState([]);

  const fetchAutomobileData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setAutomobileList(data);
    }
  };

  const isSold = (status) => {
    if (status === true) {
      return (
        <div className="alert alert-danger m-0 p-0" role="alert">
          Sold
        </div>
      );
    } else {
      return (
        <div className="alert alert-success m-0 p-0" role="alert">
          Available
        </div>
      );
    }
  };

  useEffect(() => {
    fetchAutomobileData();
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="shadow p-3 m-4">
          <h1>Automobile Inventory</h1>
          <div>
            <Link
              to="new"
              style={{ backgroundColor: "#b2211f" }}
              className="btn btn-sm text-light"
            >
              Add a new automobile
            </Link>
          </div>
          <br />
          <table className="table table-hover text-center table-dark">
            <thead>
              <tr>
                <th>Picture</th>
                <th>Year</th>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>Color</th>
                <th>VIN</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {automobileList.autos?.map((auto) => {
                return (
                  <tr className="align-middle" key={auto.id}>
                    <td>
                      <img
                        className="carpic"
                        src={auto.model.picture_url}
                        alt=""
                      />
                    </td>
                    <td>{auto.year}</td>
                    <td>{auto.model.manufacturer.name}</td>
                    <td>{auto.model.name}</td>
                    <td>{auto.color}</td>
                    <td>{auto.vin}</td>
                    <td>{isSold(auto.sold)}</td>
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

export default AutomobilesList;
