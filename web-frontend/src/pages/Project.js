import React from "react";
import Navigation from "../components/navigation";
import { Link } from "react-router-dom";

import myIssues from "../Issues.json"

function IssueList() {
    const listIssues = myIssues.issues.map((issue) =>
        <div key={issue.id}>
            <Link to={"issue_"+issue.id}>{issue.name}</Link>
        </div>
    );
    return (
        listIssues
    );
}

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

                    <IssueList />
                </div>
            </div>
        );
    }

}

export default Project;