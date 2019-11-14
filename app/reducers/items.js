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

    case UPDATE_ICON: {
      const icon  = parseIcon(action.icon)
      const index = state.findIndex(item => item.code === icon.code)

      if (index === -1)
        return [ ...state, icon ]
      state.slice(0, index)
      state.splice(index, 1, icon)
      return [ ...state ]
    }

    case ADD_ICONS:
      return [ ...state, ...action.icons.map(parseIcon) ]

    case REMOVE_ICON:
      // TODO
      return state

    default:
      return state || []
  }
}
