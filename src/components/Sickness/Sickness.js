import React, { Component } from 'react'
import './Sickness.css'
import { observer } from 'mobx-react'

export default observer (class Sickness extends Component {
    render() {
        const { sickness } = this.props

        return (
            <div className='Sickness'>
                <div className='content'>
                    <div className='name'>
                        {sickness.name}
                    </div>
                    <div className={ `prevalence ${sickness.prevalence}` }>
                        {sickness.prevalence}
                    </div>
                    <div className='location'>
                        {sickness.location}
                    </div>
                </div>
            </div>
        )
    }
})
