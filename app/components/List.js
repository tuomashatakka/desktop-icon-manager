// @flow
import React from 'react'
import views from '../views/views-registry'

export type Properties = {
  items: Array<{}>,
}

const ListItem = ({ item }) =>
  <li className='list-item'>
    { views.get(item) }
  </li>

export default class List extends React.Component<Properties> {
  render () {
    console.log("Rendering list", this.props)
    return <ol className='list grid'>
      {this.props.items.map((item, key) =>
        <ListItem key={key} item={item} />
        )}
    </ol>
  }
}
