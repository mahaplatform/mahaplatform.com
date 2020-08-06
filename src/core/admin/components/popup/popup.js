import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Popup extends React.Component{

  static childContextTypes = {
    popup: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    component: PropTypes.object,
    open: PropTypes.bool,
    onClear: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
  }

  render() {
    const { children, component, open } = this.props
    return ([
      children,
      <CSSTransition key="maha-popup" in={ open } classNames="expanded" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="maha-popup-panel">
          <div className="maha-popup-panel-item">
            { component && ( _.isFunction(component) ? React.createElement(component) : component ) }
          </div>
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
    const { onOpen, onClose } = this.props
    return {
      popup: {
        open: onOpen,
        close: onClose
      }
    }
  }

}

export default Popup
