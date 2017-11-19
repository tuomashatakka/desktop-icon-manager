// @flow
import { ADD_ICON, ADD_ICONS, REMOVE_ICON } from '../actions/items'
import type { Action } from '.'

export default function counter(state: Array<*> | void, action: Action) {
  switch (action.type) {
    case ADD_ICON:
      return [ ...state, action.icon ]
    case ADD_ICONS:
      return [ ...state, ...action.icons ]
    case REMOVE_ICON:
      return state
    default:
      return state || []
  }
}
