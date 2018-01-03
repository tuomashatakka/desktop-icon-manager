// @flow
import { ADD_ICON, ADD_ICONS, REMOVE_ICON, UPDATE_ICON } from '../actions/items'
import type { Action } from '.'
// import type { Icon } from '../models/Icon'

let codepoint      = 0xf101
let startCodepoint = 0xf101

function parseIcon (icon) {
  let data = icon.toJSON()
  data.code = icon.code || codepoint++
  if (data.code < startCodepoint)
    throw new ReferenceError(`Invalid codepoint`)
  return data
}

export default function counter(state: Array<*> | void, action: Action) {
  switch (action.type) {

    case ADD_ICON:
      return [ ...state, parseIcon(action.icon) ]

    case UPDATE_ICON:
      // TODO
      return [ ...state, parseIcon(action.icon) ]

    case ADD_ICONS:
      return [ ...state, ...action.icons.map(parseIcon) ]

    case REMOVE_ICON:
      // TODO
      return state

    default:
      return state || []
  }
}
