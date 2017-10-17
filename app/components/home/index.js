import React, {PureComponent} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {openPop} from '@/redux/action/pop'

class Home extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                Home
            </div>
        )
    }
}

const mapStateToProps = function () {
    return {}
}

const mapDispatchProps = function (dispatch) {
    return {
        openPop: (entry, data) => {
            dispatch(openPop(entry, data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Home)


