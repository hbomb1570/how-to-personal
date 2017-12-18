import React, { Component } from 'react';
import axios from 'axios'
import { GridTile } from 'material-ui/GridList'
import Checkbox from 'material-ui/Checkbox'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import './Tile.css'
import { red500 } from 'material-ui/styles/colors'

export default class Tile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            addRecipe: {
                user_id: props.user.id,
                recipe_id: props.recipe.recipe_id,
                recipe_name: props.recipe.title,
                recipe_image: props.recipe.image_url,
                recipe_source: props.recipe.source_url
            },
            deleteRecipe: {
                user_id: props.user.id,
                recipe_id: props.recipe.recipe_id
            },
            styles: {
                block: {
                    maxWidth: 250,
                },
                checkbox: {
                    marginBottom: 16,
                    fill: red500
                }
            }
        }
    }
    handleCheck = () => {
        if (this.state.checked === false) {
            axios.post('/api/favorites', this.state.addRecipe)
                .then(res => {
                    this.setState({
                    checked:!this.state.checked
                    })
                    this.props.open(this.state.checked)
                })
        } else {
            axios.delete(`/api/favorites/${this.state.deleteRecipe.user_id}/${this.state.deleteRecipe.recipe_id}`)
                .then(res => {
                    this.setState({
                        checked:!this.state.checked
                    })
                    this.props.open(this.state.checked)
                })
        }
    }
    render() {
        return (
            <GridTile
                actionIcon={<Checkbox onCheck={this.handleCheck}
                    checkedIcon  ={<ActionFavorite  />}
                    uncheckedIcon={<ActionFavoriteBorder  />}
                    style={this.state.styles.checkbox} />}
                title={this.props.recipe.title}
                subtitle={<a href={this.props.recipe.source_url} target='_blank'> {this.props.recipe.source_url}</a>}
            >
                <img src={this.props.recipe.image_url} alt='' />
            </GridTile>
        )
    }
}