// @flow
import type { Children } from 'react'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as action from '../actions/items'
import List from '../components/List'
import Icon from '../models/Icon'


class App extends Component {

  props: {
    size: number,
    icons: Array<*>,
    addIcon: Function,
    addIcons: Function,
    removeIcon: Function,
  }

  constructor () {
    super (...arguments)
    this.state = {
      path: '/Users/tuomas/Projects/Modules/trinity-icons'
    }

    this.onDrop = this.onDrop.bind(this)
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

  onDrop (event) {
    let files = [ ...event.dataTransfer.files ]
    console.log(files)
    let icons = files.map(file => ({
      path: file.path,
      type: file.type,
      name: file.name,
      size: file.size,
    }))
    if (icons.length)
      this.props.addIcons(...icons)
  }

  export (format) {
    alert("Exportin'" + format)
  }

  render() {

    let logge = name => e => {
      e.persist()
      console.log(name, e)
      e.preventDefault()
    }
    let prevent = fn => event => {
      event.preventDefault()
      fn(event)
      return false
    }

    return <div
      className='root'
      onDrop={prevent(this.onDrop)}
      onDragEnd={logge('end')}
      onDragOver={logge('over')}
      >
      <input
        type='text'
        value={this.state.path}
        onChange={(event) => this.setState({ path: event.target.value })}
      />

      <header>
        <h2>
          <input defaultValue='Icon set' />
        </h2>
        <sub>{this.props.size} icons</sub>
      </header>

      <main className='browse'>
        <List items={this.props.icons} />
      </main>

      <footer className='toolbar'>
        <h3 className='label'>Export</h3>
        <a className='btn' onClick={this.export.bind(this, 'svg')}>SVG</a>
        <a className='btn' onClick={this.export.bind(this, 'font')}>Webfont</a>
      </footer>

    </div>
  }
}

function mapState (state) {
  let icons = state.items.map(item => new Icon(item))
  let size  = state.items.length
  return { icons, size }
}

function mapDispatch (dispatch) {

  let addIcon = icon => dispatch(action.addIcon(icon))
  let addIcons = (...icons) => dispatch(action.addIcons(...icons))
  let removeIcon = icon => dispatch(action.removeIcon(icon))
  return {
    addIcon,
    addIcons,
    removeIcon,
  }
}


export default connect(mapState, mapDispatch)(App)
