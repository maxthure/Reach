import React, {useState} from "react";
import {useParams} from "react-router-dom";
import Navigation from "../components/navigation";
import {backendUrl} from "../config";

function Measurement() {

    let { projectId, measurementId } = useParams();


    let [ description, setDescription ] = useState("");
    let [ analysis, setAnalysis ] = useState("");
    let [ evaluation, setEvaluation ] = useState("");
    let [ screenshotPath, setScreenshotPath ] = useState("");
    let [ setupPath, setSetupPath ] = useState("");
    let [ rawDataPath, setRawDataPath ] = useState("");
    let [ dateTime, setDateTime ] = useState("");
    let [ temperature, setTemperature ] = useState("");

    let getMeasurement = () => fetch(backendUrl + "/measurement/" + measurementId + "/get-meas")
        .then(response => response.json())
        .then(json => {
            setDescription(json.description);
            setAnalysis(json.analysis);
            setEvaluation(json.evaluation);
            setScreenshotPath(json.screenshot_path);
            setSetupPath(json.setup_path);
            setRawDataPath(json.raw_data_path);
            setDateTime(json.date_time);
            setTemperature(json.temperature);
        });

    getMeasurement();

    return (
        <div>
            <header>
                <Navigation />
            </header>
            <div>
                Description: { description } <br />
                Analysis: { analysis } <br />
                Evaluation: { evaluation } <br />
                Screenshot Path: { screenshotPath } <br />
                Setup Path: { setupPath }
                Raw Data Path: { rawDataPath }
                Date Time: { dateTime }
                Temperature: { temperature }
            </div>
        </div>

    );

}

export default Measurement;