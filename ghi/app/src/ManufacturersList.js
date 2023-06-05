import React, {useState, useEffect} from 'react';
import{Link} from 'react-router-dom';

function ManufacturerList() {
    const [manufacturerList, setManufacturerList] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json()
            setManufacturerList(data);
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
                        <button type="button">Add a new manufacturer</button>
                    </Link>
                </div>
                <div>
                    <h1>Manufacturers</h1>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manufacturerList.manufacturers?.map((manufacturer) => {
                            return(
                                <tr>
                                    <td>{manufacturer.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManufacturerList
