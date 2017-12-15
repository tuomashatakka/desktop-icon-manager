// @flow
import { ADD_ICON, ADD_ICONS, REMOVE_ICON, UPDATE_ICON } from '../actions/items'
import type { Action } from '.'
// import type { Icon } from '../models/Icon'

export default function counter(state: Array<*> | void, action: Action) {
  switch (action.type) {
    case ADD_ICON:
      return [ ...state, action.icon.toJSON() ]
    case UPDATE_ICON:
      // TODO
      return [ ...state, action.icon.toJSON() ]
    case ADD_ICONS:
      return [ ...state, ...action.icons.map(icon => icon.toJSON()) ]
    case REMOVE_ICON:
      return state
    default:
      return state || []
  }
}
