import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer/index'
import {setingWindowMode} from './action/appSetting'
import debounce from 'lodash/debounce'

const composeEnhancers =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
const enhancer = composeEnhancers(applyMiddleware(thunk))
let store = createStore(
	rootReducer,
	enhancer
)
window.addEventListener('resize', debounce(function () {
	store.dispatch(setingWindowMode())
}, 400), false)
export default store