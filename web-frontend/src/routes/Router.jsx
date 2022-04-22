import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import Project from "../pages/Project";

class AppRouter extends React.Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<IndexPage />} />
                        <Route path="/lte-advanced" element={<Project />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }

}

export default AppRouter;