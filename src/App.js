import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { addPlayer } from './socket'
import UserList from './Components/userList'
import Game from './Components/game'
import Admin from './Components/admin'
import Graph from './Components/graph'

const App = () => {
  
  const [name, setName] = useState(false)
  const [connected, setConnected] = useState(false)
  
  const handleName = ({target: {value}}) => {
    setName(value)
  }

  const clickConnected = () => {
    if(name){
      setConnected(true)
      addPlayer(name)
    }
  }

  return connected ? (

    <div className="App">
      Bonjour {name} ! 
      <div><Admin /></div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Graph />
          <Game username={name} />
        </div>
        
        {/* <UserList username={name} /> */}

      </div>
    </div>
  ) : (
    <div>
      <input type="text" onChange={handleName} onKeyDown={({key}) => key === 'Enter' && clickConnected()}/>
      <button onClick={clickConnected}>Valider</button>
    </div>
  );
}

export default App;
