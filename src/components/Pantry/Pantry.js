import React, { Component } from 'react';
import './Pantry.css'
import { GridList, GridTile } from 'material-ui/GridList';
import axios from 'axios'


export default class Pantry extends Component {
    constructor() {
        super()
        this.state = {
            spices: [],
            styles: {
                root: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                },
                gridList: {
                    width: '80vw',
                    height: '60vh',
                    overflowY: 'auto',
                },
            }
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
        let pantryDisplay = this.state.spices ? (
            <div style={this.state.styles.root}>
            <GridList
                cellHeight={120}
                style={this.state.styles.gridList}
            >
                {this.state.spices.map((e,i,a)=>(
                    <GridTile
                        key={i}
                        title={e.spice_name}
                    >
                    <img src={e.spice_img} alt='' />
                    </GridTile>
                ))}
            </GridList>
        </div>
        ) : null
        return (
            <div>
                {pantryDisplay}
            </div>
        )
    }
}

