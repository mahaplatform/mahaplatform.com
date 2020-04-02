import { Button, Form } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class Step2 extends React.Component {

  static propTypes = {
    event: PropTypes.object,
    items: PropTypes.array,
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
            <div className="registration-step2">
              <Form { ...this._getForm() } />
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

  _getForm() {
    const { items } = this.props
    return {
      button: false,
      captcha: false,
      fields: [
        ...items.reduce((fields, item) => [
          ...fields,
          ...Array(item.quantity).fill(0).reduce((fields, i, index) => [
            ...fields,
            { type: 'text', text: `${item.name} Ticket ${index + 1}` },
            { label: 'Name', type: 'textfield', placeholder: 'Enter name', required: true },
            { label: 'Email', type: 'textfield', placeholder: 'Enter email', required: true }
          ], [])
        ], [])
      ]
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
    this.props.onNext()
  }


}

export default Step2
