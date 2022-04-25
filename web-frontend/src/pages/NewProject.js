import React from "react";
import Navigation from "../components/navigation";
import "../assets/css/project.css";

class NewProject extends React.Component {

    render() {
        return (
            <div>
                <header>
                    <Navigation/>
                </header>
                <div>
                    <h1>New Project</h1>
                    <form style={{margin: "20px"}} action="/" method="GET">
                        <input placeholder="Name of the Project" /> <br />
                        Describe the project: <br />
                        <textarea></textarea> <br /><br />
                        Add collaborators: <div className={"add-collaborators"}>+</div>
                        <button>Create Project</button>
                    </form>
                </div>
            </div>
        );
    }

}

export default NewProject;