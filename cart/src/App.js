import React,  { Component } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import  Home from './components/Home'



export class App extends Component {
  render() {
     return (
      <BrowserRouter>
      <Routes>
          <Route  patch='/Home' element={<Home/>} />
      </Routes>
      </BrowserRouter>
     )
      
}}

export default App;