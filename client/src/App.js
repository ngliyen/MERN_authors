import React from 'react';
import './App.css';
import AddAuthor from './views/AddAuthor';
import Dashboard from './views/Dashboard';
import UpdateAuthor from './views/UpdateAuthor';


import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <h1 className="text-center">Favorite Authors</h1>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/new">
            <AddAuthor />    
          </Route>
          <Route path="/edit/:id">
            <UpdateAuthor />    
          </Route>
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
