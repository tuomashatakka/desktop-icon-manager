// @flow
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createHashHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'

import rootReducer from '../reducers'
import * as iconActions from '../actions/items'

const history = createHashHistory()

const configureStore = (initialState: {}) => {

  const middleware = []
  const enhancers  = []

  const logger = createLogger({
    level: 'info',
    collapsed: true
  })

  middleware.push(thunk)
  middleware.push(logger)

  // Redux DevTools Configuration
  const actionCreators = {
    ...iconActions,
  }
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators })
    : compose
  enhancers.push(applyMiddleware(...middleware))

  const enhancer = composeEnhancers(...enhancers)
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot)
    module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers')))
  return store
}

export default { configureStore, history }
