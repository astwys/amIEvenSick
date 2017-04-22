import React, { Component } from 'react'
import './Symptomps.css'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom';

import symptomps from '../../stores/symptomps'
import Symptomp from '../Symptomp/Symptomp'
import Loading from '../Loading/Loading'

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
				<input type='text' className='filter' value={this.filter} onChange={this.setFilter.bind(this)} />
				<div>
					<Link to="/sicknesses">Check Sicknesses</Link>
				</div>
				{
					this.filteredSymptomps.map(symptomp => (
						<button onClick={() => { this.addSymptomp(symptomp) }} className={hidden} key={symptomp.id}>
							<Symptomp key={symptomp.id} symptomp={symptomp} hidden={hidden} />
						</button>
					))
				}
				{
					this.userSymptomps.map(symptomp => (
						<Symptomp key={symptomp.id} symptomp={symptomp} />	
					))
				}
			</div>
		)
	}
})