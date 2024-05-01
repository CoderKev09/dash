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
      <div className="offset-1 col-10">
        <div className="shadow p-3 m-4">
          <h1 className="m-3">Customers</h1>
          <div className="row gap-5 m-3">
            <Link
              to="new"
              style={{ backgroundColor: "#b2211f" }}
              className="btn btn-sm col-3 text-light"
            >
              Add a Customer
            </Link>
          </div>
          <table className="table table-dark table-hover shadow">
            <thead>
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
      </div>
    </div>
  );
}

export default CustomersList;
