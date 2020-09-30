import MediaField from '../../../components/mediafield'
import VariantsField from './variantsfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Media extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    product: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  form = null

  state = {
    data: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      reference: node => this.form = node,
      showHeader: false,
      buttons: [
        { label: 'Prev', color: 'red', handler: this._handleBack },
        { label: 'Next', color: 'red', handler: this._handleSubmit }
      ],
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            ...this._getStrategy(),
            ...this._getMedia()
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { product } = this.props
    if(!product.has_variants) return []
    return [
      { name: 'media_strategy', type: 'radiogroup', deselectable: false, required: true, options: [
        { value: 'shared', text: 'Use the same photos for each variant' },
        { value: 'unique', text: 'Use different photos for each variant' }
      ], defaultValue: 'shared' }
    ]
  }

  _getMedia() {
    const { product } = this.props
    const { data } = this.state
    if(!product.has_variants || data.media_strategy === 'shared') {
      return [
        { label: 'Photos', name: 'photos', type: MediaField }
      ]
    }
    return [
      { label: 'Variants', name: 'variants', type: VariantsField, product }
    ]
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(data) {
    this.setState({ data })
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(data) {
    this.props.onDone(data)
  }

}

export default Media
