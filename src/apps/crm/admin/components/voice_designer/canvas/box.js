import PropTypes from 'prop-types'
import React from 'react'

import Question from './question'
import IfElse from './ifelse'
import Hangup from './hangup'
import Speak from './speak'
import Action from './action'
import Goal from './goal'

class Box extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    type: PropTypes.string
  }

  static defaultProps = {}

  render() {
    const { type } = this.props
    if(type === 'question') return <Question { ...this.props } />
    if(type === 'ifelse') return <IfElse { ...this.props } />
    if(type === 'hangup') return <Hangup { ...this.props } />
    if(type === 'speak') return <Speak { ...this.props } />
    if(type === 'action') return <Action { ...this.props } />
    if(type === 'goal') return <Goal { ...this.props } />
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default Box
