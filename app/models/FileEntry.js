import { extname, basename } from 'path'
import { stat, readdir } from 'fs'
import { Emitter } from 'event-kit'
import Icon from './Icon'

const signal = Symbol('event-emitter')

export default class FileEntry {

  constructor (source) {
    this[signal] = new Emitter()
    this.errors  = []
    this.path    = source.path
    this.promise = promise.bind(this)

    this.stat = this.promise(stat, this.path)
  }

  addError (error) {
    this.errors.push(error)
  }

  async isDirectory () {
    let stats = await this.stat
    console.log(this, stats)
    return stats.isDirectory()
  }

  async read (ext = null) {
    let results = []
    let isdir = await this.isDirectory()

    if (isdir) {
      let entries = await this.promise(readdir, this.path)
      results.push(...entries.map(path => this.path + '/' + path))
    }
    else
      results.push(this.path)

    if (ext)
      results = results.filter(entry => extname(entry) === ext)
    let items = await Promise.all(results.map(statIcon))
    items = items.filter((o) => o !== null)
    return items
  }
}

async function statIcon (path) {
  let stats = await promise(stat, path)
  if (stats.isFile())
    return new Icon({
      path,
      type: extname(path),
      name: basename(path),
      size: stats.size,
    })
  return null
}

function promise (fn, ...args){
  const reject = (this && this.addError) ? this.addError.bind(this) : (error) => console.error(error)
  return new Promise((resolve) => {
    fn(...args, (error, result) => {
      if (error)
        reject(error)
      return resolve(result)
    })
  })
}
