// @flow
// import type { Children } from 'react'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Emitter } from 'event-kit'
import { Collection, Event } from 'disposable-events'

import * as action from '../actions/items'
import * as iconsetAction from '../actions/iconset'
import * as workspaceAction from '../actions/workspace'
import List from '../components/List'
import Icon from '../models/Icon'
import FileEntry from '../models/FileEntry'
import exportWebfont, { saveToLocalStorage, loadFromLocalStorage } from '../utils/export'

import SelectedIconDetails from "./SelectedIconDetailsView"

const signal = Symbol('event-emitter')


class ThrottledInput extends Component<*> {

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


type Properties = {
  name: String,
  size: number,
  scale: Number,
  icons: Array<*>,
  addIcon: Function,
  addIcons: Function,
  removeIcon: Function,
  updateName: Function,
  zoomIn: Function,
  zoomOut: Function,
}


class App extends Component<Properties> {

  constructor (props) {
    super(props)
    this.resolveKey   = this.resolveKey.bind(this)
    this.onDrop       = this.onDrop.bind(this)
    this.handlePinch  = this.handlePinch.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {

    const keydownDisposable = new Event({
      type: 'keydown',
      handler: this.resolveKey,
    })

    this.disposables = new Collection(keydownDisposable)

    this.styleEl.innerHTML = `:root {
      --scale: ${ this.props.scale };
    }`
  }

  componentWillUnmount () {
    this.disposables.dispose()
  }

  componentDidUpdate () {
    this.styleEl.innerHTML = `:root {
      --scale: ${ this.props.scale };
    }`
  }

  resolveKey (event) {
    console.log("Keydown event", event)
  }

  handleScroll (event) {
    console.log("Scroll event", event)
  }

  handlePinch (event) {

    event.persist()
    console.log("Pinch event", event)
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

  async save () {
    const store = await this.props.serialize()
    saveToLocalStorage('data', window._store)
    console.warn("Saving data:", window._store)
    console.warn("Saving data:", store)
  }

  async load () {
    const store = await loadFromLocalStorage('data')
    console.log(store)
    this.props.loadData(store)
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

    return <div
      className='root'
      onScroll={ this.handleScroll }
      onPointerMove={ this.handlePinch }
      onDrop={prevent(this.onDrop)}
      onDragEnd={logge('end')}
      onDragOver={logge('over')}>

      <header>
        <h2>
          <ThrottledInput
            value={ this.props.name }
            onDidStopChanging={(state) => {
              this.props.updateName(state.value)
            }}
          />
        </h2>
        <sub>{this.props.size} icons</sub>
      </header>

      <main className='browse'>
        <List items={this.props.icons} />
        <SelectedIconDetails />
      </main>

      <footer className='toolbar'>
        <h3 className='label'>Export</h3>
        {/* TODO */}
        {/* <a className='btn' onClick={this.export.bind(this, 'svg')}>SVG</a> */}
        <a className='btn' onClick={this.save.bind(this)}>Save</a>
        <a className='btn' onClick={this.load.bind(this)}>Load</a>
        <a className='btn' onClick={this.export.bind(this, 'font')}>Webfont</a>

        <aside className='toolbar-right'>
          <a className='btn' onClick={ this.props.zoomIn }>+</a>
          <a className='btn' onClick={ this.props.zoomOut }>-</a>
        </aside>

      </footer>

      <style ref={ ref => {
        if (ref)
          this.styleEl = ref
      }} />

    </div>
  }
}

function mapState (state) {
  let icons   = state.items.map(item => new Icon(item))
  let size    = state.items.length
  let scale   = state.workspace.scale
  let name    = state.preferences.name
  return { icons, size, scale, name }
}

function mapDispatch (dispatch) {

  const addIcon     = icon => dispatch(action.addIcon(icon))
  const addIcons    = (...icons) => dispatch(action.addIcons(...icons))
  const removeIcon  = icon => dispatch(action.removeIcon(icon))
  const updateName  = name => dispatch(iconsetAction.updateName(name))

  const zoomIn      = name => dispatch(workspaceAction.zoomIn(name))
  const zoomOut     = name => dispatch(workspaceAction.zoomOut(name))
  const serialize     = name => dispatch(workspaceAction.serializeData())
  const loadData     = name => dispatch(workspaceAction.loadData())

  return {
    addIcon,
    addIcons,
    removeIcon,
    updateName,
    zoomIn,
    zoomOut,
    serialize,
    loadData,
  }
}


export default connect(mapState, mapDispatch, )(App)
