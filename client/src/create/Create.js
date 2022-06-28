import React, {Component} from "react";
import Navigation from "../Navigation";
import Footer from "../Footer";
import FormSection from "./FormSection";
import InputList from "./InputList";
import TimeRangeList from "./TimeRangeList";
import Alert from "../Alert";

class Create extends Component {
    constructor(props) {
        super(props);

        this.form = React.createRef();
        this.alert = React.createRef();
        this.submitHandler = this.submitHandler.bind(this);
    }

    async submitHandler(e) {
        e.preventDefault();

        let data = {};

        const elements = this.form.current.elements;
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            if (el.dataset.exclude !== undefined)
                continue;
            if (el.name === "")
                continue;

            if (el.dataset.json !== undefined)
                data[el.name] = JSON.parse(el.value);
            else
                data[el.name] = el.value;
        }


        await this.postData(e.target.action, data)
            .then(response => response.json())
            .then(data => {
                console.log(`Received response: ${JSON.stringify(data)}`);

                if (!data.status) {
                    this.alert.current.content = `Wystąpił błąd podczas generowania rozkładu zajęć: ${data.error}`;
                    this.alert.current.type = Alert.Type.Fail;
                    this.alert.current.visible = true;
                } else {
                    setTimeout(() => {
                        window.open(data.url, '_blank')
                    }, 1500);
                    window.location.reload();
                }
            })
            .catch(err => {
                if(err !== undefined) {
                    console.error(`Could not fetch: ${err}`);
                    this.alert.current.content = `Nie można połączyć się z serwerem. Spróbuj ponownie później.`;
                    this.alert.current.type = Alert.Type.Fail;
                    this.alert.current.visible = true;
                }
            });
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

        console.log(`Sending request to ${url}, body: ${JSON.stringify(data)}`);
        return await fetch(url, options);
    }


    render() {
        return [
            <Alert ref={this.alert}/>,
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
                            </div>

                            <div className={"col-12 col-lg-6"}>
                                <FormSection name={"Godziny zajęć"}>
                                    <TimeRangeList name={"time"}></TimeRangeList>
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

                        <div className={"row"}>
                            <div className={"col-12 col-lg-6"}>
                                <FormSection name={"Przedmioty"}>
                                    <InputList name={"subjects"} type={"text"} placeholder={"Dodaj przedmiot"} />
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