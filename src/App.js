import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Sicknesses from './components/Sicknesses/Sicknesses'
import Symptoms from './components/Symptoms/Symptoms'
import { observer } from 'mobx-react'

export default observer (class App extends Component {
    render() {
        return (
            <div className='App'>
            	<Router>
            		<div className='Router'>
	            		<Route exact path="/" component={Symptoms} />
	            		<Route path="/sicknesses" component={Sicknesses} />
            		</div>
            	</Router>
            </div>
        )
    }
})
