// @flow
import { combineReducers } from 'redux'
import items from './items'

export type Action = {
  +type: string,
  +params: object,
  label?: string,
}

const reducer = combineReducers({
  items,
})

export default reducer
