import React, {Component} from "react";

class Alert extends Component {
    static get Type() {
        return {
            Success: "alert-success",
            Fail: "alert-danger",
            Info: "alert-info"
        };
    }

    state = {
        content: "",
        type: Alert.Type.Info,
        visible: false,
    };

    set visible(visible) {
        if(visible === true)
            setTimeout(() => {
                this.visible = false;
            }, 6000);

        this.setState(prev => {
            return {
                ...prev,
                visible: visible
            }
        });
    }
    set type(type) {
        this.setState(prev => {
            return {
                ...prev,
                type: type
            }
        });
    }
    set content(content) {
        this.setState(prev => {
            return {
                ...prev,
                content: content
            }
        });
    }


    render() {
        let visibility = "";
        if(this.state.visible) visibility = " alert-shown";

        return <div id="alert" className={"alert "+this.state.type+visibility}>
            {this.state.content}
        </div>;
    }
}

export default Alert;