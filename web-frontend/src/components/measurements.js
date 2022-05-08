import React from "react";
import {Link} from "react-router-dom";

import {prettifyDate} from "../config";

function measurements(props) {

    console.log(props.measurements);

    let generateMeasurementTable = () => {
        return (
            <table>
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Temperature</th>
                    <th>Screenshot</th>
                    <th>awd</th>
                </tr>
                </thead>
                <tbody>
                {props.measurements.map((m) => (
                    <tr>
                        <td>{m.description}</td>
                        <td>{prettifyDate(m.date_time)}</td>
                        <td>{m.temperature}</td>
                        <td>More</td>
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

export default measurements;