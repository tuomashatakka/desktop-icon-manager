// @flow
import { ADD_ICON, ADD_ICONS, REMOVE_ICON, UPDATE_ICON } from '../actions/items'
import { LOAD_DATA } from '../actions/workspace'
import type { Action } from '.'
// import type { Icon } from '../models/Icon'

const startCodepoint  = 0xf101

let id = 0

function parseIcon (icon, getCodepoint) {
  let data  = icon.toJSON ? icon.toJSON() : icon
  data.code = icon.code || getCodepoint()
  data.id   = id++
  if (data.code < startCodepoint)
    throw new ReferenceError(`Invalid codepoint`)
  return data
}

function getLowestFreeCodepoint (items) {
  let iterator = startCodepoint
  while (items.find(item => item.code === iterator))
    iterator++
  return iterator
}

export default function counter (state: Array<*> | void, action: Action) {
  const boundGetCodepoint = getLowestFreeCodepoint.bind(null, state)

  switch (action.type) {

    case ADD_ICON:
      return [ ...state, parseIcon(action.icon, boundGetCodepoint) ]

    case UPDATE_ICON: {
      const icon  = parseIcon(action.icon, boundGetCodepoint)
      const index = state.findIndex(item => item.id === icon.id)

      if (index === -1)
        return [ ...state, icon ]
      state.splice(index, 1, icon)
      return [ ...state ]
    }

    case REMOVE_ICON:
      const index = state.findIndex(item => item.id === action.id)
      if (index > -1)
        state.splice(index, 1)
      return state

    case LOAD_DATA:
      return { ...action.data }

    default:
      return state || []
  }
}
