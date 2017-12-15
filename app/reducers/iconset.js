// @flow
import { UPDATE_NAME } from '../actions/iconset'
import type { Action } from '.'
// import type { Icon } from '../models/Icon'

export default function iconsetReducer (state: {} | void, action: Action) {
  switch (action.type) {
    case UPDATE_NAME:
      return { name: action.name }
    default:
      return state || {}
  }
}
