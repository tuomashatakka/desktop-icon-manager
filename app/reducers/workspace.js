// @flow
import { ZOOM_IN, ZOOM_OUT, SELECT_ITEM, DESELECT_ITEM, LOAD_DATA } from '../actions/workspace'
import type { Action } from '.'
// import type { Icon } from '../models/Icon'

export default function workspaceReducer (state: {} | void, action: Action) {
  switch (action.type) {

    case ZOOM_IN:
      return { ...state, scale: state.scale + 1 }

    case ZOOM_OUT:
      return { ...state, scale: Math.max(1, state.scale - 1) }

    case SELECT_ITEM:
      return { ...state, selectedItem: action.id }

    case DESELECT_ITEM:
      return { ...state, selectedItem: null }

    case LOAD_DATA:
      return { ...action.data }

    default:
      return state || {}
  }
}
