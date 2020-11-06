import VariantToken from '../../../tokens/variant'
import { NumberField } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class InventoryField extends React.Component {

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

  render() {
    const { variants } = this.state
    if(!variants) return null
    return (
      <div className="variantsfield-variants">
        <table className="ui unstackable table">
          <tbody>
            { variants.filter(variant => {
              return variant.is_active
            }).map((variant, index) => (
              <tr className="variantsfield-variant" key={`option_${index}`}>
                <td className="unpadded">
                  <VariantToken variant={ variant } />
                </td>
                <td className="collapsing">
                  <NumberField { ...this._getQuantity(variant, index) } />
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }

  componentDidMount() {
    const { product } = this.props
    this.setState({
      variants: product.variants.filter(variant => {
        return variant.is_active
      })
    })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { variants } = this.state
    if(!_.isEqual(variants, prevState.variants)) {
      this._handleChange()
    }
  }

  _getQuantity(variant, index) {
    return {
      defaultValue: 0,
      disabled: variant.inventory_policy === 'unlimited' || !variant.is_active,
      placeholder: 'Quantity',
      onChange: this._handleUpdate.bind(this, index)
    }
  }

  _handleChange() {
    const { variants } = this.state
    this.props.onChange(variants)
  }

  _handleUpdate(index, inventory_quantity) {
    this.setState({
      variants: this.state.variants.map((variant, i) => ({
        ...variant,
        ...i === index ? { inventory_quantity } : {}
      }))
    })
  }

}

export default InventoryField
