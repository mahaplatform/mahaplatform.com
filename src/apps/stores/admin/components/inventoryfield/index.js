import { NumberField, Dropdown } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class InventoryField extends React.Component {

  static propTypes = {
    products: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    inventory: null
  }

  render() {
    const { inventory } = this.state
    const { products } = this.props
    if(!inventory) return null
    return (
      <div className="stores-inventoryfield">
        <div className="maha-table">
          <table>
            <thead>
              <tr>
                <td>Title</td>
                <td className="collapsing">Policy</td>
                <td className="collapsing">In Stock</td>
              </tr>
            </thead>
            <tbody>
              { products.map((product, index) => [
                product.variants.map((variant, vindex) => (
                  <tr key={`product_${index}_variant_${vindex}`}>
                    <td>
                      { product.title } { variant.options.length > 0 &&
                        <span>({ variant.options.map(option => {
                          return `${option.option}: ${option.value}`
                        }).join(', ') })</span>
                      }
                    </td>
                    <td>
                      <Dropdown { ...this._getPolicy(variant) } />
                    </td>
                    <td className="right aligned">
                      <NumberField { ...this._getQuantity(variant) } />
                    </td>
                  </tr>
                ))
              ]) }
              { products.length === 0 &&
                <tr>
                  <td colSpan="2" className="center">
                    This store doesnt yet have any products
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { products } = this.props
    this.setState({
      inventory: products.reduce((inventory, product) => ({
        ...inventory,
        ...product.variants.reduce((vinventory, variant) => ({
          ...vinventory,
          [variant.id]: {
            inventory_policy: variant.inventory_policy,
            inventory_instock: variant.inventory_instock
          }
        }), {})
      }), {})
    })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { inventory } = this.state
    if(!_.isEqual(inventory, prevState.inventory)) {
      this.props.onChange(inventory)
    }
  }

  _getPolicy(variant) {
    const { inventory } = this.state
    return {
      options: [
        { value: 'unlimited', text: 'Unlimited' },
        { value: 'deny', text: 'Deny' },
        { value: 'continue', text: 'Continue' }
      ],
      placeholder: '',
      defaultValue: inventory[variant.id].inventory_policy,
      onChange: this._handlePolicy.bind(this, variant)
    }
  }

  _getQuantity(variant) {
    const { inventory } = this.state
    return {
      defaultValue: inventory[variant.id].inventory_instock,
      disabled: inventory[variant.id].inventory_policy === 'unlimited',
      placeholder: '',
      onChange: this._handleQuantity.bind(this, variant)
    }
  }

  _handlePolicy(variant, inventory_policy) {
    const { inventory } = this.state
    this.setState({
      inventory: {
        ...inventory,
        [variant.id]: {
          ...inventory[variant.id],
          inventory_policy
        }
      }
    })
  }

  _handleQuantity(variant, inventory_instock) {
    const { inventory } = this.state
    this.setState({
      inventory: {
        ...inventory,
        [variant.id]: {
          ...inventory[variant.id],
          inventory_instock
        }
      }
    })
  }

}

export default InventoryField
