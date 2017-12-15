// @flow
import React from 'react'

const kb = val => {
  let fixed = (val / 1024).toFixed(0)
  return fixed + ' kb'
}

const trim = text => {
  return text.replace(/([^\w\d])/g, ' ').replace(/\s+([\w\d]+)$/g, '')
}

export type Properties = {
  item: {
    properties: Map<string, *>,
  }
  // {
  //   path: string,
  //   name: string,
  //   size: number,
  //   code?: string,
  //   class?: string,
  // }
}

const Icon = ({ item }: Properties) => {
  return <article className='tile'>
    <h3 className='meta name'>{trim(item.properties.get('name'))}</h3>
    {/* <input className='field' defaultValue={item.properties.get('name')} /> */}
    <span className='meta size'>{kb(item.properties.get('size'))}</span>
    <img src={item.properties.get('path')} />
    <input />
  </article>
}

export default Icon
