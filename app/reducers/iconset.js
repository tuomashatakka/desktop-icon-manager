// @flow
import { UPDATE_NAME, ZOOM_IN, ZOOM_OUT } from '../actions/iconset'
import { LOAD_DATA } from '../actions/workspace'
import type { Action } from '.'
// import type { Icon } from '../models/Icon'

export default function iconsetReducer (state: {} | void, action: Action) {
  switch (action.type) {

    case UPDATE_NAME:
      return { ...state, name: action.name }

    case LOAD_DATA:
      return { ...action.data }

    default:
      return state || {}
  }
}
