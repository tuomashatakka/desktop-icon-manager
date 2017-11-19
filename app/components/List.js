// @flow
import React from 'react'
import views from '../views/views-registry'

export type Properties = {
  items: Array<{}>,
}

const ListItem = ({ item }) =>
  <li className='list-item'>{views.get(item)}</li>

const List = (props: Properties) =>
  <ol className='list grid'>
    {props.items.map((item, key) =>
      <ListItem key={key} item={item} />)}
  </ol>

export default List
