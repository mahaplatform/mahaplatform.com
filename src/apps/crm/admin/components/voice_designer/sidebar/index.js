import PropTypes from 'prop-types'
import React from 'react'
import Content from './content'

class Sidebar extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <Content { ...this._getContent() } />
  }

  _getContent() {
    return {
      blocks: [
        { icon: 'play', label: 'Play Recording', color: 'green' },
        { icon: 'volume-control-phone', label: 'Speak Text', color: 'green' },
        { icon: 'microphone', label: 'Record', color: 'green' },
        { icon: 'question', label: 'Question', color: 'blue' },
        { icon: 'random', label: 'If / Else', color: 'blue' },
        { icon: 'users', label: 'Add to List', color: 'teal' },
        { icon: 'users', label: 'Remove from List', color: 'teal' },
        { icon: 'gears', label: 'Enroll in Workflow', color: 'teal' },
        { icon: 'user', label: 'Update Property', color: 'teal' },
        { icon: 'book', label: 'Update Interest', color: 'teal' },
        { icon: 'envelope', label: 'Send Email', color: 'teal' },
        { icon: 'comment', label: 'Send SMS', color: 'teal' },
        { icon: 'flag', label: 'Goal', color: 'pink' }
      ]
    }
  }


}

export default Sidebar
