import views from '../views/views-registry'
import IconView from '../components/Icon'

export default class Icon {
  constructor (properties) {
    Object.assign(this, properties)
  }
}

views.register(Icon, IconView)
