import React, { Component } from 'react'
import './Symptomps.css'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'

import symptomps from '../../stores/symptomps'
import Symptomp from '../Symptomp/Symptomp'
import Loading from '../Loading/Loading'
import Form from '../Form/Form'

export default observer (class Symptomps extends Component {
	componentWillMount() {
		symptomps.fetch()
	}

	constructor() {
		super()

		extendObservable(this, {
			filter: "",
			userSymptomps: [],

			get filteredSymptomps() {
				var matchesFilter = new RegExp(this.filter)
		        return symptomps.models.filter(symptomp => matchesFilter.test(symptomp.get('title')))
			}
		})
	}

	setFilter(e) {
        this.filter = e.target.value
    }

    addSymptomp(symptomp) {
    	this.userSymptomps.push(symptomp)
    	this.filter = ""
    }

    removeSymptomp(symptomp) {
		this.userSymptomps = this.userSymptomps.filter((symp) => { return symp.id !== symptomp.id })
    }


	render() {
		if (symptomps.isRequest('fetching')) {
			return <Loading label='symptomps' />
		}
		
		let hidden = "hidden"
		if (this.filter !== "") {
			hidden = ""
		}

		return (
			<div className='Sympomps'>
				<div>
					<input type='text' className='filter' value={this.filter} onChange={this.setFilter.bind(this)} />
				</div>
				{
					this.filteredSymptomps.map(symptomp => (
						<button onClick={() => { this.addSymptomp(symptomp) }} className={ `Button ${hidden}` } key={symptomp.id}>
							<Symptomp symptomp={symptomp} hidden={hidden} />
						</button>
					))
				}
				{
					this.userSymptomps.map(symptomp => (
						<div key={symptomp.id}>
							<Symptomp symptomp={symptomp} />
							<button onClick={() => {this.removeSymptomp(symptomp) }} className="Button">&times;</button>
						</div>
					))
				}

				<Form symptomps={this.userSymptomps} />
			</div>
		)
	}
})