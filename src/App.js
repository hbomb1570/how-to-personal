import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import './reset.css'
import './App.css'
import axios from 'axios'
import router from './router'
import Header from '../src/components/Header/Header'

class App extends Component {

  // componentWillMount() {
  //   axios.get('/auth/me')
  //     .then(userInfo => {
  //       if (userInfo) {
  //         window.location.replace(process.env.REACT_APP_MAIN)
  //       }
  //     })
  //     .catch(error => {
  //       if (error) {
  //         window.location.replace(process.env.REACT_APP_LOGIN)
  //       }
  //     })
  // }
  render() {
    return (
      <HashRouter>
        <div className="App">
        <Header/>
        {/* <MenuBar/> */}
          {router}
        </div>
      </HashRouter>
    );
  }
}

export default App;
