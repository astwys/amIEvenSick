import React, { Component } from 'react';
import './App.css';
import Files from './components/Files/Files'
import { observer } from 'mobx-react'

export default observer (class App extends Component {
    render() {
        return (
            <div className='App'>
                <Files />
            </div>
        )
    }
})
