import React, { Component } from 'react'
import './Form.css'
import { observer } from 'mobx-react'

import { SymptompsCollection } from '../../stores/symptomps'

require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'

import PropTypes from 'prop-types'

export default observer(class Form extends Component {
	static contextTypes = {
        router: PropTypes.object.isRequired
    }

	onSubmit (event) {
		let submitSymptomps = new SymptompsCollection()
		event.preventDefault()
		const { symptomps } = this.props

		//let symptomsList = []
		let sympt = null
		symptomps.forEach(symp => {
			//symptomsList.push(symp.attributes._data)
			sympt = symp.attributes._data
		})
		//console.log(JSON.stringify(symptomsList))
		console.log(JSON.stringify(sympt))

		fetch('https://jsonplaceholder.typicode.com/todos', {
			method: 'POST',
			headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json'
  			},
  			// body: JSON.stringify(symptomsList)
  			body: JSON.stringify(sympt)
		})
			.then(result => {return result.json()})
			.then(output => submitSymptomps.add([output]))
			.then(() => {
				this.context.router.history.push({
     				pathname: 'sicknesses',
     				state: { symptoms: submitSymptomps }
				})
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