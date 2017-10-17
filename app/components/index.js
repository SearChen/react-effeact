import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router'
import {connect} from 'react-redux'


class Index extends PureComponent {
	constructor(props) {
		super(props)
	}
	
	state = {
		windowMode: 1,      //窗口状态
	}

	render() {
		return (
			<div>
				<Route path="/" component={Page}/>
				{/*<Route component={Editor}/>*/}
			</div>
		)
	}
}

export default connect(() => {
	return {}
})(Index)

