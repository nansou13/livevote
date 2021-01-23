import {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { addPlayer } from './socket'
import UserList from './Components/userList'
import Game from './Components/game'
import Admin from './Components/admin'

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

  return (
    <Router>
      <div className="App">
        <div className="blockPrinc">
        <Switch>
          <Route exact path="/">
              <Game />
          </Route>
          <Route path="/admin">
            <>
            <Admin />
            <Game isAdmin/>
            </>
          </Route>
        </Switch>
          </div>
      </div>
    </Router>
  )
}

export default App;