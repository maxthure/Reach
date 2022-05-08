import React, { useState } from "react";

import Navigation from "../components/navigation";
import Measurements from "../components/measurements";
import {backendUrl} from "../config";
import {Link, useParams} from "react-router-dom";

function MeasurementPage() {

    let {projectId} = useParams();
    let url = "/projects/project_" + projectId;

    const [ measurements, setMeasurements ] = useState([]);

    let getDocumentationFromServer = () => {
        let clearProjectId = projectId.replace(/-/g, "");
        fetch(backendUrl + "/project/" + clearProjectId + "/get-doc/")
            .then((response) => response.json())
            .then(json => {
                setMeasurements(json.measurements);
            });
    }

    getDocumentationFromServer();

    return (
        <div>
            <header>
                <Navigation />
            </header>
            <Link to={url}>Back</Link>
            <div>
                <Measurements
                    measurements={measurements}
                />
            </div>
        </div>
    );

}

export default MeasurementPage;