//import logo from './logo.svg';
import React from 'react';
import './App.css';

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
  };

  sendMessage = () => {
    socket.send(this.state.messageValue);
  };

  handdleChangeMessage = (e) => {
    this.setState({
      messageValue: e.target.value,
    });
  };

  render(){
    return(
      <>
        <input type="textarea" value={this.state.messageValue} onChange={this.handdleChangeMessage}/>
        <button onClick={this.sendMessage}>Send</button>
      </>
    );
  };

};

export default App;
