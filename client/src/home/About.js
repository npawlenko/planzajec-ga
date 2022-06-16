import React, { Component } from "react";

class About extends Component {
    render() {
        return <div id="about">
            <div className="container">
                <h1 className="text-center pb-5">
                    O projekcie
                </h1>

                <div className="row align-items-center mt-5">
                    <div className="col-12 col-lg-6">
                        <img src="assets/img/ai.png" alt={"Artificial intelligence"} className={"w-100"}/>
                    </div>

                    <div className="col-12 col-lg-6 mt-5 mt-lg-0">
                        <p className="text-uh">
                            Aplikacja do układania optymalnych planów lekcji stosuje
                            narzędzie sztucznej inteligencji - algorytm genetyczny.<br/><br/>

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dui neque, convallis a
                            iaculis et, commodo eu est. Nunc viverra eleifend felis. Phasellus sem nisl, tempor et
                            tristique et, euismod a tortor. Integer gravida augue justo, et tincidunt eros gravida in.
                            Proin vel lorem eu enim imperdiet fringilla nec in ex.
                        </p>
                    </div>
                </div>
            </div>

            <div className="wave wave-bottom"></div>
        </div>;
    }
}

export default About;
