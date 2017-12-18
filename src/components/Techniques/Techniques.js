import React, { Component } from 'react';
import axios from 'axios'
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import './Techniques.css'

export default class Techniques extends Component {
    constructor() {
        super()
        this.state = {
            techniques: [],
            expanded: true,
        }
    }

    componentDidMount() {
        axios.get('/api/techniques')
            .then(res => {
                this.setState({
                    techniques: res.data
                })
            })
    }

    render() {
        const techniquesName = this.state.techniques.map((e, i, a) => {
            return (
                <Card key={i}
                    className='techCard'
                >
                    <CardHeader className='techTitle'
                        title={e.tech_name}
                    />
                    <CardMedia className='techImageWrapper'>
                        <img className='techImage'
                            src={e.image} alt="" />
                    </CardMedia>
                    <CardText className='techText'>
                        {e.tech_info}
                    </CardText>
                </Card>
            )
        })
        return (
            <div className='techWrapper'>
                {techniquesName}
            </div>
        );
    }
}