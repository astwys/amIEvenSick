'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Layout from './components/Layout'

import Home from './pages/Home'


const app = document.getElementById('app')

ReactDOM.render(
    <Router>
        <Layout>
            <Route exact path="/" component={Home} />
        </Layout>
    </Router>
, app)
