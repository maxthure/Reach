import React from "react";
import Navigation from "../components/navigation";
import "../assets/css/project.css";
import { backendUrl } from "../config";

class NewProject extends React.Component {

    render() {
        let url = backendUrl + "/new-project/"

        return (
            <div>
                <header>
                    <Navigation/>
                </header>
                <div>
                    <h1>New Project</h1>
                    <form style={{margin: "20px"}} action={ url } method="POST">
                        <input placeholder="Name of the Project" name="project-name" required /> <br />
                        Describe the project: <br />
                        <textarea name="project-info"></textarea> <br /><br />
                        Add collaborators: <div className={"add-collaborators"}>+</div>
                        <button>Create Project</button>
                    </form>
                </div>
            </div>
        );
    }

}

export default NewProject;