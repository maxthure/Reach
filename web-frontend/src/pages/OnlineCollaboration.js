import React, { useState } from "react";
import Navigation from "../components/navigation";

import "../assets/css/documentation.css";
import "../assets/css/elements.css"
import { backendUrl } from "../config";
import {Link, useParams} from "react-router-dom";
import MdEditor from "for-editor";

function OnlineCollaboration() {

    let {projectId} = useParams();
    let url = "/projects/project_" + projectId;

    const [ mdText, setMdText ] = useState("");
    const [ syncedWithServer, setSyncedWithServer ] = useState(false);
    const [ unsavedChanges, setUnsavedChanges ] = useState(false);

    let sendDocumentationToServer = (docText) => {
        fetch(
            backendUrl + "/project/" + projectId + "/update-doc/",
            {
                method: "POST",
                headers: {'Content-Type': 'text/plain'},
                body: docText
            });
    }

    let getDocumentationFromServer = () => {
        fetch(backendUrl + "/project/" + projectId + "/get-doc/")
            .then((response) => response.text())
            .then((text => setMdText(text)));
    }

    if (!syncedWithServer) {
        getDocumentationFromServer();
        setSyncedWithServer(true);
    }

    let handleChange = (newValue) => {
        setMdText(newValue);
        setUnsavedChanges(true);
    }

    let saveChanges = () => {
        sendDocumentationToServer(mdText);
        setMdText(mdText);
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
            <Link to={url}>Back</Link>
            <div className={"documentation-content"}>
                <div className={"recent-changes"}>
                    <h2>Recent Changes:</h2>
                </div>
                <div className={"seperator"}/>
                <div>
                    { statusOfUnsavedChanges() }
                </div>
                <div id="documentation-body">
                    <MdEditor
                        value={mdText}
                        language={"en"}
                        onChange={(val) => handleChange(val)}
                        onSave={() => saveChanges()}
                    />
                </div>
            </div>
        </div>
    );

}

export default OnlineCollaboration;