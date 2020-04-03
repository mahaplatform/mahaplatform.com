import { Button } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class Step2 extends React.Component {

  static propTypes = {
    event: PropTypes.object,
    onBack: PropTypes.func,
    onNext: PropTypes.func
  }

  state = {
    items: []
  }

  _handleBack = this._handleBack.bind(this)
  _handleNext = this._handleNext.bind(this)

  render() {
    return (
      <div className="registration-panel">
        <div className="registration-panel-body">
          <div className="registration-panel-content">
            <div className="registration-step4">
              <h2>Payment Information</h2>
            </div>
          </div>
        </div>
        <div className="registration-panel-footer">
          <div className="registration-panel-footer-item">
            <Button { ...this._getBack() } />
          </div>
          <div className="registration-panel-footer-item">
            <Button { ...this._getNext() } />
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

  _getNext() {
    return {
      label: 'Next &raquo;',
      color: 'red',
      handler: this._handleNext
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleNext() {
    this.props.onNext({
      card_type: 'visa',
      last_four: 1234
    })
  }


}

export default Step2
