import React, { Component } from 'react'
import './Navbar.css'

export default class Navbar extends Component {
	render() {
		return (
			<div className='navbar'>
				<div className='projectName'>
					<span><a href='/'>Am I Even Sick?</a></span>
				</div>
			</div>
		)
	}
}