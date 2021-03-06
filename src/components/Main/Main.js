import React, { Component } from 'react';
// import Header from '../Header/Header'
import './Main.css'
import video from '../../Images/bg-video.mp4'
import axios from 'axios'

export default class Main extends Component {
    constructor() {
        super()
        this.state = {
            quotes: []
        }
    }

    componentDidMount() {
        axios.get('/api/quotes')
            .then(res => {
                this.setState({
                    quotes: res.data
                })
            })
    }
    render() {
        const quotesName = this.state.quotes[
            ~~(Math.random() * (this.state.quotes.length - 0) + 0)]
        return (
            <div className='mainWrapper'>
                <div className='imageWrapper'>
                    <h2 className='quote'>{quotesName && quotesName.info} <br />{quotesName && quotesName.source}</h2>
                </div>
                <video className='bgVideo' src={video} autoPlay loop />
            </div>
        );
    }
}