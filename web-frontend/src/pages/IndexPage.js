import React from "react";
import '../assets/css/indexpage.css';
import Navigation from "../components/navigation";
import ProjectBanner from "../components/project-banner";

class IndexPage extends React.Component {

    render() {
        return(
            <div className="App">
                <header>
                    <Navigation />
                </header>
                <h1>Recently</h1>
                <div className={"recent-projects"}>
                    <ProjectBanner
                        name="LTE-Advanced"
                        description="A measurement of the LTE-Advanced Standard"
                    />
                    <ProjectBanner
                        name="USB Certification"
                        description="Certify the new Apple Air USB Stick."
                    />
                </div>
            </div>
        );
    }

}

export default IndexPage;