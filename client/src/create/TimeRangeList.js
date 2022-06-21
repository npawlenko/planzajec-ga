import React, { Component } from "react";
import Time from "../utils/Time";
import TimeRange from "../utils/TimeRange";

class TimeRangeList extends Component {
    state = {
        data: []
    };

    constructor(props) {
        super(props);

        this.start = React.createRef();
        this.end = React.createRef();
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

        const start = new Time(this.start.current.value);
        const end = new Time(this.end.current.value);

        if(!start.isValid() && !end.isValid())
            return; // not valid time
        if(start.getDate() > end.getDate())
            return; // end time is earlier than start time

        const timeRange = new TimeRange(start, end);
        if(this.state.data.find(item => timeRange.overlaps(item, true)) !== undefined) // already exists or overlaps
            return; // range overlaps other range


        this.start.current.value = "";
        this.end.current.value = "";
        this.setState(prev => {
            return {
                ...prev,
                data: [...prev.data, timeRange]
            }
        });
    }

    deleteHandler(e) {
        e.preventDefault();

        const id = parseInt(e.target.dataset.id);
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
            <div className={"mb-4"}>
                <div className={"position-relative"}>
                    <div className={"col-12"}>
                        <label className={"me-3"}>Od</label>
                        <input className={"form-control mb-2 d-inline-block inputlist-columns"} type={"time"} name={this.props.name+'start'} id={this.props.name+'start'} onKeyDown={this.keyDownHandler} ref={this.start} data-exclude/>
                    </div>

                    <div className={"col-12"}>
                        <label className={"me-3"}>Do</label>
                        <input className={"form-control mb-3 d-inline-block inputlist-columns"} type={"time"} name={this.props.name+'end'} id={this.props.name+'end'} onKeyDown={this.keyDownHandler} ref={this.end} data-exclude/>
                    </div>

                    <button className={"btn btn-primary col-3 text-capitalize inputlist-columns"} onClick={this.addHandler}>Dodaj</button>
                </div>
            </div>

            <div className={"inputlist-list"} ref={this.list}>
                <ul className={"row ps-0"}>
                    {
                        this.state.data.map((entry, index) => (
                            <li className={"inputlist-element col-4"} key={index} data-id={index} onClick={this.deleteHandler}>{entry.start.time}-{entry.end.time}</li>
                        ))
                    }
                </ul>

                <input type={"hidden"} name={this.props.name} value={JSON.stringify(this.state.data)} data-json></input>
            </div>
        </div>;
    }
}

export default TimeRangeList;