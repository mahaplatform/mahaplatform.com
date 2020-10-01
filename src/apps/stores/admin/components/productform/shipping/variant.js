import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Variant extends React.Component {

  static propTypes = {
    product: PropTypes.object,
    variant: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    variant: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.variant) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { variant } = this.props
    this.setState({ variant })
  }

  _getForm() {
    return {
      title: 'Edit Variant Shipping',
      cancelIcon: 'chevron-left',
      saveText: 'Done',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Shipping', type: 'segment', fields: [
              { name: 'shipping_strategy', type: 'radiogroup', deselectable: false, required: true, options: [
                { value: 'free', text: 'There is no shipping fee' },
                { value: 'flat', text: 'There is a flat shipping fee' }
              ], defaultValue: 'free' },
              ...this._getFee()
            ]}
          ]
        }
      ]
    }
  }

  _getFee() {
    const { variant } = this.state
    if(variant.shipping_strategy === 'free') return []
    return [
      { label: 'Fee', name: 'shipping_fee', type: 'moneyfield' }
    ]
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(variant) {
    this.setState({ variant })
  }

  _handleSuccess(variant) {
    this.props.onDone(variant)
  }

}

export default Variant
