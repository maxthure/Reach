import React, {useState} from "react";
import {useParams} from "react-router-dom";
import Navigation from "../components/navigation";
import {backendUrl} from "../config";

function Measurement() {

    let {projectId, measurementId} = useParams();

    let [previousDataSynced, setPreviousDataSynced] = useState(false);

    let [description, setDescription] = useState("");
    let [analysis, setAnalysis] = useState("");
    let [evaluation, setEvaluation] = useState("");
    let [screenshotPath, setScreenshotPath] = useState("");
    let [setupPath, setSetupPath] = useState("");
    let [rawDataPath, setRawDataPath] = useState("");
    let [dateTime, setDateTime] = useState("");
    let [temperature, setTemperature] = useState("");

    let [syncStatus, setSyncStatus] = useState("");

    let [changeDescription, setChangeDescription] = useState("");
    let [changeExperiment, setChangeExperiment] = useState("");
    let [changeEvaluation, setChangeEvaluation] = useState("");

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

            if (!previousDataSynced) {
                setChangeDescription(json.description);
                setChangeEvaluation(json.evaluation);
                setChangeExperiment(json.analysis);
                setPreviousDataSynced(true);
            }
        });

    getMeasurement();

    let updateMeasurement = (description, experiment, evaluation) => {
        let body = {
            "description": changeDescription,
            "analysis": changeExperiment,
            "evaluation": changeEvaluation
        }
        try {
            fetch(backendUrl + "/measurement/" + measurementId + "/update-meas/",
                {
                    method: "POST",
                    body: JSON.stringify(body)
                }).then(response => {
                setSyncStatus("Success")
            });
        } catch (e) {
            setSyncStatus("Failed")
        }
    }

    let screenshotUrl = backendUrl + "/measurement/" + measurementId + "/screenshot";
    console.log(screenshotUrl);

    return (
        <div>
            <header>
                <Navigation/>
            </header>
            <div>
                Description: {description} <br/>
                Experiment: {analysis} <br/>
                Evaluation: {evaluation} <br/>
                Screenshot Path: {screenshotPath} <br/>
                Setup Path: {setupPath} <br/>
                Raw Data Path: {rawDataPath} <br/>
                Date Time: {dateTime} <br/>
                Temperature: {temperature}
            </div>
            <figure>
                <img src={ screenshotUrl } />
            </figure>
            <div>
                <div>
                    {syncStatus}
                </div>
                <h4>Edit Measurement Info</h4>
                <input
                    value={changeDescription}
                    placeholder="Description"
                    onChange={(ev) => setChangeDescription(ev.target.value)}
                /> <br/>
                <input
                    value={changeExperiment}
                    placeholder="Experiment"
                    onChange={(ev) => setChangeExperiment(ev.target.value)}
                /> <br/>
                <input
                    value={changeEvaluation}
                    placeholder="Evaluation"
                    onChange={(ev) => setChangeEvaluation(ev.target.value)}
                /> <br/>
                <button onClick={(ev) => updateMeasurement()}>Send</button>
            </div>
        </div>

    );

}

export default Measurement;