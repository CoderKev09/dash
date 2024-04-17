import React, { useState, useEffect } from "react";
import "./index.css";

function AppointmentsList() {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [vinList, setVinList] = useState([]);
  const [query, setQuery] = useState("");
  const [state, setState] = useState({
    query: "",
    list: appointmentsList,
  });

  const fetchServiceHistory = async () => {
    const url = "http://localhost:8080/api/service-history/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAppointmentsList(data.appointments);
      setState({ query: "", list: data.appointments });
    }
  };

  const fetchAutomobileVO = async () => {
    const url = "http://localhost:8080/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      let vinArray = [];
      for (const automobile of data.automobiles) {
        if (automobile.sold === true) {
          vinArray.push(automobile.vin);
        }
      }
      setVinList(vinArray);
    }
  };

  const vipStatus = (vin) => (vinList.includes(vin) ? "Yes" : "No");

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

  const handleSearch = (e) => {
    e.preventDefault();
    const results = appointmentsList.filter((appointment) => {
      return appointment.vin.toLowerCase().includes(query.toLowerCase());
    });
    setState({
      query: query,
      list: results,
    });
    setQuery("");
  };

  const handleFormDataChange = (e) => {
    setQuery(e.target.value);
  };

  const statusLabel = (status) => {
    if (status === "Canceled") {
      return (
        <div className="alert alert-danger m-0 p-0" role="alert">
          {status}
        </div>
      );
    } else if (status === "Finished") {
      return (
        <div className="alert alert-success m-0 p-0" role="alert">
          {status}
        </div>
      );
    } else {
      return (
        <div className="alert alert-warning m-0 p-0" role="alert">
          {status}
        </div>
      );
    }
  };

  useEffect(() => {
    fetchServiceHistory();
    fetchAutomobileVO();
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="shadow p-3 m-4">
          <h1>Service History</h1>
          <div className="row gap-5 m-3">
            <form className="form-inline input-group" onSubmit={handleSearch}>
              <div className="form-floating col-3">
                <input
                  placeholder="Search by VIN..."
                  type="search"
                  name="search"
                  id="search"
                  className="form-control"
                  onChange={handleFormDataChange}
                  value={query}
                />
                <label htmlFor="name" className="col-form-label text-dark">
                  Search by VIN...
                </label>
              </div>
              <div className="input-group-append">
                &nbsp;&nbsp;
                <button className="btn btn-success">Search</button>
              </div>
            </form>
          </div>
          <br />
          <table className="table table-hover table-dark text-center">
            <thead>
              <tr>
                <th>VIN</th>
                <th>Is VIP?</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {state.list?.map((appointment) => {
                return (
                  <tr
                    className="align-middle"
                    key={appointment.id}
                    value="appointment.id"
                  >
                    <td>{appointment.vin}</td>
                    <td>{vipStatus(appointment.vin)}</td>
                    <td>{appointment.customer}</td>
                    <td>{getDate(appointment.date_time)}</td>
                    <td>{getTime(appointment.date_time)}</td>
                    <td>
                      {`${appointment.technician.first_name} ${appointment.technician.last_name}`}
                    </td>
                    <td>{appointment.reason}</td>
                    <td>{statusLabel(appointment.status)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AppointmentsList;
