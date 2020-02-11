import PropTypes from 'prop-types'
import React from 'react'

class Button extends React.Component {

  static propTypes = {
    color: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    processing: PropTypes.bool,
    tabIndex: PropTypes.number,
    onClick: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)
  _handleKeyPress = this._handleKeyPress.bind(this)

  render() {
    const { label, processing } = this.props
    return (
      <div { ...this._getButton()}>
        { processing &&
          <i className="fa fa-circle-o-notch fa-spin fa-fw" />
        } { label }
      </div>
    )
  }

  _getButton() {
    const { tabIndex } = this.props
    return {
      className: this._getClass(),
      tabIndex,
      onClick: this._handleClick,
      onKeyPress: this._handleKeyPress
    }
  }

  _getClass() {
    const { color, disabled, processing } = this.props
    const classes = ['ui','large','fluid',color,'button']
    if(disabled || processing) classes.push('disabled')
    return classes.join(' ')
  }

  _handleClick() {
    this.props.onClick()
  }

  _handleKeyPress(e) {
    if(e.which !== 13) return
    this.props.onClick()
  }

}

export default Button
