import React, { Component } from 'react';
import axios from 'axios'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

export default class Techniques extends Component {
    constructor() {
        super()
        this.state = {
            techniques: []
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
                <Card key={i}>
                    <CardMedia>
                        <img src={e.image} alt="" />
                    </CardMedia>
                    <CardTitle title={e.tech_name} />
                    <CardText>
                        {e.tech_info}
                    </CardText>
                </Card>
            )
        })
        return (
            <div>
                {techniquesName}
            </div>
        );
    }
}