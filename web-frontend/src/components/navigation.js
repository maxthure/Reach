import React from "react";
import {Link} from "react-router-dom";

class Navigation extends React.Component {

    render() {
        return (
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                    textAlign: "center"
                }}
            >
                <p>Username: Lorenzo von Matterhorn</p>
                <Link to="/somewhereelse">Somewhere else</Link> | {" "}
                <Link to="/profile">Profile</Link>
            </nav>
        );
    }

}

export default Navigation;