import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function AvailableAutosList() {
  const [availableAutosList, setAvailableAutosList] = useState([]);

  const fetchAutomobileData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const autoList = [];
      for (let auto of data.autos) {
        if (auto.sold === false) {
          autoList.push(auto);
        }
      }
      setAvailableAutosList(autoList);
    }
  };

  useEffect(() => {
    fetchAutomobileData();
  }, []);

  return (
    <>
      <div className="available-autos-title">
        <h4 className="text-light">Available Automobiles</h4>
        <Link to="/automobiles" className="btn btn-danger btn-sm ">
          {" "}
          View all
        </Link>
      </div>
      <div className="available-pics-container">
        {availableAutosList.map((auto) => (
          <div className="available-pic-container">
            {" "}
            <img
              className="available-pic"
              src={auto.model.picture_url}
              alt="available auto picture"
            />
            <div className="model-name">
              <p className="text-center text-light">
                {auto.model.manufacturer.name} {auto.model.name}{" "}
              </p>
            </div>
            <div className="auto-overlay">
              <div className="auto-info text-center">
                <p>{auto.year}</p>
                <p>{auto.color}</p>
                <p>Vin: {auto.vin}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AvailableAutosList;
