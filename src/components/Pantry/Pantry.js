import React, { Component } from 'react';
import './Pantry.css'
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import axios from 'axios'

export default class Pantry extends Component {
    constructor() {
        super()
        this.state = {
            spices: []
        }
    }

    componentDidMount() {
        axios.get('/api/spices')
            .then(res => {
                this.setState({
                    spices: res.data
                })
            })
    }

    render() {

        const pantryDisplay = this.state.spices.map((e, i, a) => {
            return (
                <Card className='pantryCard' key={i}
                >
                    <CardHeader className='pantryTitle'
                        title={e.spice_name} />
                    <CardMedia className='spiceImage'>
                        <img src={e.spice_img} alt='' />
                    </CardMedia>
                    <CardText className='pantryText'>
                        {e.spice_desc} <br />
                        Flavor: {e.flavor}
                    </CardText>
                </Card>
            )
        })
        return (
            <div className='pantryWrapper'>
                {pantryDisplay}
            </div>
        )
    }
}

