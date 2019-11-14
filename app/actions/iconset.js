// @flow
export const ZOOM_IN      = 'ZOOM_IN'
export const ZOOM_OUT     = 'ZOOM_OUT'
export const UPDATE_NAME  = 'UPDATE_NAME'

export function updateName (name) {
  return {
    type: UPDATE_NAME,
    name,
  }
}
