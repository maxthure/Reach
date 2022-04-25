import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import Project from "../pages/Project";
import Templates from "../pages/Templates";
import NewProject from "../pages/NewProject";
import OnlineCollaboration from "../pages/OnlineCollaboration";
import Issue from "../pages/Issue";

class AppRouter extends React.Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<IndexPage />} />
                        <Route path="/projects/project_:projectId" element={<Project />} />
                        <Route path="/projects/project_:projectId/documentation" element={<OnlineCollaboration />} />
                        <Route path="/projects/project_:projectId/issue_:issueId" element={<Issue />} />
                        <Route path="/templates" element={<Templates />} />
                        <Route path="/new-project" element={<NewProject />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }

}

export default AppRouter;