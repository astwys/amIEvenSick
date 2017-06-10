import React, { Component } from 'react'
import './Symptom.css'
import { observer } from 'mobx-react'

export default observer (class Symptom extends Component {
	render() {
		const { symptom, hidden, added } = this.props
		// const { hidden } = this.props
		// const { added } = this.props

		return (
			<div className={ `Symptom ${hidden}` }>
				{symptom._source.name}
			</div>
		)
	}
})