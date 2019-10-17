import Conditional from './conditional'
import PropTypes from 'prop-types'
import Action from './action'
import React from 'react'
import Verb from './verb'
import Goal from './goal'

class Box extends React.PureComponent {

  static propTypes = {
    type: PropTypes.string
  }

  render() {
    const { type } = this.props
    if(type === 'conditional') return <Conditional { ...this.props } />
    if(type === 'verb') return <Verb { ...this.props } />
    if(type === 'action') return <Action { ...this.props } />
    if(type === 'goal') return <Goal { ...this.props } />
  }

}

export default Box
