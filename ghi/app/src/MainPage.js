import UpcomingAppointments from "./UpcomingAppointments";
import DealershipStats from "./DealershipStats";
import FormLinks from "./FormLinks";
import AvailableAutosList from "./AvailableAutos";
import "./index.css";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <>
      <div className="top-container">
        <div className="title-container">
          <div>
            <img
              src="/carbackdrop.jpg"
              alt="red car"
              className="car-backdrop"
            />
            <div className="web-title text-light">
              <h5 className="gradient-text">Dash</h5>
              <p>The premiere solution for automobile dealership management!</p>
            </div>
          </div>
        </div>
        <div className="stats-appt-container">
          <div className="stats-container">
            <DealershipStats />
          </div>
          <div className="appts-container">
            <UpcomingAppointments />
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <div className="links-container">
          <FormLinks />
        </div>
        <div className="available-autos-container">
          <AvailableAutosList />
        </div>
      </div>
    </>
  );
}

export default MainPage;
