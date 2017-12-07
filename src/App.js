import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.css'
import axios from 'axios'
import Main from './components/Main/Main'

class App extends Component {

  componentWillMount() {
    axios.get('/auth/me')
      .then(userInfo => {
        if (userInfo) {
          window.location.replace(process.env.REACT_APP_MAIN)
        }
      })
      .catch(error => {
        if (error) {
          window.location.replace(process.env.REACT_APP_LOGIN)
        }
      })
  }
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route exact path='/' component={Main}></Route>
        </div>
      </HashRouter>
    );
  }
}

export default App;
