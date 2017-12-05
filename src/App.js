import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login'
import User from './components/User/User'

class App extends Component {
  render() {
    return (
      <HashRouter>
      <div className="App">
        <Route exact path='/' component={Login}></Route>
        <Route path='/user' component={User}></Route>
      </div>
      </HashRouter>
    );
  }
}

export default App;
