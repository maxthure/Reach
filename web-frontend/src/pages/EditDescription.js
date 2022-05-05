import React, { useState } from "react";
import Navigation from "../components/navigation";

import "../assets/css/documentation.css";
import "../assets/css/elements.css"
import { backendUrl } from "../config";
import {Link, useParams} from "react-router-dom";
import MdEditor from "for-editor";
import {Button} from "@mui/material";

function EditDescription() {

    let {projectId} = useParams();
    let url = "/projects/project_" + projectId;

    const [ description, setDescription ] = useState("");
    const [ experiment, setExperiment ] = useState("");
    const [ analysis, setAnalysis ] = useState("");
    const [ syncedWithServer, setSyncedWithServer ] = useState(false);
    const [ unsavedChanges, setUnsavedChanges ] = useState(false);

    let sendDocumentationToServer = () => {
        let data = "{\"description\": \"" + description + "\",\"analysis\": \"" + experiment + "\",\"evaluation\": \"" + analysis + "\"}";
        fetch(
            backendUrl + "/project/" + projectId + "/update-doc",
            {
                method: "POST",
                headers: {'Content-Type': 'text/plain'},
                body: data
            });
    }

    let getDocumentationFromServer = () => {
        let clearProjectId = projectId.replace(/-/g, "");
        fetch(backendUrl + "/project/" + clearProjectId + "/get-doc/")
            .then((response) => response.json())
            .then(json => {
                setDescription(json.description);
                setExperiment(json.analysis);
                setAnalysis(json.evaluation);
            });
    }

    if (!syncedWithServer) {
        getDocumentationFromServer();
        setSyncedWithServer(true);
    }

    let handleChangeDescription = (newValue) => {
        setDescription(newValue);
        setUnsavedChanges(true);
    }

    let save = () => {
        sendDocumentationToServer();
        setDescription(description);
        setUnsavedChanges(false);
    }

    let statusOfUnsavedChanges = () => {
        if (unsavedChanges) {
            return "Unsaved Changes ...";
        }
        return "Synced with Server";
    }

    return (
        <div>
            <header>
                <Navigation/>
            </header>
            <Link to={url}><Button variant="contained">Back</Button></Link>
            <div className={"documentation-content"}>
                <div className={"recent-changes"}>
                    <h2>Recent Changes:</h2>
                </div>
                <div className={"seperator"}/>
                <div>
                    { statusOfUnsavedChanges() }
                </div>
                <div id="documentation-body">
                    <h1>Description</h1>
                    <MdEditor
                        value={description}
                        language={"en"}
                        onChange={(val) => handleChangeDescription(val)}
                        onSave={() => save()}
                    />
                </div>
            </div>
        </div>
    );

}

export default EditDescription;