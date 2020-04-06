import PaymentMethodField from '../../paymentmethodfield'
import { Button, Loader } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class Step4 extends React.Component {

  static propTypes = {
    event: PropTypes.object,
    status: PropTypes.string,
    onBack: PropTypes.func,
    onSubmit: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleNext = this._handleNext.bind(this)

  render() {
    const { event, status } = this.props
    return (
      <div className="registration-panel">
        { status !== 'pending' &&
          <div className="registration-panel-message">
            <Loader label="Processing" />
          </div>
        }
        { status === 'pending' &&
          <div className="registration-panel-body">
            <div className="registration-panel-content">
              <div className="registration-step4">
                <PaymentMethodField event={ event }/>
              </div>
            </div>
          </div>
        }
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
    const { status } = this.props
    return {
      label: '&laquo; Back',
      color: 'red',
      disabled: status !== 'pending',
      handler: this._handleBack
    }
  }

  _getNext() {
    const { status } = this.props
    return {
      label: 'Next &raquo;',
      color: 'red',
      disabled: status !== 'pending',
      handler: this._handleNext
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleMethod() {}

  _handleNext() {
    this.props.onSubmit({
      card_type: 'visa',
      last_four: 1234
    })
  }


}

export default Step4
