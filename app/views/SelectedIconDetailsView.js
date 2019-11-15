import React, { Component } from 'react'
import { connect } from "react-redux"

import * as action from '../actions/items'
import * as workspaceAction from '../actions/workspace'


class SelectedIconDetailsView extends Component {

  render () {
    if (!this.props.item)
      return null

    console.log(this.props.item)

    const updateName = e => {
      const name = e.target.value
      this.props.updateItem({ ...this.props.item, name })
    }

    const updateCode = e => {
      const code = e.target.value
      this.props.updateItem({ ...this.props.item, code })
    }

    const removeItem = () => {
      this.props.removeItem(this.props.item.id)
    }

    return <article id='item-details-pane'>

      <nav className='pane-toolbar'>
        <a className='btn' onClick={ this.props.deselectItem }>CLOSE</a>
        <a className='btn' onClick={ removeItem }>Remove item</a>
      </nav>

      <section className='form'>

        <div className='field'>
          <label>Name</label>
          <input
            value={ this.props.item.name }
            onChange={ updateName }
          />
        </div>

        <div className='field'>
          <label>Code</label>
          <input
            value={ this.props.item.code }
            onChange={ updateCode }
          />
        </div>

      </section>
    </article>
  }
}

function mapProperties (state) {
  const { selectedItem } = state.workspace
  return {
    item: state.items.find(item => item.id === selectedItem)
  }
}

function mapActions (dispatch) {
  const updateItem = (icon) =>
    dispatch(action.updateIcon(icon))
  const removeItem = (code) =>
    dispatch(action.removeIcon(code))
  const selectItem = (icon) =>
    dispatch(workspaceAction.selectItem(icon.code))
  const deselectItem = () =>
    dispatch(workspaceAction.deselectItem())
  return {
    updateItem,
    selectItem,
    deselectItem,
    removeItem,
  }
}

export default connect(mapProperties, mapActions)(SelectedIconDetailsView)
