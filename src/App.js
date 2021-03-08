import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Game from './Components/game';
import Admin from './Components/admin';
import Menu from './Components/menu';
import Create from './Components/create';

const App = () => (
  <Router>
    <div className="App">
      <Menu/>
      <div className="blockPrinc">
        <Switch>
          <Route exact path="/">
            <Game />
          </Route>
          {/* <Route
            exact
            path="/"
            render={() => {
                return (
                  <Redirect to="/demo" /> 
                )
            }}
          /> */}
          <Route exact path="/admin">
            <div className="adminContent">
              <Admin />
              <Game isAdmin />
            </div>
          </Route>
          {/* <Route path="/display">
            <>
              <Game isAdmin />
            </>
          </Route>*/}
          <Route path="/create">
            <>
              <Create />
            </>
          </Route>
          
          <Route path="/:id/admin">
            <>
              <Admin />
              <Game isAdmin />
            </>
          </Route> 
          <Route path="/:id">
            <>
              <Game />
            </>
          </Route> 
          
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
