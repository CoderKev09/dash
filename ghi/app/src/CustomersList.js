import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom"

function CustomersList() {
    const [customersList, setCustomersList] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8090/api/customers/"
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json()
            setCustomersList(data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className="row">
            <div>
                <div>
                    <Link to="new" className="btn btn_primary btn-sm">
                        <button type="button">Add a Customer</button>
                    </Link>
                </div>
                <div>
                    <h1>Customers</h1>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customersList.customers?.map((customer) => {
                            return(
                                <tr key={customer.id}>
                                    <td>{customer.first_name}</td>
                                    <td>{customer.last_name}</td>
                                    <td>{customer.phone_number}</td>
                                    <td>{customer.address}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomersList;
