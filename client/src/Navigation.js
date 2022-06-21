import React, { Component } from "react";

class Footer extends Component {
    render() {
        const listItems = [
            {
                content: "O projekcie",
                href: "/#about"
            },
            {
                content: <button className="btn btn-primary text-uppercase">Stwórz plan</button>,
                href: "/create"
            },
            {
                content: "Jak korzystać",
                href: "/#use"
            }
        ];

        return <nav id="nav">
            <div className="container">
                <ul id="nav-content" className="text-center">
                    {
                        listItems.map((entry, index) => (
                            <li><a href={entry.href}>{entry.content}</a></li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    }
}

export default Footer;
