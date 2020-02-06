import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Message from '../message'
import React from 'react'

class Error extends React.Component {

  static contextTypes = {
    logger: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    isModal: PropTypes.bool
  }

  static defaultProps = {
    isModal: false
  }

  static getDerivedStateFromError(error) {
    return { error: true }
  }

  state = {
    error: false
  }

  _handleClose = this._handleClose.bind(this)

  render() {
    if(!this.state.error) return this.props.children
    return (
      <ModalPanel { ...this._getPanel() }>
        <Message { ...this._getError() } />
      </ModalPanel>
    )
  }

  componentDidCatch(error, info) {
    this.context.logger.error(error, info)
  }

  _getError() {
    const { isModal } = this.props
    return {
      icon: 'exclamation-triangle',
      title: 'Error',
      text: 'There was a problem',
      buttons: isModal ? [
        { label: 'Close Modal', handler: this._handleClose }
      ] : null
    }
  }

  _getPanel() {
    const { isModal } = this.props
    return {
      showHeader: isModal,
      title: 'Error'
    }
  }

  _handleClose() {
    this.context.modal.close()
  }

}

export default Error
