import React, { useState } from "react";

function ManufacturerForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;

    const url = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setName("");
    }
  };

  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleNameChange}
                value={name}
                placeholder="Manufacturer name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label className="text-dark" htmlFor="name">
                Manufacturer name
              </label>
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

export default ManufacturerForm;
