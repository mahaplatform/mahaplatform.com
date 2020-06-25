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
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    variants: [
      { id: 1, options: { size: 'Small', color: 'Red' }, pricing: { fixed_price: 10.00 }, inventory_quantity: 10, is_active: true },
      { id: 2, options: { size: 'Small', color: 'Green' }, pricing: { fixed_price: 10.00 }, inventory_quantity: 10, is_active: true },
      { id: 3, options: { size: 'Small', color: 'Blue' }, pricing: { fixed_price: 10.00 }, inventory_quantity: 10, is_active: true },
      { id: 4, options: { size: 'Medium', color: 'Red' }, pricing: { fixed_price: 10.00 }, inventory_quantity: 10, is_active: true },
      { id: 5, options: { size: 'Medium', color: 'Green' }, pricing: { fixed_price: 10.00 }, inventory_quantity: 10, is_active: true },
      { id: 6, options: { size: 'Medium', color: 'Blue' }, pricing: { fixed_price: 10.00 }, inventory_quantity: 10, is_active: true },
      { id: 7, options: { size: 'Large', color: 'Red' }, pricing: { fixed_price: 10.00 }, inventory_quantity: 10, is_active: true },
      { id: 8, options: { size: 'Large', color: 'Green' }, pricing: { fixed_price: 10.00 }, inventory_quantity: 10, is_active: true },
      { id: 9, options: { size: 'Large', color: 'Blue' }, pricing: { fixed_price: 10.00 }, inventory_quantity: 10, is_active: true }
    ]
  }

  _handleActivate = this._handleActivate.bind(this)
  _handleDeactivate = this._handleDeactivate.bind(this)

  render() {
    const { variants } = this.state
    return (
      <div className="variantsfield-variants">
        { variants.map((variant, index) => (
          <div className={ this._getClass(variant)} key={`option_${index}`}>
            <div className="variantsfield-variant-title">
              { Object.values(variant.options).join(' / ') } (
              { numeral(variant.pricing.fixed_price).format('0.00') }
              )
            </div>
            <div className="variantsfield-variant-inventory">
              <NumberField { ...this._getInventory(variant) } />
            </div>
            <Button { ...this._getEdit(index) } />
            { variant.is_active ?
              <Button { ...this._getDeactivate(index) } /> :
              <Button { ...this._getActivate(index) } />
            }
          </div>
        )) }
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  _getActivate(index) {
    return {
      icon: 'refresh',
      className: 'variantsfield-variant-action',
      handler: this._handleActivate.bind(this, index)
    }
  }

  _getClass(variant) {
    const classes = ['variantsfield-variant']
    if(!variant.is_active) classes.push('disabled')
    return classes.join(' ')
  }

  _getDeactivate(index) {
    return {
      icon: 'times',
      className: 'variantsfield-variant-action',
      handler: this._handleDeactivate.bind(this, index)
    }
  }

  _getEdit(index) {
    return {
      icon: 'pencil',
      className: 'variantsfield-variant-action',
      handler: this._handleEdit.bind(this, index)
    }
  }

  _getInventory(variant) {
    return {
      defaultValue: variant.inventory_quantity
    }
  }


  _handleActivate(i) {
    this.setState({
      variants: [
        ...this.state.variants.map((variant, index) => ({
          ...variant,
          is_active: index === i ? true : variant.is_active
        }))
      ]
    })
  }

  _handleDeactivate(i) {
    this.setState({
      variants: [
        ...this.state.variants.map((variant, index) => ({
          ...variant,
          is_active: index === i ? false : variant.is_active
        }))
      ]
    })
  }

  _handleEdit() {
    this.context.form.push(<Edit />)
  }

}

export default VariantsField
