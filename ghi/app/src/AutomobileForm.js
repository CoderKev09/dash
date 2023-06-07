import React, { useState, useEffect } from 'react';

function AutomobileForm() {
	const [models, setModels] = useState([]);
	const [formData, setFormData] = useState({
		color: '',
		year: '',
		vin: '',
		model: '',
	});

	const fetchData = async () => {
		const url = 'http://localhost:8100/api/models/';
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setModels(data.models);
		}
	};

	const handleChange = async (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};
		data.color = formData.color;
		data.year = formData.year;
		data.vin = formData.vin;
		data.model_id = parseInt(formData.model);

		const hatsUrl = 'http://localhost:8100/api/automobiles/';
		const fetchConfig = {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const createSuccess = () => {
			return `<div class="alert alert-success" role="alert">New automobile successfully added!</div>`;
		};

		const response = await fetch(hatsUrl, fetchConfig);
		if (response.ok) {
			const success = document.getElementById('submitted');
			success.innerHTML = createSuccess();
			setFormData({
				color: '',
				year: '',
				vin: '',
				model: '',
			});
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Add a new automobile</h1>
					<form id="create-automobile-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input
								placeholder="Color"
								required
								type="text"
								name="color"
								id="color"
								className="form-control"
								onChange={handleChange}
								value={formData.color}
							/>
							<label htmlFor="name">Color</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Year"
								required
								type="number"
								name="year"
								id="year"
								className="form-control"
								onChange={handleChange}
								value={formData.year}
							/>
							<label htmlFor="name">Year</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="VIN"
								required
								type="text"
								name="vin"
								id="vin"
								className="form-control"
								onChange={handleChange}
								value={formData.vin}
							/>
							<label htmlFor="name">VIN</label>
						</div>
						<div className="mb-3">
							<select
								required
								id="model"
								name="model"
								className="form-select"
								onChange={handleChange}
							>
								<option value=''>Select the model</option>
								{models.map((model) => {
									return (
										<option key={model.id} value={model.id}>
											{model.manufacturer.name} {model.name}
										</option>
									);
								})}
							</select>
						</div>
						<div id="submitted"></div>
						<button className="btn btn-success">Add</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AutomobileForm;
