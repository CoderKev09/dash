import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
            <Route path="manufacturers" element={<ManufacturersList />} />
            <Route path="manufacturers/new" element={<ManufacturerForm />} />

            <Route path="models" element={<ModelsList />} />
            <Route path="models/new" element={<ModelForm />} />

            <Route path="automobiles" element={<AutomobilesList />} />
            <Route path="automobiles/new" element={<AutomobileForm />} />
          </Route>

          <Route path="sales">
            <Route index element={<SalesMain />} />
            <Route path="salespeople" element={<SalespeopleList />} />
            <Route path="salespeople/new" element={<SalespersonForm />} />

            <Route path="customers" element={<CustomersList />} />
            <Route path="customers/new" element={<CustomerForm />} />

            <Route path="sales" element={<SalesList />} />
            <Route path="sales/new" element={<SaleForm />} />

            <Route path="history" element={<SalesHistory />} />
          </Route>

          <Route path="servicing">
            <Route index element={<ServicingMain />} />
            <Route path="technicians" element={<TechniciansList />} />
            <Route path="technicians/new" element={<TechnicianForm />} />

            <Route path="appointments" element={<AppointmentsList />} />
            <Route path="appointments/new" element={<AppointmentForm />} />

            <Route path="history" element={<ServiceHistory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
