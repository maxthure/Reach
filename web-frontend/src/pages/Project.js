import React, {useState} from "react";
import Navigation from "../components/navigation";
import {Link, useParams} from "react-router-dom";
import { backendUrl } from "../config";
import {Button} from "@mui/material";

function Project() {

    const [ issues, setIssues ] = useState([]);
    const [ name, setName ] = useState("");
    const [ desciption, setDescription ] = useState("");
    const [ createdAt, setCreatedAt ] = useState("");
    const [ info, setInfo ] = useState("")

    const fetchProject = async (projectId) => {
        fetch(backendUrl + "/project/" + projectId)
            .then(response => response.json())
            .then(json => {
                setIssues(json.issues);
                setName(json.name);
                setDescription(json.description);
                setCreatedAt(json.created_at);
                setInfo(json.info)
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
                    <Button>Export Template</Button>
                </Link><br/><br/>

                <h1>{ name }</h1>
                <Link to="documentation"><Button>Documentation</Button></Link> <br/><br/>
                <Link to="edit-description"><Button>Edit Description</Button></Link>
                <Link to="edit-experiment"><Button>Edit Experiment Setup</Button></Link>
                <Link to="edit-evaluation"><Button>Edit Evaluation</Button></Link>
                <br />
                <br />
                { createdAt } <br /> <br />
                Description: { desciption } <br/>
                Info: { info } <br/>
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