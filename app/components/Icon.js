// @flow
import React from 'react'

const kb = val => {
  let fixed = (val / 1024).toFixed(0)
  return fixed + ' kb'
}

const trim = text => {
  return text.replace(/([^\w\d])/g, ' ').replace(/\s+([\w\d]+)$/g, '')
}

const codept = pt =>
  '\\' + pt.toString(16)

export type Properties = {
  item: {
    properties: Map<string, *>,
    source: string,
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

  const applyContent = element => {
    element.innerHTML = item.source
  }

  console.log(item)

  return <article className='tile'>
    <h3 className='meta name'>
      {trim(item.properties.get('name'))}
    </h3>

    {/* <input className='field' defaultValue={item.properties.get('name')} /> */}
    <span className='meta size'>{kb(item.properties.get('size'))}</span>
    <span className='meta code'>{codept(item.code)}</span>

    <div className='source' ref={ref => ref && applyContent(ref)} />

    {/* <img src={item.properties.get('path')} /> */}
    <input />
  </article>
}

export default Icon
