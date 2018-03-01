import React, {Component} from 'react';
import MenuBar from './../MenuBar/MenuBar'
import logo from './../../Images/logo.jpg'
import './Header.css'

export default class Header extends Component {
    render(){
        return (
            <div className='main'>
                <MenuBar className='menuBar'/>
                <img className='logo' src={logo} alt='' />
                <a href={process.env.REACT_APP_LOGOUT}><button className='logout'>Logout</button></a>
            </div>
        )
    }
}