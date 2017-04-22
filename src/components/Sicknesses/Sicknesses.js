import React, { Component } from 'react'
import './Sicknesses.css'
import { observer } from 'mobx-react'
import sicknesses from '../../stores/sicknesses'
import Sickness from '../Sickness/Sickness'
import Loading from '../Loading/Loading'

export default observer (class Sicknesses extends Component {
    componentWillMount() {
        sicknesses.fetch()
    }

    render() {
        if (sicknesses.isRequest('fetching')) {
            return <Loading label='sicknesses' />
        }

        return (
            <div className='Sicknesses'>
                {
                    sicknesses.models.map(sickness => (
                        <Sickness key={sickness.id} sickness={sickness} />
                    ))
                }
            </div>
        )
    }
})
