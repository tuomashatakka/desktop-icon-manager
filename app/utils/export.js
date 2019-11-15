// @flow
import { resolve, basename, extname } from 'path'
import { mkdirSync, existsSync } from 'fs'
import webfont from 'webfonts-generator'

import type { IconData } from '../models/Icon'



export default function generateIconFont (icons: Array<IconData> = [], dest = 'output/') {

  let names = []
  let rename = path => {
    let name = icons.find(icon => icon.getAbsolutePath() === path).name
    let n    = 1
    while (names.includes(name))
      name = name.replace(/(-\d+)?$/, n++)
    names.push(name)
    return name
    // let base = basename(name)
    // let ext  = extname(name)
    // return base.substr(0, base.length - ext.length)
  }
  let fontName = 'icon-set'

  let cssTemplate = resolve(__dirname, '../templates/css.hbs')
  let htmlTemplate = resolve(__dirname, '../templates/html.hbs')

  let codes      = {}
  let files      = []
  let codepoints = {}

  icons.forEach(icon => {
    let name         = icon.name
    codes[name]      = icon.getCodepointString()
    codepoints[name] = icon.code
    files.push(icon.getAbsolutePath())
  })

  let templateOptions = {
    classPrefix: 'icon-',
    baseSelector: '.icon',
    author: 'Tuomas Hatakka',
    date: new Date(),
    codes,
  }

  return new Promise((resolve, reject) => {

    let errorCallback = error => reject(error)
    let successCallback = () => {
      resolve()
      // generateArchive(archiveDest, dest)
      //   .then(resolve)
      //   .catch(reject)
    }

    const onFinished = error => error
      ? errorCallback(error)
      : successCallback()

    if (!existsSync(dest))
      mkdirSync(dest)

    webfont(
      {
        css: true,
        html: true,
        files,
        dest,
        fontName,
        templateOptions,
        rename,
        htmlTemplate,
        cssTemplate,
        codepoints,
      },
      onFinished
    )
  })
}

export function saveToLocalStorage (key, value = null) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromLocalStorage (key) {
  return JSON.parse(localStorage.getItem(key) || 'null')
}
