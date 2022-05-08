import React from "react";

import {backendUrl, prettifyDate} from "../config";
import {Link, useParams} from "react-router-dom";

function Measurements(props) {

    let { projectId } = useParams();

    let generateMeasurementTable = () => {
        return (
            <table>
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Temperature</th>
                    <th>Screenshot</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {props.measurements.map((m) => (
                    <tr>
                        <td>{m.description}</td>
                        <td>{prettifyDate(m.date_time)}</td>
                        <td>{m.temperature}</td>
                        <td>{m.screenshot_path}</td>
                        <td><Link to={"/projects/project_" + projectId + "/measurements/" + m.id}>More</Link></td>
                    </tr>
                ))}
                </tbody>
            </table>);
    }

    return (
        <div>
            {generateMeasurementTable()}
        </div>
    );

}

export default Measurements;