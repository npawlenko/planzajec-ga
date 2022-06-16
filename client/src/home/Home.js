import React, { Component } from "react";
import Navigation from "../Navigation";
import Slogan from "./Slogan";
import Footer from "../Footer";
import About from "./About";
import Usage from "./Usage";

class Home extends Component {
    render() {
        return [
            <header className={"page-header"}>
                <Navigation />
                <Slogan />
            </header>,
            <main>
                <About />
                <Usage />
            </main>,
            <Footer />
        ];
    }
}

export default Home;
