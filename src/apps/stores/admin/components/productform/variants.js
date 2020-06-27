import VariantsField from '../../components/variantsfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Variants extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    product: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const variants = this._getVariants()
    return {
      title: 'Variants',
      cancelIcon: 'chevron-left',
      saveText: 'Save',
      onCancel: this._handleBack,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'variants', type: VariantsField, defaultValue: variants }
          ]
        }
      ]
    }
  }

  _getVariants() {
    const { product } = this.props
    return product.options.reduce((variants, option) => {
      return variants.length > 0 ? variants.reduce((subvariants, variant) => {
        return option.values.reduce((optionvariants, value) => [
          ...optionvariants,
          [
            ...variant,
            { option: option.title, value }
          ]
        ], subvariants)
      }, []) : option.values.map(value => [
        { option: option.title , value }
      ])
    }, []).map(options => ({
      title: options.map(option => option.value).join(' / '),
      options,
      ...product.pricing,
      inventory_quantity: 0,
      inventory_policy: 'deny',
      is_active: true
    }))
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSuccess(result) {
    this.props.onDone(result)
  }

}

export default Variants
