import React,  { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Home } from '../src/components/Home'



export class App extends Component {
  render() {
     return (
      <BrowserRouter>
        <Switch>
          <Route patch='/' component={Home} />
        </Switch>
      </BrowserRouter>
     )
      
}}

export default App;