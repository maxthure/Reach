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
            info: project.info,
            created_at: project.created_at,
            id: project.id
        })
        this.forceUpdate()
    }

    componentDidMount() {
        this.fetchProjects()
    }

    fetchProjects = async () => {
        await fetch(backendUrl + '/index')
            .then(response => response.json())
            .then(json => {
                for (let p of json) {
                    this.addProject(p);
                }
            })
    }

    prettifyDate = (uglyDate) => {
        let date = uglyDate.substr(0, 10);
        let year = date.substr(0, 4);
        let month = date.substr(5, 2);
        let day = date.substr(8, 2);
        return day + "." + month + "." + year;
    }

    render() {
        return (
            <div className={"recent-projects"}>
                { this.state.projectList.map(p =>
                    <ProjectBanner
                        name={p.name}
                        info={p.info}
                        projectId={p.id}
                        key={p.id}
                        createdAt={this.prettifyDate(p.created_at)}
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