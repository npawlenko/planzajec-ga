import React, { Component } from "react";

class InputList extends Component {
    state = {
        data: []
    };

    constructor(props) {
        super(props);

        this.input = React.createRef();
        this.list = React.createRef();

        this.addHandler = this.addHandler.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.toJson = this.toJson.bind(this);
    }

    toJson() {
        return JSON.stringify(this.state.data);
    }

    addHandler(e) {
        e.preventDefault();

        const value = this.input.current.value;
        if(value.length < 1) //
            return;
        if(this.state.data.find(item => item === value) !== undefined) // already exists
            return;

        this.input.current.value = "";
        this.setState(prev => {
           return {
                ...prev,
               data: [...prev.data, value]
           }
        });
    }

    deleteHandler(e) {
        e.preventDefault();

        const id = e.target.dataset.id;
        if(id === undefined)
            return;

        let data = this.state.data;
        data.splice(id, 1);
        this.setState(prev => {
            return {
                ...prev,
                data: data
            }
        });
    }

    keyDownHandler(e) {
        if (e.key === 'Enter') {
           this.addHandler(e);
        }
    }

    //on input focus focus button

    render() {
        return <div className={"inputlist"}>
                <div className={"row gx-0 mb-4"}>
                    <input className={"form-control col-9"} type={this.props.type} name={this.props.name} id={this.props.name} onKeyDown={this.keyDownHandler} placeholder={this.props.placeholder} ref={this.input} data-exclude/>
                    <button type={"submit"} className={"btn btn-primary col-3 text-capitalize"} onClick={this.addHandler}>Dodaj</button>
                </div>

                <div className={"inputlist-list"} ref={this.list}>
                    <ul className={"row ps-0"}>
                        {
                            this.state.data.map((entry, index) => (
                                <li className={"inputlist-element col-4"} data-id={index} onClick={this.deleteHandler}>{entry}</li>
                            ))
                        }
                    </ul>

                    <input type={"hidden"} name={this.props.name} value={JSON.stringify(this.state.data)} data-json></input>
                </div>
            </div>;
    }
}

export default InputList;