import React, { Component } from 'react'
import './Symptoms.css'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'

import Form from '../Form/Form'


import Symptom from '../Symptom/Symptom'

require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'

import '../../../node_modules/choices.js/assets/styles/css/choices.css'

export default observer (class Symptoms extends Component {

	constructor() {
		super()

		extendObservable(this, {
			filter: "",
			body: {
				"query": {
					"match": {
						"name": ""
					}
				}
			},
			symptomsFetch: [],
			userSymptoms: []
		})
	}

	async setFilter(e) {
		this.filter = e.target.value
		if (this.filter !== "") {
			await this.fetchData();
		}
	}

	fetchData() {
		this.symptomsFetch = []
		this.body.query.match.name = this.filter
		fetch('https://first-cluster-1485543977.eu-west-1.bonsaisearch.net/amisick/symptom/_search', {
				method: 'POST',
				headers: {
					'Authorization': 'Basic '+btoa('3tqci0amyj:l2s1jag1tn'), 
					'Accept': 'application/json',
                	'Content-Type': 'application/json',
				},
				body: JSON.stringify(this.body)
			})
			.then(result => { return result.json() })
			.then(output => { return output.hits.hits })
			.then(hits => {
				hits.map(hit => 
					this.symptomsFetch.push(hit)
				)
			})
	}

	
	addSymptom(symptom) {
		this.userSymptoms.push(symptom)
		this.filter = ""
	}

	removeSymptom(symptom) {
		this.userSymptoms = this.userSymptoms.filter(symp => { return symp._source !== symptom._source })
	}
	

	render() {

		let hidden = "hidden"
		if (this.filter !== "") {
			hidden = ""
		}

		return (
			<div className='symptoms'>
				<div className='input'>
					<input type='text' className='filter' value={this.filter} onChange={this.setFilter.bind(this)} />
				</div>

				{
					this.symptomsFetch.map(symptom => (
						<button onClick={() => { this.addSymptom(symptom) }} className={ `Button ${hidden}` } key={symptom._id}>
							<Symptom symptom={symptom} hidden={hidden} />
						</button>
					))
				}
				{
					this.userSymptoms.map(symptom => (
						<div key={symptom._id}>
							<Symptom symptom={symptom} />
							<button onClick={() => {this.removeSymptom(symptom) }} className="Button">&times;</button>
						</div>
					))
				}

				<Form symptoms={this.userSymptoms} />
			</div>
		)
	}
})