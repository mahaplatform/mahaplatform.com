import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import Variants from './variants'
import React from 'react'
import _ from 'lodash'

class Download extends React.Component {

  static propTypes = {
    product: PropTypes.object,
    onBack: PropTypes.func,
    onNext: PropTypes.func
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
        { label: 'Save', color: 'red', handler: this._handleSubmit }
      ],
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            ...this._getStrategy(),
            ...this._getFile()
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { product } = this.props
    if(!product.has_variants) return [
    ]
    return [
      { name: 'download_strategy', type: 'radiogroup', deselectable: false, required: true, options: [
        { value: 'shared', text: 'Use the same shipping strategy for each variant' },
        { value: 'unique', text: 'Use different shipping strategy for each variant' }
      ], defaultValue: 'shared' }
    ]
  }

  _getFile() {
    const { product } = this.props
    const { data } = this.state
    if(!product.has_variants || data.download_strategy === 'shared') {
      return [
        { label: 'File', name: 'file', type: 'attachmentfield', multiple: false, formatter: asset => asset }
      ]
    }
    return [
      { label: 'Files', name: 'variants', type: Variants, product }
    ]
  }

  _getVariants() {
    const { product } = this.props
    const { data } = this.state
    const { download_strategy, file, variants } = data
    return product.variants.map(variant => ({
      ...variant,
      ...download_strategy === 'unique' ? _.find(variants, { code: variant.code }) : {
        file: file
      }
    }))
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
    this.props.onNext({
      variants: this._getVariants()
    })
  }

}

export default Download
