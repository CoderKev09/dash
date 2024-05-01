import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "./SVGicons";

function FormLinks() {
  return (
    <>
      <div className="form-title-div">
        <h4 className="forms-title text-light text-center">Quick form links</h4>
      </div>
      <div className="form-links-container">
        <div className="left-links text-center">
          <div>
            <Link to="manufacturers/new">
              <PlusIcon /> {"   "}
              Add a Manufacturer
            </Link>
          </div>
          <div>
            <Link to="models/new">
              <PlusIcon /> {"   "}
              Add a Vehicle Model
            </Link>
          </div>
          <div>
            <Link to="automobiles/new">
              <PlusIcon /> {"   "}
              Add an Automobile
            </Link>
          </div>
          <Link to="sales/salespeople/new">
            <PlusIcon /> {"   "}
            Add a Salesperson
          </Link>
        </div>
        <div className="right-links text-center">
          <div>
            <Link to="sales/customers/new">
              <PlusIcon /> {"   "}
              Add a Customer
            </Link>
          </div>
          <div>
            <Link to="sales/sales/new">
              <PlusIcon /> {"   "}Add a Sale
            </Link>
          </div>
          <div>
            <Link to="service/technicians/new">
              <PlusIcon /> {"   "}
              Add a Technician
            </Link>
          </div>
          <div>
            <Link to="service/appointments/new">
              <PlusIcon /> {"   "}
              Create a Service Appointment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormLinks;
