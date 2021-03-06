import React, { Component } from 'react'
import './Symptoms.css'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'

import Symptom from '../Symptom/Symptom'
import Form from '../Form/Form'

require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'

export default observer (class Symptoms extends Component {

	constructor() {
		super()

		extendObservable(this, {
			filter: "",
			body: {
				"query": {
					"match_phrase_prefix": {
						"name": ""
					}
				}
			},
			symptomsFetch: [],
			userSymptoms: [],
			debounced: null
		})
	}

	async setFilter(e) {
		this.filter = e.target.value
		if (this.filter !== "") {
			await this.fetchData()
		}
	}

	fetchData() {
		this.symptomsFetch.length = 0
		this.body.query.match_phrase_prefix.name = this.filter
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

	addSymptomOnEnter(e) {
		if (e.keyCode === 13) {
			this.addSymptom(this.symptomsFetch[0])
		}
	}
	
	addSymptom(symptom) {
		this.userSymptoms.push(symptom)
		this.removeFilterAndFocus()
	}

	removeSymptom(symptom) {
		this.userSymptoms = this.userSymptoms.filter(symp => { return symp._source !== symptom._source })
	}
	
	removeFilterAndFocus() {
		this.filter = ""
		document.getElementsByClassName('filter')[0].select()
	}

	render() {

		let hidden = "hidden"
		if (this.filter !== "") {
			hidden = ""
		}

		return (
			<div className='symptoms'>
				<div className='input'>
					<input type='text' 
						   className='filter' 
						   value={this.filter} 
						   onChange={this.setFilter.bind(this)} 
						   onKeyUp={this.addSymptomOnEnter.bind(this)}
						   placeholder="Search for your symptoms"/>
					<Form symptoms={this.userSymptoms} />
				</div>
				
				<hr></hr>

				<div className='optionWrapper'>
					<div className='options'>
					{
						this.symptomsFetch.map(symptom => (
							<button onClick={() => { this.addSymptom(symptom) }} className={ `Button option ${hidden}` } key={symptom._id}>
								<Symptom symptom={symptom} hidden={hidden} />
							</button>
						))
					}
					</div>
					<div className='chosen'>
					{
						this.userSymptoms.map(symptom => (
							<div key={symptom._id} className='added'>
								<Symptom symptom={symptom}/>
								<button onClick={() => {this.removeSymptom(symptom) }} className='Button'>&times;</button>
							</div>
						))
					}
					</div>
				</div>
			</div>
		)
	}
})