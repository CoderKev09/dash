import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturersList from "./ManufacturersList";
import ManufacturerForm from "./ManufacturerForm";
import ModelsList from "./ModelsList";
import ModelForm from "./ModelForm";
import AutomobilesList from "./AutomobilesList";
import AutomobileForm from "./AutomobileForm";

import SalespeopleList from "./SalespeopleList";
import SalespersonForm from "./SalespersonForm";
import CustomersList from "./CustomersList";
import CustomerForm from "./CustomerForm";
import SalesList from "./SalesList";
import SaleForm from "./SaleForm";
import SalesHistory from "./SalesHistory";

import TechniciansList from "./TechniciansList";
import TechnicianForm from "./TechnicianForm";
import AppointmentsList from "./AppointmentsList";
import AppointmentForm from "./AppointmentForm";
import ServiceHistory from "./ServiceHistory";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="main-container">
        <Routes>
          <Route path="/">
            <Route path="/" element={<MainPage />} />
            <Route path="manufacturers" element={<ManufacturersList />} />
            <Route path="manufacturers/new" element={<ManufacturerForm />} />

            <Route path="models" element={<ModelsList />} />
            <Route path="models/new" element={<ModelForm />} />

            <Route path="automobiles" element={<AutomobilesList />} />
            <Route path="automobiles/new" element={<AutomobileForm />} />
          </Route>

          <Route path="sales">
            <Route index />
            <Route path="salespeople" element={<SalespeopleList />} />
            <Route path="salespeople/new" element={<SalespersonForm />} />

            <Route path="customers" element={<CustomersList />} />
            <Route path="customers/new" element={<CustomerForm />} />

            <Route path="sales" element={<SalesList />} />
            <Route path="sales/new" element={<SaleForm />} />

            <Route path="sales-history" element={<SalesHistory />} />
          </Route>

          <Route path="service">
            <Route index />
            <Route path="technicians" element={<TechniciansList />} />
            <Route path="technicians/new" element={<TechnicianForm />} />

            <Route path="appointments" element={<AppointmentsList />} />
            <Route path="appointments/new" element={<AppointmentForm />} />

            <Route path="service-history" element={<ServiceHistory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
