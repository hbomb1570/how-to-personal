import React, { Component } from 'react';
import axios from 'axios'
import { GridList } from 'material-ui/GridList';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/users'
import Tile from './Tile'
import Snackbar from 'material-ui/Snackbar'
// import cuttingBoard from '../../Images/cuttingboard.jpg'
import sbg from '../../Images/cb2.jpg'
import './Search.css'

class Search extends Component {
    constructor() {
        super()
        this.handleOpenSnack = this.handleOpenSnack.bind(this)
        this.state = {
            search_input: '',
            search: [],
            userInfo: {},
            added: false,
            open: false,
            styles: {
                root: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                },
                gridList: {
                    width: '80vw',
                    height: '60vh',
                    // overflowY: 'auto',
                    margin: '5vh 0 0 0'
                }
            }
        }
    }

    inputHandler(e) {
        this.setState({ search_input: e.target.value })
    }

    getRecipes() {
        // set e as the input above
        // e.preventDefault()
        axios.post('/api/search', { search_input: this.state.search_input }).then(res => {
            this.setState({
                search: res.data.recipes
            })
        })
    }

    handleOpenSnack = (bool) => {
        this.setState({
            open: true,
            added: bool
        })
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        })
    }

    componentDidMount() {
        this.props.getUser()
    }

    render() {
        let searchDisplay = this.state.search.length > 0 ? (
            <div style={this.state.styles.root}>
                <GridList
                    cellHeight={240}
                    style={this.state.styles.gridList}
                >
                    {this.state.search.map((e, i, a) => (
                        <Tile
                            key={i}
                            recipe={e}
                            user={this.props.user}
                            open={this.handleOpenSnack} />
                    ))}
                </GridList>
                <Snackbar
                    open={this.state.open}
                    message={this.state.added ? `Recipe added to favorites.` : `Recipe removed from favorites.`}
                    autoHideDuration={2500}
                    onRequestClose={this.handleRequestClose} />
            </div>
        ) : <div className='emptySearch'>
                <img className='bgSearch' src={sbg} alt='' />
                <h2 className='bgMessage'> Go find something to cook! </h2> 
            </div>
        return (
            < div >
                {searchDisplay}
                <div className='searchWrapper'>
                    <input className='searchInput' type='text' onChange={this.inputHandler.bind(this)} />
                    <button className='searchButton' onClick={() => { this.getRecipes() }}>Search</button>
                </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userData
    }
}

export default connect(mapStateToProps, { getUser })(Search)