import React, { PropTypes } from 'react'


function UserDetailWrapper ({header, children}) {
	return (
		<div className = 'col-sm-6'>
			<p className = 'lead'>{header}</p>
			{children}
		</div>
	)
}

module.exports = UserDetailWrapper;