import React, { Component } from 'react';
import axios from 'axios'
import { GridList, GridTile } from 'material-ui/GridList'
import Checkbox from 'material-ui/Checkbox'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import { connect } from 'react-redux';
import { getUser } from '../../ducks/users'
import favbg from '../../Images/favbg4.jpg'
import './Favorites.css'

class Favorite extends Component {
    constructor(props) {
        super(props)
        this.handleCheck = this.handleCheck.bind(this)
        this.state = {
            checked: true,
            recipeDisplay: [],
            noData: false,
            deleteRecipe: {
                user_id: props.user.id
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
                    margin: '19vh 0 3vh 0'
                }
            }
        }
    }

    componentDidMount() {
        this.props.getUser()
    }

    componentWillReceiveProps(){
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
        axios.delete(`/api/favorites/${this.props.user.id}/${id}`)
            .then(res => {
                this.setState({
                    recipeDisplay: res.data
                })
            })
    }

    render() {
        let recipeDisplay = this.state.recipeDisplay[0] ? (
            <div style={this.state.styles.root} >
                <GridList
                    cellHeight={240}
                    style={this.state.styles.gridList}
                >
                    {this.state.recipeDisplay.map((e, i, a) => {
                        return (
                            <GridTile
                                
                                key={i}
                                actionIcon={<Checkbox checked={true} onCheck={() => this.handleCheck(e.recipe_id)} checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                                    style={this.state.styles.checkbox} />}
                                title={e.recipe_name}
                                subtitle={<a href={e.recipe_source} target='_blank'>{e.recipe_source}</a>}
                            >
                                <img src={e.recipe_image} alt='' />
                            </GridTile>)
                    })}
                </GridList>
            </div>
        ) : <div className='favoriteWrapper'> <img className='favImg' src={favbg} alt=''/> <h1 className='favMessage'> No Favorites <a href='#/search'>Go Find Some!</a></h1> </div>
        return (
            <div>
                {recipeDisplay}
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