import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class VariantsField extends React.Component {

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
  _handleDeactivate = this._handleDeactivate.bind(this)

  render() {
    const { variants } = this.state
    const { product } = this.props
    return (
      <div className="variantsfield-variants">
        <table className="ui unstackable table">
          <tbody>
            { variants.map((variant, index) => (
              <tr className={ this._getClass(variant) } key={`option_${index}`}>
                <td className="collapsing">
                  { variant.is_active ?
                    <Button { ...this._getDeactivate(index) } /> :
                    <Button { ...this._getActivate(index) } />
                  }
                </td>
                <td>{ product.title } ({ variant.title })</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      variants: this._getVariants()
    })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { variants } = this.state
    const { product } = this.props
    if(!_.isEqual(product.options, prevProps.product.options)) {
      this.setState({
        variants: this._getVariants()
      })
    }
    if(!_.isEqual(variants, prevState.variants)) {
      this._handleChange()
    }
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

  _getVariants() {
    const { product } = this.props
    if(!product.options) return []
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
      price_type: product.price_type,
      project_id: product.project_id,
      revenue_type_id: product.revenue_type_id,
      fixed_price: product.fixed_price,
      low_price: product.low_price,
      high_price: product.high_price,
      overage_strategy: product.overage_strategy,
      donation_revenue_type_id: product.donation_revenue_type_id,
      tax_rate: product.tax_rate,
      is_tax_deductible: product.is_tax_deductible,
      inventory_policy: 'deny',
      inventory_quantity: 0,
      is_active: true,
      photos: []
    }))
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

  _handleChange() {
    const { variants } = this.state
    this.props.onChange(variants)
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

}

export default VariantsField
