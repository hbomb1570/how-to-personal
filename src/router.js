import React from 'react'
import {Switch, Route } from 'react-router-dom';
import Main from './components/Main/Main'
import Videos from './components/Videos/Videos'
import Techniques from './components/Techniques/Techniques'
import Search from './components/Search/Search'
import Pantry from './components/Pantry/Pantry'
import Favorite from './components/Favorites/Favorites'

export default (
    <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/videos' component={Videos} />
        <Route path='/techniques' component={Techniques} />
        <Route path='/search' component={Search} />
        <Route path='/pantry' component={Pantry} />
        {/* <Route path='/favorites' component={Favorites} />
        <Route path='/logout' component={Logout} /> */}
        <Route path='/favorites' component={Favorite} />
    </Switch>
)