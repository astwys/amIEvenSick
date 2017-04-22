import React, { Component } from 'react'
import './Symptomp.css'
import { observer } from 'mobx-react'

export default observer (class Symptomp extends Component {
	render() {
		const { symptomp } = this.props
		const { hidden } = this.props

		return (
			<div className={ `Symptomp ${hidden}` }>
				{symptomp.get('title')}
			</div>
		)
	}
})