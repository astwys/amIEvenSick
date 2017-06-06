import React, { Component } from 'react'
import './Sicknesses.css'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'

import Sickness from '../Sickness/Sickness'
import Loading from '../Loading/Loading'

require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'

import PropTypes from 'prop-types'

export default observer (class Sicknesses extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor() {
        super()

        extendObservable(this, {
            loading: true,
            sicknesses: [],
            body: {
                "symptoms": []
            }
        })
    }

    componentWillMount() {
        let symptoms = this.props.location.state.symptoms
        
        this.fetchData(symptoms)
    }

    fetchData(symptoms) {
        symptoms.map(symp => {
            this.body.symptoms.push({"name": symp._source.name})
        })

        fetch('https://mighty-woodland-94853.herokuapp.com/sbs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.body)
        })
        .then(result => { 
            return result.json()
        })
        .then(output => {
            output.sicknesses.map(sickness => {
                this.sicknesses.push(sickness)
            })
        })
        .then(() => {
            this.loading = false
        })
    }

    render() {
        if (this.loading) {
            return <Loading label='sicknesses' />
        }
        return (
            <div className='Sicknesses'>
                {
                    this.sicknesses.map(sickness => (
                        <Sickness key={sickness.id} sickness={sickness} />
                    ))
                }
            </div>
        )
    }
})

