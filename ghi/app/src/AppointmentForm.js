import React, { useState, useEffect } from "react";

function AppointmentForm() {
  const [technicians, setTechnicians] = useState([]);
  const [formData, setFormData] = useState({
    vin: "",
    customer: "",
    date: "",
    time: "",
    technician: "",
    reason: "",
  });

  const fetchTechnicians = async () => {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  };

  const handleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitSuccessful = () => {
    return `<div class="alert alert-success" role="alert">New automobile successfully added!</div>`;
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const data = {};
    data.vin = formData.vin;
    data.customer = formData.customer;
    data.date_time = `${formData.date}T${formData.time}`;
    data.technician = formData.technician;
    data.reason = formData.reason;

    const appointmentUrl = "http://localhost:8080/api/appointments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(appointmentUrl, fetchConfig);
    if (response.ok) {
      const success = document.getElementById("submitted");
      success.innerHTML = submitSuccessful();
      setFormData({
        vin: "",
        customer: "",
        date: "",
        time: "",
        technician: "",
        reason: "",
      });
    }
  };

  useEffect(() => {
    fetchTechnicians();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a service appointment</h1>
          <form id="create-appointment-form" onSubmit={handleCreate}>
            <div className="form-floating mb-3">
              <input
                placeholder="Automobile VIN"
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
                onChange={handleChange}
                value={formData.vin}
              />
              <label className="text-dark" htmlFor="name">
                Automobile VIN
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Customer"
                required
                type="text"
                name="customer"
                id="customer"
                className="form-control"
                onChange={handleChange}
                value={formData.customer}
              />
              <label className="text-dark" htmlFor="name">
                Customer
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Date"
                required
                type="date"
                name="date"
                id="date"
                className="form-control"
                onChange={handleChange}
                value={formData.date}
              />
              <label className="text-dark" htmlFor="name">
                Date
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Time"
                required
                type="time"
                name="time"
                id="time"
                className="form-control"
                onChange={handleChange}
                value={formData.time}
              />
              <label className="text-dark" htmlFor="name">
                Time
              </label>
            </div>
            <div className="mb-3">
              <select
                required
                id="technician"
                name="technician"
                className="form-select"
                onChange={handleChange}
              >
                <option value="">Select a technician</option>
                {technicians?.map((technician) => {
                  return (
                    <option
                      key={technician.employee_id}
                      value={technician.employee_id}
                    >
                      {technician.first_name} {technician.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Reason"
                required
                type="text"
                name="reason"
                id="reason"
                className="form-control"
                onChange={handleChange}
                value={formData.reason}
              />
              <label className="text-dark" htmlFor="name">
                Reason
              </label>
            </div>
            <div id="submitted"></div>
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

export default AppointmentForm;
