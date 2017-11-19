// @flow
export const ADD_ICON    = 'ADD_ICON'
export const ADD_ICONS   = 'ADD_ICONS'
export const REMOVE_ICON = 'REMOVE_ICON'

export function addIcon (icon) {
  return {
    type: ADD_ICON,
    icon,
  }
}

export function addIcons (...icons) {
  return {
    type: ADD_ICONS,
    icons,
  }
}

export function removeIcon (icon) {
  return {
    type: REMOVE_ICON,
    icon,
  }
}
