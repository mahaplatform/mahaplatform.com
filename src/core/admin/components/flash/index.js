import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import React from 'react'

class Flash extends React.Component{

  static childContextTypes = {
    flash: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  state = {
    show: false,
    message: null,
    style: null
  }

  _handleClear = this._handleClear.bind(this)
  _handleSet = this._handleSet.bind(this)

  render() {
    const { message, show, style } = this.state
    return (
      <div className="maha-flash">
        { this.props.children }
        <CSSTransition key="maha-flash" in={ show } classNames="expanded" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className={`maha-flash-popup ${style || ''}`}>
            <div className="maha-flash-popup-panel">
              <div className="maha-flash-popup-icon">
                <i className={`fa fa-${ this._getIcon(style) }`} />
              </div>
              <div className="maha-flash-popup-message">
                <p>{ message }</p>
              </div>
              <div className="maha-flash-popup-clear" onClick={ this._handleClear }>
                <i className="fa fa-times" />
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { show } = this.state
    if(prevState.show !== show && show) {
      setTimeout(this._handleClear, 2000)
    }
  }

  _getIcon(style) {
    if(style == 'success') return 'check-circle'
    if(style == 'warning') return 'warning'
    if(style == 'error') return 'times-circle'
    if(style == 'info') return 'info-circle'
  }

  getChildContext() {
    return {
      flash: {
        clear: this._handleClear,
        set: this._handleSet
      }
    }
  }

  _handleClear() {
    this.setState({
      show: false
    })
    setTimeout(() => this._handleSet(null, null, false), 250)
  }

  _handleSet(style, message, show = true) {
    this.setState({
      style,
      message,
      show
    })
  }

}

export default Flash
