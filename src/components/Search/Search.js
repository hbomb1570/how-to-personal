import React, { Component } from 'react';
import axios from 'axios'
import { GridList } from 'material-ui/GridList';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/users'
import Tile from './Tile'
import Snackbar from 'material-ui/Snackbar'
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
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                },
                gridList: {
                    width: '90vw',
                    height: '82vh',
                    overflowY: 'auto',
                    margin: '0 0 2vh 0',
                    padding: '21vh 0 4vh 0'
                }
            }
        }
    }

    inputHandler(e) {
        this.setState({ search_input: e.target.value })
    }

    getRecipes(event) {
        // set e as the input above
        console.log(event)
        event.preventDefault()
        axios.post('/api/search', { search_input: this.state.search_input }).then(res => {
            this.setState({
                search: res.data.recipes,
                search_input:''
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
                    cellHeight={220}
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
                <Snackbar className='snackbar'
                    open={this.state.open}
                    message={this.state.added ? `Recipe added to favorites.` : `Recipe removed from favorites.`}
                    autoHideDuration={2500}
                    onRequestClose={this.handleRequestClose} />
            </div>
        ) : <div className='emptySearch'>
                <img className='bgSearch' src={sbg} alt='' />
                <h2 className='bgMessage'> Find something to cook! </h2> 
            </div>
        return (
            < div >
            <div className='searchWrapper'>
                    <form onSubmit={(event) => {this.getRecipes(event)}}>
                        <input className='searchInput' type='text' onChange={this.inputHandler.bind     (this)} value={this.state.search_input}/>
                            <button className='searchButton'>Search</button>
                    </form>
                </div>
             {searchDisplay}
                
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