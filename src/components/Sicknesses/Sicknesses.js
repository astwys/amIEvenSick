import React, { Component } from 'react'
import './Sicknesses.css'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'

import Sickness from '../Sickness/Sickness'
import Loading from '../Loading/Loading'

import { SymptomsCollection } from '../../stores/symptoms'

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
            sicknesses: null,
            body: {
                "symptoms": []
            }
        })
    }

    componentWillMount() {
        let symptoms = this.props.location.state.symptoms
        
        console.log(this.props.location.state.symptoms)
        this.fetchData(symptoms)
    }

    fetchData(symptoms) {
        let submitSymptoms = new SymptomsCollection()

        symptoms.forEach(symp => {

            this.body.symptoms.push({"name": symp._source.name})
        })

        console.log(JSON.stringify(this.body))
        fetch('https://mighty-woodland-94853.herokuapp.com/sbs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(sympt)
            body: JSON.stringify(this.body)
        })
        .then(result => { 
            console.log(result.json())
            return result.json() 
        })
        .then(output => submitSymptoms.add([output]))
        .then(() => {
            this.sicknesses = submitSymptoms
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
                    this.sicknesses.models.map(sickness => (
                        <Sickness key={sickness.id} sickness={sickness} />
                    ))
                }
            </div>
        )
    }
})

