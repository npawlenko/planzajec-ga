import React, {Component} from "react";
import Navigation from "../Navigation";
import Footer from "../Footer";
import FormSection from "./FormSection";
import InputList from "./InputList";

class Create extends Component {
    constructor(props) {
        super(props);

        this.form = React.createRef();
        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(e) {
        e.preventDefault();

        let data = {};

        const elements = this.form.current.elements;
        for(let i=0; i<elements.length; i++) {
            const el = elements[i];
            if(el.dataset.exclude !== undefined)
                continue;


            if(el.dataset.json !== undefined)
                data[el.name] = JSON.parse(el.value);
            else
                data[el.name] = el.value;
        }

        const response = this.postData(e.target.action, data);

        //TODO: display response
    }

    async postData(url = "", data = {}) {
        const options = {
            mode: "cors",
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const rawResponse = await fetch(url, options);
        return await rawResponse.json();
    }


    render() {
        return [
            <header>
                <Navigation />
            </header>,
            <main className={"page-main"}>
                <div className={"container"}>
                    <form method={"post"} action={"http://localhost:8080/generate"} onSubmit={this.submitHandler} ref={this.form}>
                        <div className={"row"}>
                            <div className={"col-12 col-lg-6"}>
                                <FormSection name={"Dni robocze"}>
                                    <label className={"me-3"} htmlFor={"dayStart"}>Od</label>
                                    <select className={"form-control d-inline-block mb-2"} id={"dayStart"} name={"dayStart"} defaultValue={"mon"}>
                                        <option value={"mon"}>Poniedziałek</option>
                                        <option value={"tue"}>Wtorek</option>
                                        <option value={"wed"}>Środa</option>
                                        <option value={"thu"}>Czwartek</option>
                                        <option value={"fri"}>Piątek</option>
                                        <option value={"sat"}>Sobota</option>
                                        <option value={"sun"}>Niedziela</option>
                                    </select>

                                    <br/>

                                    <label className={"me-3"} htmlFor={"dayEnd"}>Do</label>
                                    <select className={"form-control d-inline-block mb-5"} id={"dayEnd"} name={"dayEnd"} defaultValue={"fri"}>
                                        <option value={"mon"}>Poniedziałek</option>
                                        <option value={"tue"}>Wtorek</option>
                                        <option value={"wed"}>Środa</option>
                                        <option value={"thu"}>Czwartek</option>
                                        <option value={"fri"}>Piątek</option>
                                        <option value={"sat"}>Sobota</option>
                                        <option value={"sun"}>Niedziela</option>
                                    </select>
                                </FormSection>

                                <FormSection name={"Godziny zajęć"}>

                                </FormSection>
                            </div>

                            <div className={"col-12 col-lg-6"}>
                                <FormSection name={"Przedmioty"}>
                                    <InputList name={"subjects"} type={"text"} placeholder={"Dodaj przedmiot"} />
                                </FormSection>
                            </div>
                        </div>

                        <div className={"row"}>
                            <div className={"col-12 col-lg-6"}>
                                <FormSection name={"Grupy zajęciowe"}>
                                    <InputList name={"groups"} type={"text"} placeholder={"Dodaj grupę zajęciową"} />
                                </FormSection>
                            </div>

                            <div className={"col-12 col-lg-6"}>
                                <FormSection name={"Nauczyciele"}>
                                    <InputList name={"teachers"} type={"text"} placeholder={"Dodaj nauczyciela"} />
                                </FormSection>
                            </div>
                        </div>

                        <button className={"btn btn-primary mx-auto d-block"} type={"submit"} data-exclude>Generuj plan</button>
                    </form>
                </div>
            </main>,
            <Footer />
        ];
    }
}

export default Create;