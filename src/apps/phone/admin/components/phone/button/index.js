import PropTypes from 'prop-types'
import React from 'react'

class Button extends React.Component {

  static propTypes = {
    depressed: PropTypes.bool,
    disabled: PropTypes.bool,
    handler: PropTypes.func,
    icon: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { icon, label } = this.props
    return (
      <div className="maha-phone-button-container">
        <div className={ this._getClass() } onClick={ this._handleClick }>
          <i className={`fa fa-${ icon }`} />
        </div>
        { label &&
          <div className="maha-phone-button-label">
            { label }
          </div>
        }
      </div>
    )
  }

  _getClass() {
    const { depressed, disabled, type } = this.props
    const classes = ['maha-phone-button']
    if(type) classes.push(type)
    if(disabled) classes.push('disabled')
    if(depressed) classes.push('depressed')
    return classes.join(' ')
  }

  _handleClick(e) {
    const { disabled, handler } = this.props
    if(disabled) return
    handler(e)
  }

}

export default Button
