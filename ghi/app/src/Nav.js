import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Inventory
          </a>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="manufacturers">Show Manufacturers</NavLink></li>
            <li><NavLink className="dropdown-item" to="manufacturers/new">Add a Manufacturer</NavLink></li>
            <li><hr className="dropdown-divider" /></li>
            <li><NavLink className="dropdown-item" to="models">Show Vehicle Models</NavLink></li>
            <li><NavLink className="dropdown-item" to="models/new">Add a Vehicle Model</NavLink></li>
            <li><hr className="dropdown-divider" /></li>
            <li><NavLink className="dropdown-item" to="automobiles">Show Automobiles</NavLink></li>
            <li><NavLink className="dropdown-item" to="automobiles/new">Add an Automobile</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sales
          </a>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="salespeople">Show Salespeople</NavLink></li>
            <li><NavLink className="dropdown-item" to="salespeople/new">Add a Salesperson</NavLink></li>
            <li><hr className="dropdown-divider" /></li>
            <li><NavLink className="dropdown-item" to="customers">Show Customers</NavLink></li>
            <li><NavLink className="dropdown-item" to="customers/new">Add a Customer</NavLink></li>
            <li><hr className="dropdown-divider" /></li>
            <li><NavLink className="dropdown-item" to="sales">Show Sales</NavLink></li>
            <li><NavLink className="dropdown-item" to="sales/new">Add a Sale</NavLink></li>
            <li><hr className="dropdown-divider" /></li>
            <li><NavLink className="dropdown-item" to="sales-history">Show Sales History</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Servicing
          </a>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="technicians">Show Technicians</NavLink></li>
            <li><NavLink className="dropdown-item" to="technicians/new">Add a Technician</NavLink></li>
            <li><hr className="dropdown-divider" /></li>
            <li><NavLink className="dropdown-item" to="appointments">Show Service Appointments</NavLink></li>
            <li><NavLink className="dropdown-item" to="appointments/new">Create a Service Appointment</NavLink></li>
            <li><hr className="dropdown-divider" /></li>
            <li><NavLink className="dropdown-item" to="service-history">Show Service History</NavLink></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
      </div>
    </nav>
  )
}

export default Nav;