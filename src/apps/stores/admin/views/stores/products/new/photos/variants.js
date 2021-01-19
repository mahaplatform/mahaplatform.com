import VariantToken from '@apps/stores/admin/tokens/variant'
import PropTypes from 'prop-types'
import Variant from './variant'
import React from 'react'
import _ from 'lodash'

class Variants extends React.Component {

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

  _handleBack = this._handleBack.bind(this)
  _handleVariant = this._handleVariant.bind(this)

  render() {
    const { variants } = this.state
    return (
      <div className="variantsfield-variants selectable">
        <table className="ui unstackable table">
          <tbody>
            { variants.map((variant, index) => (
              <tr className="variantsfield-variant" key={`option_${index}`} onClick={ this._handleVariant.bind(this, variant, index) }>
                <td className="unpadded">
                  <VariantToken variant={ variant } />
                </td>
                <td className="collapsing">
                  <i className="fa fa-chevron-right" />
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

  _getVariant(variant, index) {
    return {
      variant,
      onBack: this._handleBack,
      onDone: this._handleUpdate.bind(this, index)
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleVariant(variant, index) {
    this.context.form.push(<Variant { ...this._getVariant(variant, index) } />)
  }

  _handleChange() {
    const { variants } = this.state
    this.props.onChange(variants)
  }

  _handleUpdate(index, data) {
    this.setState({
      variants: this.state.variants.map((variant, i) => ({
        ...variant,
        ...i === index ? data : {}
      }))
    })
    this.context.form.pop()
  }

}

export default Variants
