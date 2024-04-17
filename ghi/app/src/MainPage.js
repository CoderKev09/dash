import UpcomingAppointments from "./UpcomingAppointments";
import DealershipStats from "./DealershipStats";
import FormLinks from "./FormLinks";
import "./index.css";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className="main-container">
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
        <div>
          {" "}
          <DealershipStats />
        </div>
      </div>
      <div className="dashboard-container">
        <div className="body-left-container">
          <FormLinks />
        </div>
        <div className="body-right-container">
          <UpcomingAppointments />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
