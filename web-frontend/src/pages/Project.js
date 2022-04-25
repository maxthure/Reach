import React from "react";
import Navigation from "../components/navigation";
import { Link } from "react-router-dom";

class Project extends React.Component {

    render() {
        return (
            <div>
                <header>
                    <Navigation />
                </header>
                <div>
                    <Link to="/templates">
                        <button>Export Template</button>
                    </Link><br /><br />

                    <h1>LTE-Advanced</h1>
                    <Link to="documentation">Documentation</Link> <br />
                    Info: The measurement of the LTE-Advanced Standard <br />
                    Issues: <br />

                    <Link to="issue">Issue 1</Link> <br />
                    <Link to="issue">Issue 2</Link> <br />
                    <Link to="issue">Issue 3</Link> <br />
                    <Link to="issue">Issue 4</Link> <br />
                    <Link to="issue">Issue 5</Link> <br />
                    <Link to="issue">Issue 6</Link> <br />
                    <Link to="issue">Issue 7</Link> <br />

                </div>
            </div>
        );
    }

}

export default Project;