// @flow
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'

import rootReducer from '../reducers'

const history = createHashHistory()

function configureStore(initialState?: counterStateType) {
  const enhancer = applyMiddleware(thunk)
  return createStore(rootReducer, initialState, enhancer)
}

export default { configureStore, history }
