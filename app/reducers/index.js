// @flow
import { combineReducers } from 'redux'
import items from './items'
import preferences from './iconset'
import workspace from './workspace'

export type Action = {
  +type: string,
  +params: object,
  label?: string,
}

export default combineReducers({
  items,
  workspace,
  preferences,
})
