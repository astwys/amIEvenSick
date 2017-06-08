import React, { Component } from 'react'
import './Sicknesses.css'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'

import Sickness from '../Sickness/Sickness'
import Loading from '../Loading/Loading'

require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'

export default observer (class Sicknesses extends Component {
    constructor() {
        super()

        extendObservable(this, {
            loading: true,
            symptoms: [],
            sicknesses: [],
            body: {
                "symptoms": []
            }
        })
    }

    componentWillMount() {
        this.symptoms = this.props.location.state.symptoms
        
        this.fetchData(this.symptoms)
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
                <div className='heading'>
                    For
                    {
                        this.symptoms.map(symptom => {
                            let colon = ","
                            if (this.symptoms.indexOf(symptom) === this.symptoms.length -2) colon=" &"
                            if (this.symptoms.indexOf(symptom) === this.symptoms.length -1) {
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