import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Message from '../message'
import Loader from '../loader'
import React from 'react'
import _ from 'lodash'

class Modal extends React.Component {

  static childContextTypes = {
    modal: PropTypes.object
  }

  static contextTypes = {
    logger: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    panels: PropTypes.array,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static getDerivedStateFromError(error) {
    return { error: true }
  }

  state = {
    error: false,
    panels: []
  }

  render() {
    const { panels, error } = this.state
    const { children } = this.props
    return ([
      children,
      <CSSTransition key="maha-modal-overlay" in={ this.props.panels.length > 0 } classNames="expanded" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="maha-modal-overlay" onClick={this._handleClose.bind(this)} />
      </CSSTransition>,
      <CSSTransition key="maha-modal-window" in={ this.props.panels.length > 0 } classNames="expanded" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="maha-modal-window">
          <div className="maha-modal-window-container">
            { panels.length === 0 &&
              <div className="maha-modal-loader">
                <Loader />
              </div>
            }
            <TransitionGroup component={ null }>
              { panels.map((panel, index) => (
                <CSSTransition component={ null } classNames={ index > 0 ? 'stack' : ''} timeout={ 500 } key={ `panel_${index}` }>
                  { error ?
                    this.renderError() :
                    <div className="maha-modal-window-panel">
                      { _.isFunction(panel) ? React.createElement(panel) : panel }
                    </div>
                  }
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>
      </CSSTransition>
    ])
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

  componentDidUpdate(prevProps, prevState) {
    const { panels } = this.props
    if(panels.length !== prevProps.panels.length) {
      const timeout = prevProps.panels.length === 0 ? 500 : 0
      setTimeout(() => this.setState({ panels }), timeout)
    }
  }

  getChildContext() {
    return {
      modal: {
        close: this._handleClose.bind(this),
        open: this._handleOpen.bind(this),
        pop: this._handlePop.bind(this),
        push: this._handlePush.bind(this)
      }
    }
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

  _handleClose() {
    this.props.onClose()
  }

  _handleOpen(component) {
    this.props.onOpen(component)
  }

  _handlePop(num = 1) {
    this.props.onPop(num)
  }

  _handlePush(component) {
    this.props.onPush(component)
  }

}

export default Modal
