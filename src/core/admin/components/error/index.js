import PropTypes from 'prop-types'
import Message from '../message'
import React from 'react'

class Error extends React.Component {

  static contextTypes = {
    logger: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  static getDerivedStateFromError(error) {
    return { error: true }
  }

  state = {
    error: false
  }

  render() {
    if(this.state.error) return <Message { ...this._getError() } />
    return this.props.children
  }

  componentDidCatch(error, info) {
    this.context.logger.error(error, info)
  }

  _getError() {
    return {
      icon: 'exclamation-triangle',
      title: 'Error',
      text: 'There was a problem'
    }
  }

}

export default Error
