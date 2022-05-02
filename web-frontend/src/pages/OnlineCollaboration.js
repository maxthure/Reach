import React, {useEffect, useState} from "react";
import Navigation from "../components/navigation";

import "../assets/css/documentation.css";
import "../assets/css/elements.css"
import {Link, useParams} from "react-router-dom";
import MdEditor from "for-editor";

function OnlineCollaboration() {

    const [ mdText, setMdText ] = useState("");

    let {projectId} = useParams();
    let url = "/projects/project_" + projectId;

    let handleChange = (newValue) => {
        setMdText(newValue);
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
                <div id="documentation-body">
                    <MdEditor
                        value={mdText}
                        language={"en"}
                        onChange={(val) => handleChange(val)}
                    />
                </div>
            </div>
        </div>
    );

}

export default OnlineCollaboration;