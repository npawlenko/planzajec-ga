import React, { Component } from "react";

class Footer extends Component {
    render() {
        return <nav id="nav">
            <div className="container">
                <ul id="nav-content" className="text-center">
                    <li><a href="/#about">O projekcie</a></li>
                    <li><a href="/create">
                        <button className="btn btn-primary text-uppercase">Stwórz plan</button>
                    </a></li>
                    <li><a href="/#use">Jak korzystać</a></li>
                </ul>
            </div>
        </nav>
    }
}

export default Footer;
