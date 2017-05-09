import React, { Component } from 'react'
import './Sicknesses.css'
import { observer } from 'mobx-react'
//import sicknesses from '../../stores/sicknesses'
import Sickness from '../Sickness/Sickness'
//import Loading from '../Loading/Loading'

import PropTypes from 'prop-types'

export default observer (class Sicknesses extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    componentWillMount() {
        //sicknesses.fetch()
        this.sicknesses = this.props.location.state.symptoms
        console.log(this.props.location.state.symptoms.models)
    }

    render() {
        // const { sicknesses } = this.props.location.state.symptoms

        // if (sicknesses.isRequest('fetching')) {
        //     return <Loading label='sicknesses' />
        // }

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

