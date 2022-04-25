import React from "react";
import '../assets/css/indexpage.css';
import Navigation from "../components/navigation";
import ProjectBanner from "../components/project-banner";
import {Link} from "react-router-dom";

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
                    <ProjectBanner
                        name="LTE-Advanced"
                        description="A measurement of the LTE-Advanced Standard"
                        projectId="1"
                    />
                    <ProjectBanner
                        name="USB Certification"
                        description="Certify the new Apple Air USB Stick."
                        projectId="2"
                    />
                </div>
            </div>
        );
    }

}

export default IndexPage;