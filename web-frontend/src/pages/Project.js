import React, {useState} from "react";
import Navigation from "../components/navigation";
import {Link, useParams} from "react-router-dom";
import { backendUrl } from "../config";

function Project() {

    const [ issues, setIssues ] = useState([]);

    const fetchProject = async (projectId) => {
        fetch(backendUrl + "/testprojects/project" + projectId)
            .then(response => response.json())
            .then(json => {
                for (let p of json.recent_projects) {
                    if (p.id === projectId) {
                        setIssues(p.issues);
                    }
                }
            })
    }

    let { projectId } = useParams();
    fetchProject(projectId);

    return (
        <div>
            <header>
                <Navigation/>
            </header>
            <div>
                <Link to="/templates">
                    <button>Export Template</button>
                </Link><br/><br/>

                <h1>LTE-Advanced</h1>
                <Link to="documentation">Documentation</Link> <br/><br/>
                Info: The measurement of the LTE-Advanced Standard <br/>
                Issues: <br/>

                <div>
                    { issues.map((issue) => {
                        return (
                            <div key={issue.id}>
                                <Link to={"issue_" + issue.id}>{issue.name}</Link>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}

export default Project;