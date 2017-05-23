import React, { Component } from 'react'
import './Sicknesses.css'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'
//import sicknesses from '../../stores/sicknesses'
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
            sicknesses: null
        })
    }

    componentWillMount() {
        let symptoms = this.props.location.state.symptoms
        
        console.log(this.props.location.state.symptoms)
        this.fetchData(symptoms)
    }

    fetchData(symptoms) {
        let submitSymptoms = new SymptomsCollection()

        //let symptomsList = []
        let sympt = null

        symptoms.forEach(symp => {
            // symptomsList.push(symp.attributes._data)
            sympt = symp.attributes._data
        })

        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sympt)
        })
        .then(result => { return result.json() })
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

