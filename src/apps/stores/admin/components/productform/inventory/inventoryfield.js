import { NumberField } from 'maha-admin'
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
    const { product } = this.props
    if(!variants) return null
    return (
      <div className="variantsfield-variants">
        <table className="ui unstackable table">
          <thead>
            <tr>
              <th>Title</th>
              <th className="collapsing">Inventory</th>
            </tr>
          </thead>
          <tbody>
            { variants.map((variant, index) => (
              <tr className="variantsfield-variant" key={`option_${index}`}>
                <td>
                  <strong>{ product.title } ({ variant.title })</strong><br />
                  { this._getPrice(variant) }
                </td>
                <td className="right aligned">
                  <NumberField { ...this._getQuantity(variant) } />
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

  componentDidUpdate(prevProps, prevState) {
    const { variants } = this.state
    if(!_.isEqual(variants, prevState.variants)) {
      this._handleChange()
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

  _handleChange() {
    const { variants } = this.state
    this.props.onChange(variants)
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

}

export default InventoryField
