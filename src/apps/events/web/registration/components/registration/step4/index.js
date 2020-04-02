import { Button } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class Step2 extends React.Component {

  static propTypes = {
    event: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    items: []
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <div className="registration-panel">
        <div className="registration-panel-body">
          <div className="registration-panel-content">
            <div className="registration-step3">
              step3
            </div>
          </div>
        </div>
        <div className="registration-panel-footer">
          <div className="registration-panel-footer-item">
            <Button { ...this._getBack() } />
          </div>
          <div className="registration-panel-footer-item">
            <Button { ...this._getDone() } />
          </div>
        </div>
      </div>
    )
  }

  _getBack() {
    return {
      label: '&laquo; Back',
      color: 'red',
      handler: this._handleBack
    }
  }

  _getDone() {
    return {
      label: 'Done',
      color: 'red',
      handler: this._handleDone
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    this.props.onDone()
  }


}

export default Step2
