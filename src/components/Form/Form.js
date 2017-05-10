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
		// symptomps.forEach(function(symp) {
		// 	fetch(`https://jsonplaceholder.typicode.com/todos/${symp.attributes._data.id.value}`)
		// 		.then((result) => {
		// 			return result.json()
		// 		})
		// 		.then((output) => {
		// 			//console.log(output)
		// 			submitSymptomps.add([output])
		// 			console.log(submitSymptomps.toArray())
		// 			console.log(this.userSymptomps)
		// 		})
		// })
		let uri = ""
		symptomps.forEach(symp => {
			uri+=symp.attributes._data.id.value + '/'
		})

		fetch(`https://jsonplaceholder.typicode.com/todos/${uri}`)
			.then(result => {return result.json()})
			.then(output => submitSymptomps.add([output]))
			.then(() => {
				this.context.router.history.push({
     				pathname: 'sicknesses',
     				state: {symptoms: submitSymptomps}
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