import React, {useState, useEffect} from 'react';

function createSuccess() {
	return `<div class="alert alert-success" role="alert">New technician successfully added!</div>`;
}

function TechnicianForm() {
        const [formData, setFormData] = useState({
            firstName: '',
            lastName: '',
            employeeId: '',
        });

        const handleFormDataChange = async (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setFormData({ ...formData, [name]: value });
        };

        const handleCreate = async (e) => {
            e.preventDefault();

            const data = {};
            data.first_name = formData.firstName;
            data.last_name = formData.lastName;
            data.employee_id = formData.employeeId;

            const techniciansUrl = "http://localhost:8080/api/technicians/";
            const fetchConfig = {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await fetch(techniciansUrl, fetchConfig);
            if (response.ok) {
                const success = document.getElementById('submitted');
                success.innerHTML = createSuccess();
                setFormData({
                    firstName: '',
                    lastName: '',
                    employeeId: '',
                });
            }
        };

        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a Technician</h1>
                        <form id="create-technician-form" onSubmit={handleCreate}>
                            <div className="form-floating mb-3">
                                <input
                                    placeholder="First Name"
                                    required
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className="form-control"
                                    onChange={handleFormDataChange}
                                    value={formData.firstName}
                                />
                                <label htmlFor="name">First Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    placeholder="Last Name"
                                    required
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    className="form-control"
                                    onChange={handleFormDataChange}
                                    value={formData.lastName}
                                />
                                <label htmlFor="name">Last Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    placeholder="Employee ID"
                                    required
                                    type="text"
                                    name="employeeId"
                                    id="employeeId"
                                    className="form-control"
                                    onChange={handleFormDataChange}
                                    value={formData.employeeId}
                                />
                                <label htmlFor="name">Employee ID</label>
                            </div>
                            <div id="submitted"></div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
}

export default TechnicianForm;