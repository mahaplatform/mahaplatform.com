import OptionsField from '../../../components/optionsfield'
import VariantsField from './variantsfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Variants extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    product: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  form = null

  state = {
    product: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.product) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { product } = this.props
    this.setState({ product })
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
            { name: 'has_variants', type: 'radiogroup', deselectable: false, options: [
              { value: false, text: 'There is only one variant of this product' },
              { value: true, text: 'There are multiple varaints of this product with different options (color, size, etc)' }
            ], defaultValue: false },
            ...this._getOptions(),
            ...this._getVariants()
          ]
        }
      ]
    }
  }

  _getOptions()  {
    const { product } = this.state
    if(!product.has_variants) return []
    return [
      { label: 'Options', name: 'options', type: OptionsField }
    ]
  }

  _getVariants() {
    const { product } = this.state
    if(!product.has_variants || !product.options) return []
    return [
      { label: 'Variants', name: 'variants', type: VariantsField, product }
    ]
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(product) {
    this.setState({
      product: {
        ...this.state.product,
        ...product
      }
    })
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(product) {
    this.props.onDone(product)
  }

}

export default Variants
