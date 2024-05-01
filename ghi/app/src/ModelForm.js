import React, { useState, useEffect } from "react";

function ModelForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.picture_url = pictureUrl;
    data.manufacturer_id = parseInt(manufacturerId);

    const modelUrl = "http://localhost:8100/api/models/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(modelUrl, fetchConfig);
    if (response.ok) {
      setName("");
      setPictureUrl("");
      setManufacturerId("");
    }
  };

  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const [pictureUrl, setPictureUrl] = useState("");
  const handlePictureChange = (event) => {
    const value = event.target.value;
    setPictureUrl(value);
  };

  const [manufacturerId, setManufacturerId] = useState("");
  const handleManufacturerIdChange = (event) => {
    const value = event.target.value;
    setManufacturerId(value);
  };

  const [manufacturers, setManufacturers] = useState([]);
  const fetchData = async () => {
    const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(manufacturerUrl);

    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4 text-dark">
          <h1>Add a vehicle model</h1>
          <form onSubmit={handleSubmit} id="create-model-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleNameChange}
                value={name}
                placeholder="Model name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label className="text-dark" htmlFor="name">
                Model name
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePictureChange}
                value={pictureUrl}
                placeholder="Picture URL"
                required
                type="url"
                name="picture_url"
                id="picture_url"
                className="form-control"
              />
              <label className="text-dark" htmlFor="picture_url">
                Picture URL
              </label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleManufacturerIdChange}
                required
                name="manufacturer_id"
                id="manufacturer_id"
                className="form-select"
              >
                <option value="">Choose a manufacturer...</option>
                {manufacturers.map((manufacturer) => {
                  return (
                    <option key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              style={{ backgroundColor: "#b2211f" }}
              className="btn text-light"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModelForm;
