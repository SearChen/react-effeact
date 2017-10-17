import ReactDom from 'react-dom'
import React, {PureComponent} from 'react'
import {Router, Route, Switch, Redirect} from 'react-router'
import {createMemoryHistory} from 'history'
import WaterFall from '@/components/waterfall/index'
import Home from '@/components/home/index'
import '@/styles/reset.css'
import '@/styles/index.less'
import {Provider} from 'react-redux'
import store from '@/redux/store'
import Perf from 'react-dom/lib/ReactPerf'      //偏好设置

window.Perf = Perf

const history = createMemoryHistory()
window.MRHistory = history

history.listen(location => {
	console.log(location.pathname, 1231)
})

class App extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route path="/" component={Home}/>
                        <Route path="/waterfall" component={WaterFall}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

ReactDom.render((<App />), document.getElementById('app'))