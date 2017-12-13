import React, { Component } from 'react';
import axios from 'axios'
import { GridList } from 'material-ui/GridList';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/users'
import Tile from './Tile'

import Snackbar from 'material-ui/Snackbar'

class Search extends Component {
    constructor() {
        super()
        this.handleOpenSnack = this.handleOpenSnack.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.state = {
            search_input: '',
            search: [],
            userInfo: {},
            open: false,
            checked: false,
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

    handleCheck = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    handleOpenSnack = () => {
        this.setState({
            open: true,
        })
    }

    handleRequestClose = () => {
        console.log(this.state)
        this.setState({
            open: false,
        })
    }

    componentDidMount() {
        this.props.getUser()
    }

    render() {
        let searchDisplay = this.state.search ? (
            <div style={this.state.styles.root}>
                <GridList
                    cellHeight={240}
                    style={this.state.styles.gridList}
                >
                    {this.state.search && this.state.search.map((e, i, a) => (
                        <Tile
                            checked={this.state.checked}
                            handleCheck={this.handleCheck}
                            key={i}
                            recipe={e}
                            user={this.props.user}
                            open={this.handleOpenSnack} />
                    ))}
                </GridList>
                <Snackbar
                    open={this.state.open}
                    message={this.state.checked === true ? `Recipe added to favorites.` : `Recipe removed from favorites.`}
                    autoHideDuration={2500}
                    onRequestClose={this.handleRequestClose} />
            </div>
        ) : null
        return (
            < div >
                {searchDisplay}
                <div className='searchWrapper'>
                    <input className='searchInput' type='text' onChange={this.inputHandler.bind(this)} />
                    <button className='searchButton' onClick={() => { this.getRecipes() }}>Search</button>
                </div>
            </div >
            // <div>
            //     {searchDisplay}
            //     <form onSubmit={this.getRecipes}>
            //     <input type='text' onChange={this.inputHandler.bind(this)} />
            //     <button type='submit'>Search</button>
            //     </form>

            // </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.userData
    }
}
export default connect(mapStateToProps, { getUser })(Search)