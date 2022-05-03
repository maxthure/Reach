import React, {useState} from "react";
import Navigation from "../components/navigation";

import { backendUrl } from "../config";
import "../assets/css/documentation.css";
import "../assets/css/elements.css"
import {Link, useParams} from "react-router-dom";

function Issue() {

    let { projectId, issueId } = useParams();
    const [ name, setName ] = useState("");
    const [ text, setText ] = useState("");
    const [ createdAt, setCreatedAt ] = useState("");

    let getIssueFromServer = fetch(backendUrl + "/issue/" + projectId + "/" + issueId)
        .then((response) => response.json())
        .then((json) => {
            setText(json.description);
            setName(json.name);
            setCreatedAt(json.created_at);
        })

    let url = "/projects/project_"+projectId;
    return (
        <div>
            <header>
                <Navigation/>
            </header>
            <Link to={url}>Back</Link>
            <div className={"Issue"}>
                <h1>{ name }</h1>
                { createdAt } <br /><br />
                { text }

            </div>
        </div>
    );
}

export default Issue;