import React, { useState, useEffect } from "react";

function SaleForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.automobile = vin;
    data.salesperson = salesperson;
    data.customer = customer;
    data.price = price;

    const url = "http://localhost:8090/api/sales/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const soldUrl = `http://localhost:8100/api/automobiles/${vin}/`;
    const fetchSoldConfig = {
      method: "put",
      body: JSON.stringify({ sold: true }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    const soldResponse = await fetch(soldUrl, fetchSoldConfig);

    if (response.ok && soldResponse.ok) {
      const autoUrl = "http://localhost:8100/api/automobiles/";
      fetch(autoUrl);
      setVin("");
      setSalesperson("");
      setCustomer("");
      setPrice("");
    }
  };

  const [vin, setVin] = useState("");
  const handleVinChange = (event) => {
    const value = event.target.value;
    setVin(value);
  };

  const [salesperson, setSalesperson] = useState("");
  const handleSalespersonChange = (event) => {
    const value = event.target.value;
    setSalesperson(value);
  };

  const [customer, setCustomer] = useState("");
  const handleCustomerChange = (event) => {
    const value = event.target.value;
    setCustomer(value);
  };

  const [price, setPrice] = useState("");
  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const [autos, setAutos] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchData = async () => {
    const autosUrl = "http://localhost:8100/api/automobiles/";
    const autosResponse = await fetch(autosUrl);

    if (autosResponse.ok) {
      const autosData = await autosResponse.json();
      const autosAvailable = autosData.autos.filter(
        (auto) => auto.sold === false
      );
      setAutos(autosAvailable);
    }

    const salepeopleUrl = "http://localhost:8090/api/salespeople/";
    const salespeopleResponse = await fetch(salepeopleUrl);

    if (salespeopleResponse.ok) {
      const salespeopleData = await salespeopleResponse.json();
      setSalespeople(salespeopleData.salespeople);
    }

    const customersUrl = "http://localhost:8090/api/customers/";
    const customersResponse = await fetch(customersUrl);

    if (customersResponse.ok) {
      const customersData = await customersResponse.json();
      setCustomers(customersData.customers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Sale</h1>
          <form onSubmit={handleSubmit} id="create-sales-form">
            <div className="mb-3">
              <select
                onChange={handleVinChange}
                value={vin}
                required
                name="first_name"
                id="first_name"
                className="form-select"
              >
                <option value="">Choose an automobile VIN</option>
                {autos.map((vin) => {
                  return (
                    <option key={vin.vin} value={vin.vin}>
                      {vin.model.name} / VIN:{vin.vin}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={handleSalespersonChange}
                value={salesperson}
                required
                name="salesperson"
                id="salesperson"
                className="form-select"
              >
                <option value="">Choose a salesperson</option>
                {salespeople.map((salesperson) => {
                  return (
                    <option
                      key={salesperson.employee_id}
                      value={salesperson.employee_id}
                    >
                      {salesperson.first_name} {salesperson.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={handleCustomerChange}
                value={customer}
                required
                name="customer"
                id="customer"
                className="form-select"
              >
                <option value="">Choose a customer</option>
                {customers.map((customer) => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.first_name} {customer.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePriceChange}
                value={price}
                placeholder="Price"
                required
                type="text"
                name="price"
                id="price"
                className="form-control"
              />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SaleForm;
