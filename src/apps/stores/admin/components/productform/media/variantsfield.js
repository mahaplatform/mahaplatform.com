import VariantToken from '../../../tokens/variant'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'
import _ from 'lodash'

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

  _handleBack = this._handleBack.bind(this)
  _handleEdit = this._handleEdit.bind(this)

  render() {
    const { variants } = this.state
    const { product } = this.props
    return (
      <div className="variantsfield-variants selectable">
        <table className="ui unstackable table">
          <tbody>
            { variants.map((variant, index) => (
              <tr className="variantsfield-variant" key={`option_${index}`} onClick={ this._handleEdit.bind(this, variant, index) }>
                <td className="unpadded">
                  <VariantToken product={ product } variant={ variant } />
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
      variants: product.variants
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

  _getEdit(variant, index) {
    const { product } = this.props
    return {
      product,
      variant,
      onBack: this._handleBack,
      onDone: this._handleUpdate.bind(this, index)
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleEdit(variant, index) {
    this.context.form.push(<Edit { ...this._getEdit(variant, index) } />)
  }

  _handleChange() {
    const { variants } = this.state
    this.props.onChange(variants)
  }

  _handleUpdate(index, variant) {
    this.context.form.pop()
  }

}

export default VariantsField
