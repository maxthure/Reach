import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

class ProjectBanner extends React.Component {

    render() {
        let url = "/projects/project_" + this.props.projectId;

        return (
            <div className={"project"}>
                <b>Project Name:</b> <br /> { this.props.name } <br />
                <b>Project Description:</b> <br /> { this.props.info } <br />
                { this.props.createdAt }<br /> <br />
                <Link to={ url } className={"project-link"}><Button variant="contained">Go to Project</Button></Link>
            </div>
        );
    }

}

export default ProjectBanner;