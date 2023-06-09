import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CustomersList() {
  const [customersList, setCustomersList] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8090/api/customers/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setCustomersList(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div>
        <h1 className="display-3">Customers</h1>
      </div>
      <div>
        <Link to="new" className="btn btn_primary btn-sm">
          <button type="button" className="btn btn-success btn-sm">
            Add a Customer
          </button>
        </Link>
      </div>
      <table className="table table-striped shadow p-1 m-3">
        <thead className="table-success">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customersList.customers?.map((customer) => {
            return (
              <tr key={customer.id}>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.phone_number}</td>
                <td>{customer.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersList;
