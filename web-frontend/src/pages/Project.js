import React, {useState} from "react";
import Navigation from "../components/navigation";
import {Link, useParams} from "react-router-dom";
import { backendUrl } from "../config";

function Project() {

    const [ issues, setIssues ] = useState([]);
    const [ name, setName ] = useState("");
    const [ desciption, setDescription ] = useState("");
    const [ createdAt, setCreatedAt ] = useState("");

    const fetchProject = async (projectId) => {
        fetch(backendUrl + "/project/" + projectId)
            .then(response => response.json())
            .then(json => {
                setIssues(json.issues);
                setName(json.name);
                setDescription(json.description);
                setCreatedAt(json.created_at)
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

                <h1>{ name }</h1>
                <Link to="documentation">Documentation</Link> <br/><br/>
                { createdAt } <br /> <br />
                { desciption }<br/>
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