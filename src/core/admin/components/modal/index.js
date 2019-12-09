import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Stack from '../stack'
import Error from '../error'
import React from 'react'

class Modal extends React.Component {

  static childContextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  state = {
    cards: []
  }

  render() {
    const { cards } = this.state
    const { children } = this.props
    return ([
      children,
      <CSSTransition key="maha-modal-overlay" in={ cards.length > 0 } classNames="expanded" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="maha-modal-overlay" onClick={this._handleClose.bind(this)} />
      </CSSTransition>,
      <CSSTransition key="maha-modal-window" in={ cards.length > 0 } classNames="expanded" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="maha-modal-window">
          <Error>
            <Stack { ...this._getStack() } />
          </Error>
        </div>
      </CSSTransition>
    ])
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

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleClose() {
    this._handlePop()
  }

  _handleOpen(component) {
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
