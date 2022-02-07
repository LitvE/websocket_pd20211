import React, {Component} from "react";
import './MessageList.css'

class MessageList extends Component {

    render(){
        const {messages} = this.props;

        return (

            <ul className="msgList" >{messages.map((m, index) => {
                return(
                    <li key={index}>
                        {m}
                    </li>
                );
            })}</ul>
        );
    };
};

export default MessageList;