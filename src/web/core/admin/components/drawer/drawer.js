import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Drawer extends React.Component {

  static childContextTypes = {
    drawer: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    component: PropTypes.any,
    location: PropTypes.string,
    open: PropTypes.bool,
    onClear: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
  }

  _handleClose = this._handleClose.bind(this)
  _handleOpen = this._handleOpen.bind(this)


  render() {
    const { children, component, location, open } = this.props
    return ([
      children,
      <CSSTransition key="maha-drawer-overlay" in={ open } classNames="expanded" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="maha-drawer-overlay" onClick={this._handleClose } />
      </CSSTransition>,
      <CSSTransition key="maha-drawer-panel" in={ open } classNames="expanded" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className={`maha-drawer-panel maha-drawer-panel-${location}`}>
          { _.isFunction(component) ? React.createElement(component) : component }
        </div>
      </CSSTransition>
    ])
  }

  componentDidUpdate(prevProps) {
    const { open, onClear } = this.props
    if(open !== prevProps.open && !open) {
      setTimeout(onClear, 500)
    }
  }

  getChildContext() {
    return {
      drawer: {
        open: this._handleOpen,
        close: this._handleClose
      }
    }
  }

  _handleOpen(component, location) {
    this.props.onOpen(component, location)
  }

  _handleClose() {
    this.props.onClose()
  }

}

export default Drawer
