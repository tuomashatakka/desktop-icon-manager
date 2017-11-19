/**
 * @class ViewsRegistry
 * @flow
 */
// import self from 'autobind-decorator'
import React, { Component } from 'react'

class ViewsRegistry {

  views: WeakMap<Function, () => Component>

  constructor () {
    this.views = new WeakMap()
  }

  // @self
  /**
   * Get a view for a model or model instance
   *
   * @method get
   * @param  {object} instance Any model instance with a view registered for its model
   * @return {Component} The view resembling the given instance
   */

  get (instance) { //eslint-disable-line

    if (!instance)
      return new TypeError(`ViewsRegistry.get requires one argument`)

    if (typeof instance.component === 'function')
      return instance.component

    let model = instance.constructor

    if (this.views.has(model)) {
      let Provider = this.views.get(model)
      let value = <Provider item={instance} />
      Object.defineProperty(instance, 'component', { value })
    }

    if (instance.component) // instanceof Component
      return instance.component

    throw new Error(`View provider not found for the model ${model ? model.name || model.constructor.name : null}`)
  }

  // @self
  /**
   * Register a view for a model.
   * Requires two arguments of which the former is the constructor for a model
   * and the latter is a function that, when called, gets an instance of the given model as its argument.
   * The second argument must return a React component upon calling it.
   *
   * @method register
   * @param  {object} model [description]
   * @param  {Function} viewProvider [description]
   * @return {ViewsRegistry} Returns the ViewsRegistry instance.
   */

  register (model, viewProvider) { //eslint-disable-line
    let isConstructor = true
    try {
      new model()
    }
    catch (error) {
      if (error.toString().endsWith('is not a constructor'))
        isConstructor = false
    }

    if (!isConstructor)
      throw new TypeError(`Trying to register a model that can not be called as a constructor`)

    if (typeof viewProvider !== 'function')
      throw new ReferenceError(`Trying to add a non-function view provider, which is no-op`)

    this.views.set(model, viewProvider)
    return this
  }
}

export default new ViewsRegistry()
