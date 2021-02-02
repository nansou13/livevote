import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Game from './Components/game';
import Admin from './Components/admin';
import Menu from './Components/menu';

const App = () => (
  <Router>
    <div className="App">
      <Menu/>
      <div className="blockPrinc">
        <Switch>
          <Route exact path="/">
            <Game />
          </Route>
          <Route path="/admin">
            <>
              <Admin />
              <Game isAdmin />
            </>
          </Route>
          {/* <Route path="/display">
            <>
              <Game isAdmin />
            </>
          </Route>
          <Route path="/create">
            <>
              <Game isAdmin />
            </>
          </Route>
          <Route path="/:id">
            <>
              <Game isAdmin />
            </>
          </Route> */}
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
