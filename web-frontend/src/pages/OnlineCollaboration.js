import React, { useState } from "react";
import Navigation from "../components/navigation";

import "../assets/css/documentation.css";
import "../assets/css/elements.css"
import { backendUrl } from "../config";
import {Link, useParams} from "react-router-dom";
import MdEditor from "for-editor";
import Measurements from "../components/measurements";

function OnlineCollaboration() {

    let {projectId} = useParams();
    let url = "/projects/project_" + projectId;

    const [ description, setDescription ] = useState("");
    const [ experiment, setExperiment ] = useState("");
    const [ analysis, setAnalysis ] = useState("");
    const [ doc, setDoc ] = useState("__Fetching Documentation__ ...");
    const [ measurements, setMeasurements ] = useState([]);

    let getDocumentationFromServer = () => {
        let clearProjectId = projectId.replace(/-/g, "");
        fetch(backendUrl + "/project/" + clearProjectId + "/get-doc/")
            .then((response) => response.json())
            .then(json => {
                setDescription(json.description);
                setExperiment(json.analysis);
                setAnalysis(json.evaluation);

                setMeasurements(json.measurements);

                setDoc(
                    " # Description\n" + description +
                    "\n\n # Experiment\n" + experiment +
                    "\n\n # Evaluation\n" + analysis
                );
            });
    }

    getDocumentationFromServer();

    return (
        <div>
            <header>
                <Navigation/>
            </header>
            <Link to={url}>Back</Link>
            <div className={"documentation-content"}>
                <div className={"recent-changes"}>
                    <h2>Recent Changes:</h2>
                </div>
                <div className={"seperator"} />
                <Measurements
                    measurements={measurements}
                />
                <div className={"documentation-body"}>
                    <MdEditor
                        preview={ true }
                        language={ "en" }
                        value={ doc }
                        toolbar = {{
                            h1: false,
                            h2: false,
                            h3: false,
                            h4: false,
                            img: false,
                            link: false,
                            code: false,
                            preview: false,
                            expand: true,
                            undo: false,
                            redo: false,
                            save: false,
                            subfield: false,
                        }}
                    />
                </div>
            </div>
        </div>
    );

}

export default OnlineCollaboration;