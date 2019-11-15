// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as action from '../actions/items'
import * as workspaceAction from '../actions/workspace'

const kb = val => {
  let fixed = (val / 1024).toFixed(0)
  return fixed + ' kb'
}

const trim = text => {
  return text.replace(/([^\w\d])/g, ' ').replace(/\s+([\w\d]+)$/g, '')
}

const codept = pt =>
  '\\' + pt.toString(16)

export type Properties = {
  item: {
    properties: Map<string, *>,
    source: string,
  },
  selected: Boolean,
  selectItem: ({ code: number }) => void,
  deselectItem: () => void,
  // {
  //   path: string,
  //   name: string,
  //   size: number,
  //   code?: string,
  //   class?: string,
  // }
}


class Icon extends Component<Properties> {

  applyContent (element) {
    element.innerHTML = this.props.item.source
  }

  render () {
    const { item, selected } = this.props

    let className = 'tile'

    if (selected)
      className += ' selected'

    const toggleItem = () => {
      if (selected)
        this.props.deselectItem()
      else
        this.props.selectItem(this.props.item.properties.get('id'))
    }

    return <article className={ className } onClick={ toggleItem }>
      <div className='source' ref={ref => ref && this.applyContent(ref)} />
      <h4>{ item.properties.get('name') }</h4>
    </article>
  }
}

function mapProps (state, props) {
  return {
    selected: state.workspace.selectedItem === props.item.properties.get('id')
  }
}

function mapDispatch (dispatch) {
  const selectItem = (id) =>
    dispatch(workspaceAction.selectItem(id))
  const deselectItem = () =>
    dispatch(workspaceAction.deselectItem())
  return {
    selectItem,
    deselectItem,
  }
}


export default connect(mapProps, mapDispatch)(Icon)
