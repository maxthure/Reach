import React from "react";
import TemplateBanner from "../components/template-banner";
import Navigation from "../components/navigation";

class Templates extends React.Component {

    render() {
        return (
            <div>
                <header>
                    <Navigation />
                </header>
                <div>
                    <TemplateBanner
                        name="LTE-Advanced"
                        info="Standard Template for Measurement in LTE-related projects."
                    />
                    <TemplateBanner
                        name="USB Certification"
                        info="Central Standard Template for USB Certification."
                    />
                    <TemplateBanner
                        name="AirPods Functionality Check"
                        info="Check correct functionality of AirPods in a RF chamber."
                    />
                </div>
            </div>
        );
    }

}

export default Templates;