import React, { useState, useEffect } from "react";
import {
  CarIcon,
  CashIcon,
  ServiceIcon,
  CustomerIcon,
  SalespersonIcon,
} from "./SVGicons";
import { Link } from "react-router-dom";

function DealershipStats() {
  const [customerCount, setCustomerCount] = useState(0);
  const [salespeopleCount, setSalespeopleCount] = useState(0);
  const [technicianCount, setTechnicianCount] = useState(0);
  const [automobiles, setAutomobiles] = useState([]);
  const [salesCount, setSalesCount] = useState(0);

  const fetchAutomobileData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    }
  };

  const fetchCustomerData = async () => {
    const url = "http://localhost:8090/api/customers/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setCustomerCount(data.customers.length);
    }
  };

  const fetchTechnicianData = async () => {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setTechnicianCount(data.technicians.length);
    }
  };

  const fetchSalespeopleData = async () => {
    const url = "http://localhost:8090/api/salespeople/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setSalespeopleCount(data.salespeople.length);
    }
  };

  const fetchSalesData = async () => {
    const url = "http://localhost:8090/api/sales/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setSalesCount(data.sales.length);
    }
  };

  useEffect(() => {
    fetchAutomobileData();
    fetchCustomerData();
    fetchTechnicianData();
    fetchSalespeopleData();
    fetchSalesData();
  }, []);

  const availableCount = automobiles.reduce((acc, automobile) => {
    return acc + (!automobile.sold ? 1 : 0);
  }, 0);

  return (
    <>
      <div className="stats-title text-light text-center">
        <h1>Dealership Statistics</h1>
      </div>
      <div className="stats-images">
        <div className="image-container">
          <Link to="sales/salespeople" className="stat-link">
            <img
              src="https://jobs.darcars.com/static/dealer-21582/DC_Car_Salesman_L3.png.png"
              alt="salesperson pic"
            />
            <div className="overlay">
              <div className="icon">
                <SalespersonIcon width="80" height="80" fill="blue" />
              </div>
              <div>
                <h1 className="count">{salespeopleCount}</h1>
                <p>Salespeople</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="image-container">
          <Link to="service/technicians">
            <img
              src="https://palmbeach.floridaweekly.com/wp-content/uploads/images/2023-10-12/24p1.jpg"
              alt="technician pic"
            />
            <div className="overlay">
              <div className="icon">
                <ServiceIcon width="70" height="70" fill="brown" />
              </div>
              <div>
                {" "}
                <h1 className="count">{technicianCount}</h1>
                <p>Technicians</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="image-container">
          <Link to="sales/customers">
            <img
              src="https://www.mckinsey.com/~/media/mckinsey/business%20functions/marketing%20and%20sales/our%20insights/the%20new%20key%20to%20automotive%20success%20put%20customer%20experience%20in%20the%20drivers%20seat/standard-cx-in-automotive.jpg"
              alt="customer pic"
            />
            <div className="overlay">
              <div className="icon">
                <CustomerIcon width="80" height="80" fill="purple" />
              </div>
              <div>
                <h1 className="count">{customerCount} </h1>
                <p>Customers</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="image-container">
          <Link to="sales/sales">
            <img
              src="https://images.mktw.net/im-832747?size=1&width=640"
              alt="sale pic"
            />
            <div className="overlay">
              <div className="cash-icon">
                <CashIcon width="80" height="80" fill="#079c07" />
              </div>
              <div className="sales-stat-details">
                <h1 className="count">{salesCount}</h1> <p>Sales</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default DealershipStats;
