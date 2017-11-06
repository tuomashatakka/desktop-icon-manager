// @flow
import { Provider } from 'react-redux'
import React from 'react'

import App from './App'


type RootType = {
  store: {},
  history?: {}
}


export default function Root({ store }: RootType) {
  return (
    <Provider store={store}>
      <App></App>
    </Provider>
  )
}
