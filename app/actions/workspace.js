// @flow
export const ZOOM_IN        = 'ZOOM_IN'
export const ZOOM_OUT       = 'ZOOM_OUT'
export const SELECT_ITEM    = 'Select item'
export const DESELECT_ITEM  = 'Deselect item'
export const SERIALIZE      = 'Serialize data'
export const LOAD_DATA      = 'Deserialize/load data'

export function zoomIn () {
  return {
    type: ZOOM_IN,
  }
}

export function zoomOut () {
  return {
    type: ZOOM_OUT,
  }
}

export function selectItem (id) {
  return {
    type: SELECT_ITEM,
    id,
  }
}

export function deselectItem () {
  return {
    type: DESELECT_ITEM,
  }
}

const serialize = () => ({
  type: SERIALIZE,
})

export function serializeData () {
  return async function (dispatch, getState) {
    console.warn("Serializing data")
    window._store = getState()

    await dispatch(serialize())
  }
}

export function loadData (data) {
  return {
    type: LOAD_DATA,
    data,
  }
}
