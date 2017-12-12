import React, { Component } from 'react';
import axios from 'axios'
import { GridList, GridTile } from 'material-ui/GridList';

export default class Search extends Component {
    constructor() {
        super()
        this.state = {
            search_input: '',
            search: [],
            styles: {
                root: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                },
                gridList: {
                    width: 500,
                    height: 450,
                    overflowY: 'auto',
                },
            }
        }
    }

    inputHandler(e) {
        this.setState({ search_input: e.target.value })
    }

    getRecipes() {
        axios.post('/api/search', { search_input: this.state.search_input }).then(res => {
            this.setState({
                search: res.data.recipes
            })
        })
    }

    render() {
        let searchDisplay = this.state.search ? (
            <div style={this.state.styles.root}>
                <GridList
                    cellHeight={180}
                    style={this.state.styles.gridList}
                >
                    {this.state.search.map((e, i, a) => (
                        <GridTile
                            key={i}
                            title={e.title}
                            subtitle={e.publisher}
                        >
                           <a href={e.source_url}> <img src={e.image_url} alt='' /> </a>
                        </GridTile>
                    ))}
                </GridList>
            </div>
        ) : null
        return (
            < div >
                {searchDisplay}
                <input className='searchInput' type='text' onChange={this.inputHandler.bind(this)} />
                <button className='searchButton' onClick={() => { this.getRecipes() }}>Search</button>
            </div >
        )
    }
}