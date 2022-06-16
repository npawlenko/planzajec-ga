import React, { Component } from "react";

class Slogan extends Component {
    render() {
        return [<div id="slogan" className="mt-5">
                <div className="container">
                    <div className="row align-items-center abs-center-y">
                        <div className="col-12 col-lg-6">
                            <h1 className="text-nowrap">
                                Narzędzie online do generowania<br/>
                                <span className="color-primary">planów zajęć</span>
                            </h1>
                            <p className="mt-3 fs-4">
                                Ułóż plan lekcji szybko i optymalnie bez rejestracji i
                                instalacji dodatkowego oprogramowania.<br/>

                                Zacznij korzystać już teraz!
                            </p>

                            <a href="create" className={"d-block"}>
                                <button className="btn btn-primary text-uppercase fs-5 px-5 py-2 mt-4 mt-lg-2">Stwórz plan
                                </button>
                            </a>
                        </div>

                        <div className="col-12 col-lg-6 text-center text-lg-end mt-5">
                            <img src="assets/img/calendar.png" alt={"Calendar"}/>
                        </div>
                    </div>
                </div>
            </div>,
            <div className="wave wave-top"></div>];
    }
}

export default Slogan;
