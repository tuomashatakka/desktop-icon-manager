import { loadFromLocalStorage } from '../utils/export'


const store = {
  // exportPath: '.',
  items:      [ ],
  workspace: {
    selectedItem: null,
    scale:  10,
  },
  preferences: {
    name:   'Icon set',
  },
}

const loadedStore = null // loadFromLocalStorage('data')

export default loadedStore || store
