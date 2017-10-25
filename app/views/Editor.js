// @flow

import React, { Component } from 'react'
import {connect} from 'react-redux'
import decorate from '../reducers/connector'
import * as actions from '../actions/editor'
import Block from '../components/NoteBlock'
import EditorGrid from '../components/EditorGrid'
import MIDIInstructionComposite from '../models/MIDIInstructionComposite'

function getBlocks (state, note) {
  let blocks = state.editor.blocks
  return blocks.filter(block => block.properties.note === note)
}

export class Editor extends Component {
  props: {
    addBlock: Function,
    getState: () => EditorState,
    increaseResolution: Function,
    decreaseResolution: Function,
    blocks: Array<any>,
    grid: {
      size: number,
    },
  }
  static actions   = require('../actions/editor')
  static store_key = 'editor'
  tools = [
    'draw',
    'resize'
  ]

  constructor (props) {
    super(props)
    this.state = {
      visible: {
        x: 0,
        y: 0,
        x2: 100,
        y2: 128,
      },
      grid: {
        x: this.props.grid.size,
        y: this.props.grid.size,
        sub: 4,
        offset: [ 40, 0 ]
      },
    }
  }

  serializeNotes () {
    console.log(this.props)
    let list = MIDIInstructionComposite.from(this.props.getState())
    console.log(list.serialize())
  }

  render () {
    let note = this.state.visible.y2
    let grid = this.props.grid
    let gridStyle = {
      minHeight: this.props.grid.y,
      lineHeight: this.props.grid.y + 'px',
    }
    let rows = []
    while (--note >= this.state.visible.y)
      rows.push( <BoundRow key={note} note={note} grid={grid} /> )

    return <div className='editor'>

      <section className='toolbar'>
        <div className='btn' onClick={ this.props.increaseResolution.bind(null, 1) }>
          +
        </div>
        <div className='btn' onClick={ this.props.decreaseResolution.bind(null, 1) }>
          -
        </div>
        <div className='btn' onClick={ this.props.addBlock.bind(this, { note: 61 }) }>
          Add
        </div>
        <div className='btn' onClick={ this.serializeNotes.bind(this, { note: 61 }) }>
          Serialize (dev)
        </div>
      </section>

      <article className='note-area'>

        <EditorGrid offset={[40, 0]} />
        <div className='grid' style={gridStyle}>{rows}</div>
      </article>

    </div>
  }
}

export type RowType = {
  note: number,
  blocks: Array<BlockType>,
  addBlock: Function,
  clearSelection: Function,
  grid: {
    size: number,
    vertical: number,
    horizontal: number,
    sub: number,
  }
}

const NOTE_NAMES = [
  'A ',
  'A#',
  'B ',
  'C ',
  'C#',
  'D ',
  'D#',
  'E ',
  'F ',
  'F#',
  'G ',
  'G#',
]

function getNoteName (note: number): string {
  let n    = note % 12
  let name = NOTE_NAMES[n]
  if (n === 3) {
    let octave = (note - n) / 12 - 1
    name += ' ' + octave
  }
  return name
}

function snapToGrid (grid, co) {
  let { x, y } = co
  console.log(grid)
  if (x) {
    let g    = grid.horizontal
    let edge = (x % g) > g / 2 ? 1 : 0
    x = x - x % g + edge * g
  }
  if (y) {
    let g    = grid.vertical
    let edge = (y % g) > g / 2 ? 1 : 0
    y = y - y % g + edge * g
  }
  return { x, y }
}

const Row = ({ grid, note, blocks, addBlock, clearSelection }: RowType) => {

  let h      = grid.vertical + 'px'
  let name   = getNoteName(note)
  let height = {
    height: h,
    minHeight: h,
    maxHeight: h,
    lineHeight: h,
  }

  let containerElement
  let insert = (event) => {
    let offset = containerElement.getBoundingClientRect().left
    let start  = snapToGrid(grid, { x: event.pageX - offset }).x
    console.log("start", start)
    addBlock({ note , start })
  }

  return <div
    style={height}
    className='row'>

    <div
      onClick={insert}
      className={'row-number'} >
      { name }
    </div>

    <div
      ref={ ref => ref && (containerElement = ref) }
      className={'row-content'}
      onClick={clearSelection}
      onDoubleClick={insert}
      >

      { blocks.map(block => <Block
        id={block.id}
        key={block.id}
      />) }

    </div>

  </div>
}

const mapRowProps = (state, props) => {
  return {
    ...props,
    blocks: getBlocks(state, props.note),
  }
}

const mapRowDispatch = (dispatch, props) => ({
  addBlock: (block) => dispatch(actions.addBlock({ ...block, note: props.note })),
  clearSelection: () => dispatch(actions.clearSelection()),
})

const BoundRow = connect(mapRowProps, mapRowDispatch)(Row)

export default decorate(Editor)
