import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SalesList() {
  const [salesList, setSalesList] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8090/api/sales/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setSalesList(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-1 col-10">
        <div className="shadow p-3 m-4">
          <h1 className="m-3">Sales</h1>
          <div className="row gap-5 m-3">
            <Link
              to="new"
              style={{ backgroundColor: "#b2211f" }}
              className="btn btn-sm col-3 text-light"
            >
              Add a sale
            </Link>
          </div>
          <table className="table table-hover table-dark shadow">
            <thead>
              <tr>
                <th>Salesperson Employee ID</th>
                <th>Salesperson Name</th>
                <th>Customer</th>
                <th>VIN</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {salesList.sales?.map((sale) => {
                return (
                  <tr key={sale.id}>
                    <td>{sale.salesperson.employee_id}</td>
                    <td>
                      {sale.salesperson.first_name} {sale.salesperson.last_name}
                    </td>
                    <td>
                      {sale.customer.first_name} {sale.customer.last_name}
                    </td>
                    <td>{sale.automobile.vin}</td>
                    <td>{sale.price}</td>
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

export default SalesList;
