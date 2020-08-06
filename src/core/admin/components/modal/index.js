import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Stack from '../stack'
import Error from '../error'
import React from 'react'

class Modal extends React.Component {

  static childContextTypes = {
    modal: PropTypes.object
  }

  static contextTypes = {
    confirm: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  state = {
    cards: [],
    height: null,
    width: null
  }

  _handleClose = this._handleClose.bind(this)
  _handleOpen =  this._handleOpen.bind(this)
  _handlePop =  this._handlePop.bind(this)
  _handlePush =  this._handlePush.bind(this)

  render() {
    const { cards } = this.state
    const { children } = this.props
    return ([
      children,
      <CSSTransition key="maha-modal-overlay" in={ cards.length > 0 } classNames="expanded" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="maha-modal-overlay" onClick={ this._handleClose.bind(this, true) } />
      </CSSTransition>,
      <CSSTransition key="maha-modal-window" in={ cards.length > 0 } classNames="expanded" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="maha-modal-window" style={ this._getStyle() }>
          <Error { ...this._getError() }>
            <Stack { ...this._getStack() } />
          </Error>
        </div>
      </CSSTransition>
    ])
  }

  _getStyle() {
    const { width, height } = this.state
    return {
      maxWidth: width,
      maxHeight: height
    }
  }

  getChildContext() {
    return {
      modal: {
        close: this._handleClose.bind(this, false),
        open: this._handleOpen,
        pop: this._handlePop,
        push: this._handlePush
      }
    }
  }

  _getError() {
    return {
      isModal: true
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleClose(confirm) {
    if(!confirm) this._handlePop()
    this.context.confirm.open('Are you sure you want to close this window?', this._handlePop)
  }

  _handleOpen(component, options = {}) {
    const width = options.width || 996
    const height = options.height || 740
    this.setState({ width, height })
    this._handlePush(component)
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

}

export default Modal
