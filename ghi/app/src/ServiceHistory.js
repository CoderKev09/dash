import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function AppointmentsList() {
	const [appointmentsList, setAppointmentsList] = useState([]);
	const [vinList, setVinList] = useState([]);
	const [query, setQuery] = useState('');
	const [state, setState] = useState({
		query: '',
		list: appointmentsList,
	});

	const fetchData = async () => {
		const url = 'http://localhost:8080/api/service-history/';
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setAppointmentsList(data.appointments);
			setState({ query: '', list: data.appointments });
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
					vinArray.push(d.vin);
				}
			}
			setVinList(vinArray);
		}
	};

	const vipStatus = (v) => {
		if (vinList.includes(v)) {
			return 'Yes';
		} else {
			return 'No';
		}
	};

	const handleSubmit = (e) => {
        e.preventDefault();
		const results = appointmentsList.filter((appointment) => {
            return (appointment.vin.toLowerCase()).includes(query.toLowerCase());
		});
		setState({
			query: query,
			list: results,
		});
        setQuery('')
	};

    const handleChange = (e) => {
		setQuery(e.target.value);
		// const results = appointmentsList.filter((appointment) => {
		// 	if (e.target.value === '') return appointmentsList;
		// 	return appointment.vin
		// 		.toLowerCase()
		// 		.includes(e.target.value.toLowerCase());
		// });
		// setState({
		// 	query: e.target.value,
		// 	list: results,
		// });
	};

	useEffect(() => {
		fetchData();
		fetchInventory();
	}, []);

	return (
		<div className="row">
			<div className="offset-1 col-10">
				<div className="shadow p-3 m-4">
					<h1>Service History</h1>
					<div className="row gap-5 m-3">
						<form className="form-inline input-group" onSubmit={handleSubmit}>
							<div className="form-floating col-3">
								<input
									placeholder="Search by VIN"
									type="search"
									name="search"
									id="search"
									className="form-control"
									onChange={handleChange}
									value={query}
								/>
								<label htmlFor="name" className="col-form-label">
									Search by VIN
								</label>
							</div>
							<div className="input-group-append">
								&nbsp;&nbsp;
								<button className="btn btn-success align-middle">Search</button>
							</div>
						</form>
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
							</tr>
						</thead>
						<tbody>
                        {/* state.list.length == 0
								? 'Your search did not return any results'
								:  */}
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
												<td>{appointment.date}</td>
												<td>{appointment.time}</td>
												<td>
													{appointment.technician.first_name}{' '}
													{appointment.technician.last_name}
												</td>
												<td>{appointment.reason}</td>
												<td>{appointment.status}</td>
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
