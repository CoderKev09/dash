import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom"

function SalespeopleList() {
    const [salespeopleList, setSalesPeopleList] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8090/api/salespeople/"
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json()
            setSalesPeopleList(data);
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
                        <button type="button">Add a salesperson</button>
                    </Link>
                </div>
                <div>
                    <h1>Salespeople</h1>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salespeopleList.salespeople?.map((salesperson) => {
                            return(
                                <tr key={salesperson.employee_id}>
                                    <td>{salesperson.employee_id}</td>
                                    <td>{salesperson.first_name}</td>
                                    <td>{salesperson.last_name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );


}

export default SalespeopleList;
