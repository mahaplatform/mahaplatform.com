import * as Components from './components'
import * as Containers from './containers'
import * as Controls from './controls'
import * as Utils from './utils'

const Reframe = {
  ...Components,
  ...Containers,
  ...Controls,
  ...Utils
}

Object.keys(Reframe).map(key => {
  exports[key] = Reframe[key]
})

export default Reframe
