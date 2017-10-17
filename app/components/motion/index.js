import React, {PureComponent} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Motion, spring} from 'react-motion'
import withCss from '@/services/withCss'
import styles from './motion.less'

@withCss(styles)
class Effect extends PureComponent {
	constructor(props) {
		super(props)
	}

	state = {
		activeSort: 'all'
	}
	static defaultProps = {
		tabList: [{
			txt: '全部的单品',
			key: 'all',
		}, {
			txt: '上传的单品',
			key: 'upload',
		}, {
			txt: '收藏的品牌',
			key: 'collect',
		}]
	}
	onClick = (key) => {
		this.setState({
			activeSort: key
		})
	}

	render() {
		let {tabList} = this.props, {activeSort} = this.state;
		return (
			<div styleName="toggle-bar">
				<ul>
					{
						tabList && tabList.map((li, i) => {
							return (
								<li key={'key' + i} onClick={() => {
									this.onClick(li.key)
								}}>
                                    <span styleName={`${activeSort == li.key ? " leftActive" : ""}`}>
                                        {li.txt}
										<span styleName="a"></span>
                                    </span>
								</li>
							)
						})
					}
				</ul>
				<div styleName="m-line">
					<Motion style={{x: spring(this.state.open ? 400 : 0), activeSort: activeSort}}>
						{({x, activeSort}) =>
							// children is a callback which should accept the current value of
							// `style`
							<div styleName="nav-context">
								<ul>
									{
										tabList && tabList.map((li, i) => {
											return (
												<li key={'key' + i} onClick={() => {
													this.onClick(li.key)
												}}>
													<span styleName={`${activeSort == li.key ? " leftActive" : ""}`}>
														{li.txt}
														<span styleName="a"></span>
													</span>
												</li>
											)
										})
									}
								</ul>
							</div>
						}
					</Motion>
				</div>
			</div>
		)
	}
}

export default Effect;