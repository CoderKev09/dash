import React, {useState, useEffect} from 'react';
import{Link} from 'react-router-dom';

function ModelsList() {
    const [modelList, setModelList] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8100/api/models/"
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json()
            setModelList(data);
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
                        <button type="button">Create a vehicle model</button>
                    </Link>
                </div>
                <div>
                    <h1>Models</h1>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Manufacturer</th>
                            <th>Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modelList.models?.map((model) => {
                            return(
                                <tr key={model.id}>
                                    <td>{model.name}</td>
                                    <td>{model.manufacturer.name}</td>
                                    <td><img className="carpic" src={model.picture_url}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModelsList
