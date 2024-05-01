import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UpcomingAppointments() {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  const fetchAppointmentData = async () => {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setUpcomingAppointments(data.appointments.splice(0, 5));
    }
  };

  const getDate = (datetime) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}/${year}`;
  };

  const getTime = (datetime) => {
    const date = new Date(datetime);
    let hour = date.getHours();
    const minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    let ampm = "AM";
    if (hour > 12) {
      hour -= 12;
      ampm = "PM";
    }
    return `${hour}:${minute} ${ampm}`;
  };

  useEffect(() => {
    fetchAppointmentData();
  }, []);

  return (
    <>
      <div className="appointments-table-title">
        <h4 className="text-light">Upcoming Appointments</h4>
        <Link to="service/appointments" className="btn btn-danger btn-sm ">
          View all
        </Link>
      </div>
      <div className="appt-details-container">
        <table className="table table-hover table-light">
          <thead>
            <tr className="appointments-thead">
              <th>Customer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {upcomingAppointments?.map((appointment) => {
              return (
                <tr key={appointment.id} value="appointment.id">
                  <td>{appointment.customer}</td>
                  <td>{getDate(appointment.date_time)}</td>
                  <td>{getTime(appointment.date_time)}</td>
                  <td>
                    {`${appointment.technician.first_name} ${appointment.technician.last_name}`}
                  </td>
                  <td>{appointment.reason}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UpcomingAppointments;
