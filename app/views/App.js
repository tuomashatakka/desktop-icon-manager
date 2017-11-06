// @flow
import type { Children } from 'react'
import type { GridProperties } from '../components/EditorGrid'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as action from '../actions/editor'


class App extends Component {

  props: {
    view: Children,
    children: Children,
    preferences: Children,
    setBlockNote: Function,
    setBlockStart: Function,
    setBlockDuration: Function,
  }

  constructor () {
    super (...arguments)
    this.state = {
      path: '/Users/tuomas/Projects/Modules/trinity-icons'
    }
  }

  componentWillMount () {
    this.resolveKey = this._resolveKey.bind(this)
    document.addEventListener('keydown', this.resolveKey)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.resolveKey)
  }

  _resolveKey (event) {
  }

  render() {
    return <div>
      {this.props.view || null}
      <input
        value={this.state.path}
        type='text'
        onChange={(event) => this.setState({ path: event.target.value })}
      />

      <section className='overlays'>
      </section>

    </div>
  }
}

function mapState (state, props) {
  let children    = props.children
  let samples     = state.editor.document.samples
  let grid        = state.editor.grid
  let view        = props.children

  return {
    grid,
    view,
    children,
    samples,
  }
}

function mapDispatch (dispatch) {

  let setBlockNote = f => dispatch(action.setBlockNote(f))
  let setBlockStart = f => dispatch(action.setBlockStart(f))
  let setBlockDuration = l => dispatch(action.setBlockDuration(l))
  let setBlockVelocity = A => dispatch(action.setBlockVelocity(A))
  return {
    setBlockNote,
    setBlockStart,
    setBlockDuration,
    setBlockVelocity,
  }
}


export default connect(mapState, mapDispatch)(App)
