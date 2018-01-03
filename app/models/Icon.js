// @flow
import { readFileSync } from 'fs'

import views from '../views/views-registry'
import IconView from '../components/Icon'
import clean from '../utils/svg-cleanup'

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
      let path = this.properties.get('path')
      this[source] = readFileSync(path, 'utf8')
    }
    return clean(this[source])
  }

  getAbsolutePath () {
    return this.properties.get('path')
  }

  getCodepointString () {
    return '\\' + this.code.toString(16)
  }

  toJSON () {
    let data = {}
    for (let [attr, value] of this.properties.entries())
      data[attr] = value
    return data
  }
}


views.register(Icon, IconView)
