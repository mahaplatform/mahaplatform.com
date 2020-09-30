import { Button, NumberField } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import Edit from './edit'

class VariantsField extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    product: PropTypes.object,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    variants: []
  }

  _handleActivate = this._handleActivate.bind(this)
  _handleBack = this._handleBack.bind(this)
  _handleDeactivate = this._handleDeactivate.bind(this)

  render() {
    const { variants } = this.state
    const { product } = this.props
    return (
      <div className="variantsfield-variants">
        <table className="ui unstackable table">
          <thead>
            <tr>
              <th className="collapsing" />
              <th>Title</th>
              <th className="collapsing">Inventory</th>
              <th className="collapsing" />
            </tr>
          </thead>
          <tbody>
            { variants.map((variant, index) => (
              <tr className={ this._getClass(variant) } key={`option_${index}`}>
                <td>
                  { variant.is_active ?
                    <Button { ...this._getDeactivate(index) } /> :
                    <Button { ...this._getActivate(index) } />
                  }
                </td>
                <td>
                  <strong>{ product.title } ({ variant.title })</strong><br />
                  { this._getPrice(variant) }
                </td>
                <td className="right aligned">
                  <NumberField { ...this._getQuantity(variant) } />
                </td>
                <td>
                  <Button { ...this._getEditButton(index, variant) } />
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    this.setState({
      variants: defaultValue
    })
    this.props.onReady()
  }

  _getActivate(index) {
    return {
      icon: 'square-o',
      className: 'variantsfield-variant-action',
      handler: this._handleActivate.bind(this, index)
    }
  }

  _getClass(variant) {
    const classes = ['variantsfield-variant']
    if(!variant.is_active) classes.push('inactive')
    return classes.join(' ')
  }

  _getDeactivate(index) {
    return {
      icon: 'check-square',
      className: 'variantsfield-variant-action',
      handler: this._handleDeactivate.bind(this, index)
    }
  }

  _getEdit(index, variant) {
    return {
      variant,
      onBack: this._handleBack,
      onDone: this._handleUpdate.bind(this, index, variant)
    }
  }

  _getEditButton(index, variant) {
    return {
      icon: 'pencil',
      className: 'variantsfield-variant-action',
      handler: this._handleEdit.bind(this, index, variant)
    }
  }

  _getInventory(variant) {
    return {
      defaultValue: variant.inventory_quantity
    }
  }

  _getPrice(variant) {
    if(variant.price_type === 'free') return 'FREE'
    if(variant.price_type === 'fixed') return numeral(variant.fixed_price).format('0.00')
    return `${numeral(variant.low_price).format('0.00')} - ${numeral(variant.high_price).format('0.00')}`
  }

  _getPolicy(variant, index) {
    return {
      options: [
        { value: 'deny', text: 'Deny' },
        { value: 'continue', text: 'Continue' }
      ],
      disabled: variant.inventory_policy === 'unlimited' || !variant.is_active,
      placeholder: '',
      defaultValue: variant.inventory_policy,
      onChange: this._handleValue.bind(this, index, 'inventory_policy')
    }
  }

  _getQuantity(variant, index) {
    return {
      defaultValue: variant.inventory_quantity,
      disabled: variant.inventory_policy === 'unlimited' || !variant.is_active,
      placeholder: '',
      onChange: this._handleValue.bind(this, index, 'inventory_quantity')
    }
  }

  _handleActivate(index) {
    this.setState({
      variants: [
        ...this.state.variants.map((variant, i) => ({
          ...variant,
          is_active: i === index ? true : variant.is_active
        }))
      ]
    })
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleDeactivate(index) {
    this.setState({
      variants: [
        ...this.state.variants.map((variant, i) => ({
          ...variant,
          is_active: i === index ? false : variant.is_active
        }))
      ]
    })
  }

  _handleEdit(index, variant) {
    this.context.form.push(<Edit { ...this._getEdit(index, variant) } />)
  }

  _handleValue(index, key, value) {
    const { variants } = this.state
    this.setState({
      variants: [
        ...variants.map((variant, i) => ({
          ...variant,
          ...i === index ? {
            [key]: value
          } : {}
        }))
      ]
    })
  }

  _handleUpdate(index, newvariant) {
    this.setState({
      variants: [
        ...this.state.variants.map((variant, i) => ({
          ...i === index ? newvariant : variant
        }))
      ]
    })
    this.context.form.pop()
  }

}

export default VariantsField
