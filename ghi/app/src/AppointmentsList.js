import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function AppointmentsList() {
	const [appointmentsList, setAppointmentsList] = useState([]);
    const [vinList, setVinList] = useState([]);

	const fetchData = async () => {
		const url = 'http://localhost:8080/api/appointments/';
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setAppointmentsList(data.appointments);
		}
    };

    const fetchInventory = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            let vinArray = [];
            for (const d of data.autos) {
                if (d.sold == true) {
                    vinArray.push(d.vin)
                }
            }
            setVinList(vinArray)
        }
    }
    

    const vipStatus = (v) => {
        if (vinList.includes(v)) {
            return "Yes"
        } else {
            return "No"
        }
    }
    
    const statusCancel = async (id) => {
        const url = `http://localhost:8080/api/appointments/${id}/cancel/`;
        const fetchConfig = {    
            method: 'put',
            body: JSON.stringify({"status": "Canceled"}),
            headers: {'Content-Type': 'application/json'}
        }
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchData();
        }
    }

    const statusFinish = async (id) => {
        const url = `http://localhost:8080/api/appointments/${id}/finish/`;
        const fetchConfig = {    
            method: 'put',
            body: JSON.stringify({"status": "Finished"}),
            headers: {'Content-Type': 'application/json'}
        }
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchData();
        }
    }

	useEffect(() => {
		fetchData();
        fetchInventory();
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
                                <th>Status</th>
                                <th></th>
							</tr>
						</thead>
						<tbody>
							{appointmentsList?.map((appointment) => {
								return (
									<tr className="align-middle" key={appointment.id} value="appointment.id">
										<td>{appointment.vin}</td>
                                        <td>{vipStatus(appointment.vin)}</td>
                                        <td>{appointment.customer}</td>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.time}</td>
                                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                        <td>{appointment.reason}</td>
                                        <td>{appointment.status}</td>
                                        <td>
                                        <div className="btn-group m-0" role="group" aria-label="Basic mixed styles example">
  <Link to="#" onClick={() => statusCancel(appointment.id)}><button type="button" className="btn btn-outline-danger">Cancel</button></Link>&nbsp;&nbsp;
  <Link to="#" onClick={() => statusFinish(appointment.id)}><button type="button" className="btn btn-outline-success">Finish</button></Link>
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
