import React, { Component } from 'react'
import './Form.css'
import { observer } from 'mobx-react'

import { SymptompsCollection } from '../../stores/symptomps'

export default observer(class Form extends Component {
	onSubmit (event) {
		let submitSymptomps = new SymptompsCollection()
		event.preventDefault()
		const { symptomps } = this.props
		console.log(symptomps)
		submitSymptomps.create(symptomps)
	}

	render() {

		return (
			<form onSubmit={this.onSubmit.bind(this)} className='Form'>
				<button className='Symptomps_Form' type='submit'>Check your illness</button>
			</form>
		)
	}
})