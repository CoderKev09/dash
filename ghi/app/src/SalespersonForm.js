import React, { useState } from "react";

function SalespersonForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.employee_id = employeeID;
    data.first_name = firstName;
    data.last_name = lastName;

    const url = "http://localhost:8090/api/salespeople/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setEmployeeId("");
      setFirstName("");
      setLastName("");
    }
  };

  const [employeeID, setEmployeeId] = useState("");
  const handleEmployeeIdChange = (event) => {
    const value = event.target.value;
    setEmployeeId(value);
  };

  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };

  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Salesperson</h1>
          <form onSubmit={handleSubmit} id="create-salesperson-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleEmployeeIdChange}
                value={employeeID}
                placeholder="Employee ID"
                required
                type="text"
                name="employee_id"
                id="employee_id"
                className="form-control"
              />
              <label className="text-dark" htmlFor="employee_id">
                Employee ID
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFirstNameChange}
                value={firstName}
                placeholder="First name"
                required
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
              />
              <label className="text-dark" htmlFor="first_name">
                First name
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleLastNameChange}
                value={lastName}
                placeholder="Last name"
                required
                type="text"
                name="Last_name"
                id="Last_name"
                className="form-control"
              />
              <label className="text-dark" htmlFor="Last_name">
                Last name
              </label>
            </div>
            <button className="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalespersonForm;
