// @flow
export const ADD_ICON    = 'ADD_ICON'
export const ADD_ICONS   = 'ADD_ICONS'
export const REMOVE_ICON = 'REMOVE_ICON'
export const UPDATE_ICON = 'UPDATE_ICON'

export function addIcon (icon) {
  return {
    type: ADD_ICON,
    icon,
  }
}

export function addIcons (...icons) {
  return async function (dispatch, getState) {
    for (const icon of icons)
      await dispatch(addIcon(icon))
  }
}

export function removeIcon (id) {
  return {
    type: REMOVE_ICON,
    id,
  }
}

export function updateIcon (icon) {
  return {
    type: UPDATE_ICON,
    icon,
  }
}
