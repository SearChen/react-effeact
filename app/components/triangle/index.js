import React, {PureComponent} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Motion, spring} from 'react-motion'
import withCss from '@/services/withCss'
import styles from './triangle.less'

@withCss(styles)
class Effect extends PureComponent {
	constructor(props) {
		super(props)
	}

	state = {}
	static defaultProps = {}

	render() {
		return (
			<div>
				<div styleName="page"></div>
				<div styleName="image-layer" id="image-layer">
				</div>
				<div styleName="demo">
					<div>
						<i></i>
						<i></i>
						<i></i>
						<i></i>
						<i></i>
						<i></i>
						<i></i>
						<i></i>
					</div>
				</div>
			</div>
		)
	}
}

export default Effect;