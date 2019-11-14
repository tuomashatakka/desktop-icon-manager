// @flow
import { readFileSync } from 'fs'

import views from '../views/views-registry'
import IconView from '../components/Icon'
// import clean from '../utils/svg-cleanup'

let source = Symbol('file-contents')


export type IconData = {
  name: string,
  path: string,
  code: number,
}


export default class Icon {

  constructor (properties) {
    this.properties = new Map(Object.entries(properties))
  }

  set name (value) {
    this.properties.set('name', value)
  }

  get name () {
    return this.properties.get('name')
      .trim()
      .replace(/(\s+)/ig, '-')
      .replace(/([^\w]+)/ig, '')
  }

  get path () {
    return this.getAbsolutePath()
  }

  get code () {
    return this.properties.get('code')
  }

  get source () {
    if (!this[source]) {
      const path   = this.properties.get('path')
      this[source] = readFileSync(path, 'utf8')
    }
    return this[source]
    // return clean(this[source])
  }

  getAbsolutePath () {
    return this.properties.get('path')
  }

  getCodepointString () {
    return '\\' + this.code.toString(16)
  }

  toJSON () {
    const data = {}
    for (const [ attr, value ] of this.properties.entries())
      data[attr] = value
    return data
  }
}


views.register(Icon, IconView)
