import React from "react";
import '../assets/css/indexpage.css';
import Navigation from "../components/navigation";
import ProjectBanner from "../components/project-banner";
import {Link} from "react-router-dom";

import myProjects from "../Projects.json"

function ProjectList() {
    const listProject = myProjects.projects.map((project) =>
        <ProjectBanner
        name={project.name}
        description={project.description}
        projectId={project.id}
        />
    );
    return (
        listProject
    );
}

class IndexPage extends React.Component {

    render() {
        return(
            <div className="App">
                <header>
                    <Navigation />
                </header>
                <h1>Recently</h1>
                <div>
                    <Link to="/new-project"><button>New Project</button></Link>
                </div>
                <div className={"recent-projects"}>
                    <ProjectList />
                </div>
            </div>
        );
    }

}

export default IndexPage;