import views from '../views/views-registry'
import IconView from '../components/Icon'

export default class Icon {
  constructor (properties) {
    this.properties = new Map(Object.entries(properties))
  }

  toJSON () {
    let data = {}
    for (let [attr, value] of this.properties.entries())
      data[attr] = value
    return data
  }
}

views.register(Icon, IconView)
