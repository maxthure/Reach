import React from "react";
import Navigation from "../components/navigation";

import "../assets/css/documentation.css";
import "../assets/css/elements.css"
import {Link, useParams} from "react-router-dom";

function OnlineCollaboration() {

    let { projectId } = useParams();

    let url = "/projects/project_" + projectId;
    return (
        <div>
            <header>
                <Navigation/>
            </header>
            <Link to={ url }>Back</Link>
            <div className={"documentation-content"}>
                <div className={"recent-changes"}>
                    <h2>Recent Changes:</h2>
                </div>
                <div className={"seperator"}/>
                <div className={"documentation"}>
                    <h1>Documentation</h1>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </div>
            </div>
        </div>
    );
}

export default OnlineCollaboration;