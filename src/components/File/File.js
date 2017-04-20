import React, { Component } from 'react'
import './File.css'
import { observer } from 'mobx-react'

export default observer (class File extends Component {
    render() {
        const { file } = this.props

        return (
            <div className='File'>
                {file.get('username')}
            </div>
        )
    }
})
