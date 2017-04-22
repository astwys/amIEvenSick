import React, { Component } from 'react'
import './Sickness.css'
import { observer } from 'mobx-react'

export default observer (class Sickness extends Component {
    render() {
        const { sickness } = this.props

        return (
            <div className='Sickness'>
                {sickness.get('username')}
            </div>
        )
    }
})
