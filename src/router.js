import React from 'react'
import {Switch, Route } from 'react-router-dom';
import Main from './components/Main/Main'
import Videos from './components/Videos/Videos'
import Techniques from './components/Techniques/Techniques'

export default (
    <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/videos' component={Videos} />
        <Route path='/techniques' component={Techniques} />
    </Switch>
)