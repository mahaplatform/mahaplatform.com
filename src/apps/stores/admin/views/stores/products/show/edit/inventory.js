import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Inventory extends React.Component {

  static propTypes = {
    formdata: PropTypes.object,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onNext: PropTypes.func,
    onSave: PropTypes.func
  }

  form = null

  _handleBack = this._handleBack.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { formdata } = this.props
    return {
      reference: node => this.form = node,
      showHeader: false,
      buttons: [
        { label: 'Prev', color: 'red', handler: this._handleBack },
        { label: 'Next', color: 'red', handler: this._handleSubmit }
      ],
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'inventory_policy', type: 'radiogroup', deselectable: false, required: true, options: [
              { value: 'unlimited', text: 'Do not manage inventory' },
              { value: 'deny', text: 'Stop selling when inventory reaches 0' },
              { value: 'continue', text: 'Allow sales to continue into negative inventory levels' }
            ], defaultValue: formdata.inventory_policy }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(inventory) {
    const { formdata } = this.props
    this.props.onNext({
      ...formdata,
      ...inventory
    })
  }

}

export default Inventory
