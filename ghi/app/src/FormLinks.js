import React from "react";
import { Link } from "react-router-dom";

function FormLinks() {
  return (
    <>
      <div className="form-title-div">
        <h5 className="forms-title text-dark">Quick form links</h5>
      </div>
      <div className="form-links-container">
        <div className="left-links">
          <Link to="manufacturers/new">Add a Manufacturer</Link> <br />
          <Link to="models/new">Add a Vehicle Model</Link>
          <br />
          <Link to="automobiles/new">Add an Automobile</Link>
          <br />
          <Link to="sales/salespeople/new">Add a Salesperson</Link>
        </div>
        <div className="right-links">
          <Link to="sales/customers/new">Add a Customer</Link>
          <br />
          <Link to="sales/sales/new">Add a Sale</Link>
          <br />
          <Link to="service/technicians/new">Add a Technician</Link>
          <br />
          <Link to="service/appointments/new">
            Create a Service Appointment
          </Link>
        </div>
      </div>
    </>
  );
}

export default FormLinks;
