import React from "react";

class TemplateBanner extends React.Component {

    render() {
        return (
            <div style={{borderBottom: "1px solid black"}}>
                <h1>{ this.props.name }</h1>
                { this.props.info }
            </div>
        );
    }

}

export default TemplateBanner;