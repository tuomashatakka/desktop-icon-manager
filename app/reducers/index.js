// @flow
import { combineReducers } from 'redux'
import items from './items'
import preferences from './iconset'

export type Action = {
  +type: string,
  +params: object,
  label?: string,
}

const reducer = combineReducers({
  items,
  preferences,
})

export default reducer
