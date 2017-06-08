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
        let symptoms = this.props.location.state.symptoms

        if (this.loading) {
            return <Loading label='sicknesses' />
        }
        return (
            <div className='Sicknesses'>
                <div className='heading'>
                    For
                    {
                        symptoms.map(symptom => {
                            let colon = ","
                            if (symptoms.indexOf(symptom) === symptoms.length -2) colon=" &"
                            if (symptoms.indexOf(symptom) === symptoms.length -1) {
                                return (<span className='symptom'>&nbsp;{symptom._source.name}</span>)
                            } else {
                                return (<span className='symptom'>&nbsp;{symptom._source.name}{colon}</span>)    
                            }
                        })
                    }
                    &nbsp;we found the following sicknesses:
                    <hr></hr>
                </div>
                <div className='sicknessesContainer'>
                    {
                        this.sicknesses.map(sickness => (
                            <Sickness key={sickness.id} sickness={sickness} />
                        ))
                    }
                </div>
            </div>
        )
    }
})