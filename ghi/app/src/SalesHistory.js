import React, {useState, useEffect} from 'react';



function SalesHistory() {
    const [salesPerson, setSalesperson] = useState('')
    const handleSalespersonChange = event => {
        const value = event.target.value
        setSalesperson(value)
    }

    const [sales, setSales] = useState([]);
    const [salesPeople, setSalespeople] = useState([])
    const fetchData = async () => {
        const salesUrl = "http://localhost:8090/api/sales/";
        const salesResponse = await fetch(salesUrl);
        if(salesResponse.ok) {
            const data = await salesResponse.json();
            setSales(data.sales)
        }

        const salespeopleUrl = "http://localhost:8090/api/salespeople/";
        const salespeopleResponse = await fetch(salespeopleUrl);
        if(salespeopleResponse.ok) {
            const data = await salespeopleResponse.json();
            setSalespeople(data.salespeople)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const salespersonChoice = sales.filter((sale) => sale.salesperson.employee_id === salesPerson)

    return(
        <div className="row">
            <div>
                <div>
                    <h1>Salesperson History</h1>
                </div>
                <div className="mb-3">
                        <select
                        onChange={handleSalespersonChange}
                        required
                        name="salesperson"
                        id="salesperson"
                        className="form-select">
                            <option value="">Choose an salesperson</option>
                            {salesPeople.map((salesperson) => {
                                return(
                                        <option key={salesperson.employee_id} value={salesperson.employee_id}>
                                            {salesperson.first_name} {salesperson.last_name}
                                        </option>
                                    )
                                })}
                        </select>
                    </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salespersonChoice.map(sale => {
                            return(
                                <tr key={sale.id}>
                                    <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>{sale.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalesHistory;
