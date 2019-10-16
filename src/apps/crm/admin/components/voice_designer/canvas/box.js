import PropTypes from 'prop-types'
import React from 'react'

import Question from './question'
import IfElse from './ifelse'
import Hangup from './hangup'
import Workflow from './workflow'
import List from './list'
import Speak from './speak'
import Interest from './interest'
import Property from './property'
import Email from './email'
import SMS from './sms'

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
    if(type === 'workflow') return <Workflow { ...this.props } />
    if(type === 'list') return <List { ...this.props } />
    if(type === 'interest') return <Interest { ...this.props } />
    if(type === 'speak') return <Speak { ...this.props } />
    if(type === 'property') return <Property { ...this.props } />
    if(type === 'email') return <Email { ...this.props } />
    if(type === 'sms') return <SMS { ...this.props } />
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default Box
