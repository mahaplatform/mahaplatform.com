import PropTypes from 'prop-types'
import { Form } from '@admin'
import Variants from './variants'
import React from 'react'
import _ from 'lodash'

class URL extends React.Component {

  static propTypes = {
    formdata: PropTypes.object,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onNext: PropTypes.func,
    onSave: PropTypes.func
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
    const { formdata } = this.props
    if(!formdata.has_variants) return [
    ]
    return [
      { name: 'url_strategy', type: 'radiogroup', deselectable: false, required: true, options: [
        { value: 'shared', text: 'Use the same shipping strategy for each variant' },
        { value: 'unique', text: 'Use different shipping strategy for each variant' }
      ], defaultValue: 'shared' }
    ]
  }

  _getFile() {
    const { formdata } = this.props
    const { data } = this.state
    if(!formdata.has_variants || data.url_strategy === 'shared') {
      return [
        { label: 'URL', name: 'url', type: 'urlfield', required: true }
      ]
    }
    return [
      { label: 'URLs', name: 'variants', type: Variants, product: formdata, required: true }
    ]
  }

  _getVariants() {
    const { formdata } = this.props
    const { data } = this.state
    const { url_strategy, url, variants } = data
    return formdata.variants.map(variant => ({
      ...variant,
      ...url_strategy === 'unique' ? _.find(variants, { code: variant.code }) : {
        url
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
    this.props.onSave({
      variants: this._getVariants()
    })
  }

}

export default URL
