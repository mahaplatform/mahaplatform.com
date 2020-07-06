import { Button } from 'maha-admin'
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
    return (
      <div className="variantsfield-variants">
        <table className="ui unstackable table">
          <thead>
            <tr>
              <th>Title</th>
              <th className="collapsing">Price</th>
              <th className="collapsing">Inventory</th>
              <th className="collapsing" />
              <th className="collapsing" />
            </tr>
          </thead>
          <tbody>
            { variants.map((variant, index) => (
              <tr className={ this._getClass(variant) } key={`option_${index}`}>
                <td>{ variant.title }</td>
                <td>{ this._getPrice(variant) }</td>
                <td>{ variant.inventory_quantity }</td>
                <td>
                  <Button { ...this._getEdit(index) } />
                </td>
                <td>
                  { variant.is_active ?
                    <Button { ...this._getDeactivate(index) } /> :
                    <Button { ...this._getActivate(index) } />
                  }
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
      icon: 'fw fa-refresh',
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
      icon: 'fw fa-times',
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

  _getPrice(variant) {
    if(variant.price_type === 'free') return 'FREE'
    if(variant.price_type === 'fixed') return numeral(variant.fixed_price).format('0.00')
    return `${numeral(variant.low_price, '0.00')} - ${numeral(variant.high_price).format('0.00')}`
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