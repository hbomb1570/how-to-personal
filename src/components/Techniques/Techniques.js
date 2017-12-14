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
                className='mainCard'
                // expanded={this.state.expandedCard === i ? true : false} onClick={() => {
                //     if (this.state.expandedCard === i) {
                //         this.setState({
                //             expandedCard: undefined
                //         })
                //     }
                //     else {
                //         this.setState({
                //             expandedCard: i
                //         })
                //     }
                // }}
                >
                    <CardHeader
                        title={e.tech_name}
                        // actAsExpander={true}
                        // showExpandableButton={true}
                    />
                    <CardMedia
                        // expandable={true}
                        >
                        <img 
                        className='cardImage' src={e.image} alt="" />
                    </CardMedia>
                    <CardText 
                    // expandable={true}
                    >
                        {e.tech_info}
                    </CardText>
                </Card>
            )
        })
        return (
            <div className='cardWrapper'>
                {techniquesName}
            </div>
        );
    }
}