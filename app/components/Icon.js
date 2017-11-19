// @flow
import React from 'react'
import { connect } from 'react-redux'

const kb = val => {
  let fixed = (val / 1024).toFixed(0)
  return fixed + ' kb'
}

const trim = text => {
  return text.replace(/([^\w\d])/g, ' ').replace(/\s+([\w\d]+)$/g, '')
}

export type Properties = {
  item: {
    path: string,
    name: string,
    size: number,
    code?: string,
    class?: string,
  }
}

const Icon = ({ item }: Properties) => {
  return <article className='tile'>
    <h3 className='meta name'>{trim(item.name)}</h3>
    <input className='field' defaultValue={item.name} />
    <span className='meta size'>{kb(item.size)}</span>
    <img src={item.path} />
  </article>
}

export default Icon
