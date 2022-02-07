//import logo from './logo.svg';
import React from 'react';
import './App.css';
import { emitMessage } from './api/ws/api';
import socket from './api/ws';
import MessageList from './components/MessageList';

/*
const socket = new WebSocket('ws://localhost:3000/');

socket.onopen = function(event){
  alert('WS connection is opened!');
  console.dir(event);
};

socket.onclose = function(event){
  alert('WS connection is closed');
  console.dir(event);
};

socket.onmessage = function(event){
  console.dir(event);
};

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <button onClick={socket.close.bind(socket, 1000)}>Close connection</button>
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      messageValue: '',
    };
    this.socket = null;
  };

  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:3000/');
    this.socket.addEventListener('message', (e) =>{
      this.addMessages(JSON.parse(e.data));
    })
  };

  addMessages = (messages) => {
    console.log(messages);
    this.setState({
      messages: [...this.state.messages, ...messages],
    });
  };

  sendMessage = () => {
    if(this.socket) {
      socket.send(this.state.messageValue);
    }
    
  };

  handdleChangeMessage = (e) => {
    this.setState({
      messageValue: e.target.value,
    });
  };

  render(){
    return(
      <>
        <ul>
          {
            this.state.messages.map(
              (m, index) => {
                return(
                  <li key={index}>
                   {m}
                  </li>
                )
              }
            )
          }
        </ul>
        <input type="textarea" value={this.state.messageValue} onChange={this.handdleChangeMessage}/>
        <button onClick={this.sendMessage}>Send</button>
      </>
    );
  };

};*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room1: {
        messages: [],
      },
      room2: {
        messages: [],
      },
      message: '',
      currentRoom: 'room1',
    };
  }

  componentDidMount(){
    socket.on('new-message', this.handleNewMessage);
  };

  handleNewMessage = (room, message) => {
    this.setState({
      [room]: {messages: [...this.state[room].messages, message]},
    })
  };

  handdleChangeMessage = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  switchRoom = (e) =>{
    this.setState({currentRoom: e.target.value});
  }

  sendMessage = () => {
    const {currentRoom, message} = this.state;
    emitMessage(currentRoom, message);
    this.setState({message: ''});
  }
 /*
  handleWs = () => {
    socket.off();
  };*/

  render(){
    // return (
    //   <>
    //   <button onClick={() => emitTest('test', {test: 'test'})}>Send message</button>
    //   </>
    // );
    const {currentRoom, message, room1:{messages: messages1}, room2:{messages: messages2}} = this.state;
    return (
      <>
        <div className='roomContainer'>
            <MessageList messages={messages1} />
            <MessageList messages={messages2} />
        </div>
        <label>
            <input type="radio" name={'currentRoom'} value={'room1'} checked={currentRoom === 'room1'} onChange={this.switchRoom}/>
            <span>Switch to Room 1</span>
          </label>
          <label>
            <input type="radio" name={'currentRoom'} value={'room2'} checked={currentRoom === 'room2'} onChange={this.switchRoom}/>
            <span>Switch to Room 2</span>
          </label>
          <div>
            <input type="textarea" value={message} onChange={this.handdleChangeMessage}/>
            <button onClick={this.sendMessage}>Send</button>
          </div>
          {/* <div>
            <button onClick={this.handleWs}>Switch off</button>
          </div> */}
      </>
    );
  }
};

export default App;
