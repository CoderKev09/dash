import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function AppointmentsList() {
	const [appointmentsList, setAppointmentsList] = useState([]);

	const fetchData = async () => {
		const url = 'http://localhost:8080/api/appointments/';
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setAppointmentsList(data.appointments);
		}
	};


	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="row">
			<div className="offset-1 col-10">
				<div className="shadow p-3 m-4">
					<h1>Service Appointments</h1>
					<div className="row gap-5 m-3">
						<Link to="new" className="btn btn-success btn-sm col-3">
							Add a new appointment
						</Link>
					</div>
					<br />
					<table className="table table-hover text-center">
						<thead>
							<tr>
								<th>VIN</th>
								<th>Is VIP?</th>
								<th>Customer</th>
								<th>Date</th>
								<th>Time</th>
								<th>Technician</th>
								<th>Reason</th>
                                <th></th>
							</tr>
						</thead>
						<tbody>
							{appointmentsList?.map((appointment) => {
								return (
									<tr className="align-middle" key={appointment.id} value="appointment.id">
										<td>{appointment.vin}</td>
                                        <td>VIP?</td>
                                        <td>{appointment.customer}</td>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.time}</td>
                                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                        <td>{appointment.reason}</td>
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
