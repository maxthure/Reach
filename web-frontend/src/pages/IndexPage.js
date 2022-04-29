import React from "react";
import '../assets/css/indexpage.css';
import Navigation from "../components/navigation";
import ProjectBanner from "../components/project-banner";
import {Link} from "react-router-dom";
import { backendUrl } from "../config";


class ProjectList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectList: []
        };
    }

    addProject(project) {
        this.state.projectList.push({
            name: project.name,
            description: project.description,
            id: project.id
        })
        this.forceUpdate()
    }

    componentDidMount() {
        this.fetchProjects()
    }

    fetchProjects = async () => {
        await fetch(backendUrl + '/testprojects/project1')
            .then(response => response.json())
            .then(json => {
                for (let p of json.recent_projects) {
                    this.addProject(p);
                }
            })
    }

    render() {
        return (
            <div className={"recent-projects"}>
                { this.state.projectList.map(p =>
                    <ProjectBanner
                        name={p.name}
                        description={p.description}
                        projectId={p.id}
                        key={p.id}
                    />
                )}
            </div>
        )
    }

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
                <ProjectList />
            </div>
        );
    }

}

export default IndexPage;