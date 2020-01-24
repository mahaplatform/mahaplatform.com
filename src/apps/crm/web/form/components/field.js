import PropTypes from 'prop-types'
import Control from './control'
import React from 'react'

class Field extends React.Component {

  static propTypes = {
    active: PropTypes.number,
    config: PropTypes.object,
    field: PropTypes.object,
    index: PropTypes.number,
    onAction: PropTypes.func
  }

  render() {
    return (
      <div className={ this._getClass() }>
        <Control { ...this._getControl() } />
        <div className="block-highlight" />
        <div className="block-actions">
          <div className="block-spacer"></div>
          <div className="block-action" onClick={ this._handleAction.bind(this, 'edit') }>
            <i className="fa fa-pencil"></i>
          </div>
          <div className="block-action" onClick={ this._handleAction.bind(this, 'clone') }>
            <i className="fa fa-copy"></i>
          </div>
          <div className="block-action" onClick={ this._handleAction.bind(this, 'remove') }>
            <i className="fa fa-trash"></i>
          </div>
        </div>
      </div>
    )
  }

  _getClass() {
    const { active, index } = this.props
    const is_active = active && active === index
    const classes=['block']
    if(is_active) classes.push('active')
    return classes.join(' ')
  }

  _getControl() {
    const { field  } = this.props
    return {
      field
    }
  }

  _handleAction(action) {
    const { index, onAction } = this.props
    onAction(action, { index })
  }

}

export default Field
