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
  updateName: string => void,
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

    const toggleItem = (e) => {
      if (e.isDefaultPrevented())
        return
      if (selected)
        this.props.deselectItem()
      else
        this.props.selectItem(this.props.item)
    }

    return <article className={ className } onClick={ toggleItem }>

      <aside className='properties' onClick={ e => {
        e.persist()
        console.log(e)
        e.preventDefault()
        return false
      }}>
        <h3 className='meta name'>
          <input
            value={ item.properties.get('name') }
            onChange={ e => {
              item.name = e.target.value
              this.props.updateName(item)
            }}
          />
        </h3>

        {/* <input className='field' defaultValue={item.properties.get('name')} /> */}
        <span className='meta size'>{kb(item.properties.get('size'))}</span>
        <span className='meta code'>{codept(item.code)}</span>
      </aside>

      <div className='source' ref={ref => ref && this.applyContent(ref)} />

    </article>
  }
}

function mapProps (state, props) {
  return {
    selected: state.workspace.selectedItem === props.item.code
  }
}

function mapDispatch (dispatch) {
  const updateName = (icon) =>
    dispatch(action.updateIcon(icon))
  const selectItem = (icon) =>
    dispatch(workspaceAction.selectItem(icon.code))
  const deselectItem = () =>
    dispatch(workspaceAction.deselectItem())
  return {
    updateName,
    selectItem,
    deselectItem,
  }
}


export default connect(mapProps, mapDispatch)(Icon)
