import React, { Component } from 'react';
import axios from 'axios'
import { GridList, GridTile } from 'material-ui/GridList'
import Checkbox from 'material-ui/Checkbox'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import { connect } from 'react-redux';
import { getUser } from '../../ducks/users'

class Favorite extends Component {
    constructor(props) {
        super(props)
        this.handleCheck = this.handleCheck.bind(this)
        this.state = {
            checked: true,
            recipeDisplay: undefined,
            noData: false,
            deleteRecipe: {
                user_id: props.user.id,
                recipe_id: props.recipe_id
            },
            styles: {
                block: {
                    maxWidth: 250,
                },
                checkbox: {
                    marginBottom: 16,
                },
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

    componentDidMount() {
        axios.get('/api/favorites')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        recipeDisplay: res.data
                    })
                } else {
                    this.setState({
                        noData: true
                    })
                }
            })
    }

    handleCheck(id) {
        axios.delete(`/api/favorites/${this.state.deleteRecipe.user_id}/${this.state.deleteRecipe.recipe_id}`)
            .then(res => {
                this.setState({
                    recipeDisplay: res.data
                })
            })
    }

    render() {
        let recipeDisplay = this.state.recipeDisplay ? (
            <div style={this.state.styles.root} >
                <GridList
                    cellHeight={240}
                    style={this.state.styles.gridList}
                >
                    {this.state.recipeDisplay.map((e, i, a) => {
                        return (
                            <GridTile
                                checked={this.state.checked}
                                key={i}
                                actionIcon={<Checkbox onCheck={() => this.handleCheck(e.recipe_id)} checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                                    uncheckedIcon={<ActionFavoriteBorder color='#F44336' />}
                                    style={this.state.styles.checkbox} />}
                                title={e.recipe_name}
                                subtitle={<a href={e.recipe_source} target='_blank'>{e.recipe_source}</a>}
                            >
                                <img src={e.recipe_image} alt='' />
                            </GridTile>)
                    })}
                </GridList>
            </div>
        ) : null
        return (
            <div>
                {this.state.noData ? <h1> No Favorites Go Find Some!</h1> : recipeDisplay}
            </div>
        )
    }

}
function mapStateToProps(state) {
    return {
        user: state.userData
    }
}
export default connect(mapStateToProps, { getUser })(Favorite)