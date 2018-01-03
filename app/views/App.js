// @flow
// import type { Children } from 'react'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Emitter } from 'event-kit'

import * as action from '../actions/items'
import * as iconsetAction from '../actions/iconset'
import List from '../components/List'
import Icon from '../models/Icon'
import FileEntry from '../models/FileEntry'
import exportWebfont from '../utils/export'

const signal = Symbol('event-emitter')

class ThrottledInput extends Component {

  constructor (props) {
    super(props)
    this[signal] = new Emitter()
    this.state = { value: props.value || '' }
    if (props.onDidStopChanging)
      this.onStopChanging(props.onDidStopChanging)
  }
  onStopChanging (callback) {
    this[signal].on('did-stop-changing', callback)
  }

  render () {

    const changed = () => {
      this[signal].emit('did-stop-changing', this.state)
    }
    const dispatch = throttle(changed, 500)
    const onChange = event => {
      this.setState({ value: event.target.value })
      dispatch()
    }
    return <input
      value={this.state.value}
      onChange={onChange} />
  }
}

function throttle (callback, timeout) {
  let bound = 60
  return () => {
    this.started = Date.now()
    setTimeout(() => {
      let now = Date.now()
      console.log("Testing", now - this.started > timeout - bound)
      if (now - this.started > timeout - bound)
        callback()
    }, timeout)
  }
}
throttle = throttle.bind(throttle)
class App extends Component {

  props: {
    size: number,
    icons: Array<*>,
    addIcon: Function,
    addIcons: Function,
    removeIcon: Function,
    updateName: Function,
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

  _resolveKey () {
  }

  async onDrop (event) {
    let files = [ ...event.dataTransfer.files ]
    files.forEach(async f => {
      let entry = new FileEntry(f)
      let icons = await entry.read('.svg')
      if (icons.length)
        this.props.addIcons(...icons)
    })

  }

  async export (format) {
    // alert("Exportin'" + format)
    let result = await exportWebfont(this.props.icons)
    window.result = result
    alert("DONE :)")
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

    console.log(this.props.icons)

    return <div
      className='root'
      onDrop={prevent(this.onDrop)}
      onDragEnd={logge('end')}
      onDragOver={logge('over')}>

      <input
        type='text'
        value={this.state.path}
        onChange={(event) => this.setState({ path: event.target.value })}
      />

      <header>
        <h2>
          <ThrottledInput
            value='Icon set'
            onDidStopChanging={(state) => {
              this.props.updateName({ name: state.value })
            }}
          />
        </h2>
        <sub>{this.props.size} icons</sub>
      </header>

      <main className='browse'>
        <List items={this.props.icons} />
      </main>

      <footer className='toolbar'>
        <h3 className='label'>Export</h3>
        {/* TODO */}
        {/* <a className='btn' onClick={this.export.bind(this, 'svg')}>SVG</a> */}
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
  let updateName = name => dispatch(iconsetAction.updateName(name))

  return {
    addIcon,
    addIcons,
    removeIcon,
    updateName,
  }
}


export default connect(mapState, mapDispatch)(App)
