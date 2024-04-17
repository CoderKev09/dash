import React, { useState } from "react";

function CustomerForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.first_name = firstName;
    data.last_name = lastName;
    data.address = address;
    data.phone_number = phoneNumber;

    const url = "http://localhost:8090/api/customers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setFirstName("");
      setLastName("");
      setAddress("");
      setPhoneNumber("");
    }
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

  const [address, setAddress] = useState("");
  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Customer</h1>
          <form onSubmit={handleSubmit} id="create-salesperson-form">
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
            <div className="form-floating mb-3">
              <input
                onChange={handleAddressChange}
                value={address}
                placeholder="Address"
                required
                type="text"
                name="address"
                id="address"
                className="form-control"
              />
              <label className="text-dark" htmlFor="address">
                Address
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePhoneNumberChange}
                value={phoneNumber}
                placeholder="Phone number"
                required
                type="tel"
                name="phone_number"
                id="phone_number"
                className="form-control"
              />
              <label className="text-dark" htmlFor="phone_number">
                Phone Number
              </label>
            </div>
            <button className="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
