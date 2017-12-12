import React, {Component} from 'react';
import MenuBar from './../MenuBar/MenuBar'
import logo from './../../Images/logo.jpg'
import './Header.css'

export default class Header extends Component {
    render(){
        return (
            <div className='main'>
                <MenuBar/>
                <img className='logo' src={logo} alt='' />
                <a href='http://localhost:3005/auth/logout'><button>Logout</button></a>
            </div>
        )
    }
}