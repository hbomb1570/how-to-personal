import React, { Component } from 'react';
import Header from '../Header/Header'
import './Main.css'
import video from '../../Images/bg-video.mp4'

export default class Main extends Component {
    render() {
        return (
            <div>
                <Header/>
                <video className='bgVideo' src={video} autoPlay loop />
            </div>
        );
    }
}