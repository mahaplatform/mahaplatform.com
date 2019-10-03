import { Message, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Sidebar extends React.Component {

  static contextTypes = {
    logger: PropTypes.object
  }

  static propTypes = {
    sidebar: PropTypes.func
  }

  static contextTypes = {
    logger: PropTypes.object
  }

  static getDerivedStateFromError(error) {
    return { error: true }
  }

  state = {
    error: false
  }

  render() {
    const { error } = this.state
    if(error) return this.renderError()
    return (
      <div className="maha-portal-sidebar">
        <this.props.sidebar />
      </div>
    )
  }

  renderError() {
    return (
      <ModalPanel { ...this._getErrorPanel() }>
        <Message { ...this._getError() } />
      </ModalPanel>
    )
  }

  componentDidCatch(error, info) {
    this.context.logger.error(error, info)
  }

  _getErrorPanel() {
    return {
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      title: 'Error'
    }
  }

  _getError() {
    return {
      icon: 'exclamation-triangle',
      title: 'Error',
      text: 'There was a problem'
    }
  }

}

export default Sidebar
