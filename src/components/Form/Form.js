import React, { Component } from 'react'
import './Form.css'
import { observer } from 'mobx-react'

import PropTypes from 'prop-types'

export default observer(class Form extends Component {
	static contextTypes = {
        router: PropTypes.object.isRequired
    }

	onSubmit (event) {
		event.preventDefault()
		const { symptoms } = this.props

		this.context.router.history.push({
			pathname: 'sicknesses',
			state: { symptoms: symptoms }
		})
	}

	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)} className='Form'>
				<button className='Symptomps_Form' type='submit'>Check your illness</button>
			</form>
		)
	}
})