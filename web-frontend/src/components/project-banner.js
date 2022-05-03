import React from "react";
import '../assets/css/project.css'
import {Link} from "react-router-dom";

class ProjectBanner extends React.Component {

    render() {
        let url = "/projects/project_" + this.props.projectId;

        return (
            <div className={"project"}>
                <b>Project Name:</b> <br /> { this.props.name } <br />
                <b>Project Description:</b> <br /> { this.props.info } <br />
                { this.props.createdAt }<br /> <br />
                <Link to={ url } className={"project-link"}>Go to Project</Link>
            </div>
        );
    }

}

export default ProjectBanner;