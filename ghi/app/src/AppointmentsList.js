import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function AppointmentsList() {
	const [appointmentsList, setAppointmentsList] = useState([]);
	const [vinList, setVinList] = useState([]);

	const fetchAppointments = async () => {
		const url = 'http://localhost:8080/api/appointments/';
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setAppointmentsList(data.appointments);
		}
	};

	const fetchAutomobileVO = async () => {
		const url = 'http://localhost:8080/api/automobiles/';
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			let soldVins = [];
			for (const automobile of data.automobiles) {
				if (automobile.sold == true) {
					soldVins.push(automobile.vin);
				}
			}
			setVinList(soldVins);
		}
	};

	const vipStatus = (vin) => (vinList.includes(vin) ? 'Yes' : 'No');

	const getDate = (datetime) => {
		const date = new Date(datetime);
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDay();
		return `${month}/${day}/${year}`;
	};

	const getTime = (datetime) => {
		const date = new Date(datetime);
		let hour = date.getHours();
		const minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
		let ampm = 'AM';
		if (hour > 12) {
			hour -= 12;
			ampm = 'PM';
		}
		return `${hour}:${minute} ${ampm}`;
	};

	const statusCancel = async (id) => {
		const url = `http://localhost:8080/api/appointments/${id}/cancel/`;
		const fetchConfig = {
			method: 'put',
			body: JSON.stringify({ status: 'Canceled' }),
			headers: { 'Content-Type': 'application/json' },
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			fetchAppointments();
		}
	};

	const statusFinish = async (id) => {
		const url = `http://localhost:8080/api/appointments/${id}/finish/`;
		const fetchConfig = {
			method: 'put',
			body: JSON.stringify({ status: 'Finished' }),
			headers: { 'Content-Type': 'application/json' },
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			fetchAppointments();
		}
	};

	useEffect(() => {
		fetchAppointments();
		fetchAutomobileVO();
	}, []);

	return (
		<div className="row">
			<div className="col-12">
				<div className="shadow p-5 m-4">
					<h1>Service Appointments</h1>
					<div className="row gap-5 m-3">
						<Link to="new" className="btn btn-success btn-sm col-3">
							Add a new appointment
						</Link>
					</div>
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
								<th>Status</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{appointmentsList?.map((appointment) => {
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
										<td>{appointment.status}</td>
										<td>
											<div className="btn-group" role="group">
												<Link
													to="#"
													onClick={() => statusCancel(appointment.id)}
												>
													<button
														type="button"
														className="btn btn-outline-danger"
													>
														Cancel
													</button>
												</Link>
												&nbsp;&nbsp;
												<Link
													to="#"
													onClick={() => statusFinish(appointment.id)}
												>
													<button
														type="button"
														className="btn btn-outline-success"
													>
														Finish
													</button>
												</Link>
											</div>
										</td>
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
