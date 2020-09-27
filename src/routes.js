import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './components/AccountComponents/Landing'
import Register from './components/AccountComponents/Register'
import Settings from './components/AccountComponents/Settings'
import Dashboard from './components/Dashboard'
import DadJokes from './components/apps/DadJokes'
import Weather from './components/apps/Weather'

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/register' component={Register} />
        <Route path='/settings' component={Settings} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/dadjokes' component={DadJokes} />
        <Route path='/weather' component={Weather} />
    </Switch>
)