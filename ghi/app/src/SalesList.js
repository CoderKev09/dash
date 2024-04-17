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
      <div>
        <h1 className="display-3">Sales</h1>
      </div>
      <div>
        <Link to="new" className="btn btn_success btn-sm">
          <button type="button" className="btn btn-success btn-sm">
            Add a sale
          </button>
        </Link>
      </div>
      <table className="table table-hover table-dark shadow p-1 m-3">
        <thead className="table-success">
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
  );
}

export default SalesList;
