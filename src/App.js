import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css'
import axios from 'axios'
import router from './router'
// import { Link } from 'react-router-dom';

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
         <nav>  </nav>
          {router}
        </div>
      </HashRouter>
    );
  }
}

export default App;
