import React, { Component } from 'react'
import './Files.css'
import { observer } from 'mobx-react'
import files from '../../stores/files'
import File from '../File/File'
import Loading from '../Loading/Loading'

export default observer (class Files extends Component {
    componentWillMount() {
        files.fetch()
    }

    render() {
        if (files.isRequest('fetching')) {
            return <Loading label='files' />
        }

        return (
            <div className='Files'>
                {
                    files.models.map(file => (
                        <File key={file.id} file={file} />
                    ))
                }
            </div>
        )
    }
})
