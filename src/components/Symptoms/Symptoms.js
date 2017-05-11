import React, { Component } from 'react'
import './Symptoms.css'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'

import symptoms from '../../stores/symptoms'
import Symptom from '../Symptom/Symptom'
import Loading from '../Loading/Loading'
import Form from '../Form/Form'

export default observer (class Symptoms extends Component {
	componentWillMount() {
		symptoms.fetch()
	}

	constructor() {
		super()

		extendObservable(this, {
			filter: "",
			userSymptoms: [],

			get filteredSymptoms() {
				var matchesFilter = new RegExp(this.filter)
		        return symptoms.models.filter(symptom => matchesFilter.test(symptom.get('title')))
			}
		})
	}

	setFilter(e) {
        this.filter = e.target.value
    }

    addSymptom(symptom) {
    	this.userSymptoms.push(symptom)
    	this.filter = ""
    }

    removeSymptomp(symptom) {
		this.userSymptoms = this.userSymptoms.filter((symp) => { return symp.id !== symptom.id })
    }


	render() {
		if (symptoms.isRequest('fetching')) {
			return <Loading label='symptoms' />
		}
		
		let hidden = "hidden"
		if (this.filter !== "") {
			hidden = ""
		}

		return (
			<div className='Sympoms'>
				<div>
					<input type='text' className='filter' value={this.filter} onChange={this.setFilter.bind(this)} />
				</div>
				{
					this.filteredSymptoms.map(symptom => (
						<button onClick={() => { this.addSymptom(symptom) }} className={ `Button ${hidden}` } key={symptom.id}>
							<Symptom symptom={symptom} hidden={hidden} />
						</button>
					))
				}
				{
					this.userSymptoms.map(symptom => (
						<div key={symptom.id}>
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