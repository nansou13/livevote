import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Board from 'Components/board';
import Admin from 'Components/admin';
import Menu from 'Components/menu';
import Create from 'Components/create';
import 'App.css';

const App = () => (
  <Router>
    <div className="App">
      <Menu />
      <div className="main">
        <Switch>
          <Route exact path="/">
            <Board />
          </Route>
          <Route exact path="/admin">
            <div className="adminContent">
              <Admin />
              <Board isAdmin />
            </div>
          </Route>
          <Route path="/create">
            <>
              <Create />
            </>
          </Route>
          <Route path="/:id/admin">
            <>
              <Admin />
              <Board isAdmin />
            </>
          </Route>
          <Route path="/:id">
            <>
              <Board />
            </>
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
