import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'
import _ from 'lodash'

class Productfield extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    products: PropTypes.array,
    defaultValue: PropTypes.array,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { products } = this.props
    return (
      <div className="crm-productfield">
        { products.map((product, index) => (
          <div className="crm-productfield-product" key={`product_${index}`}>
            <div className="crm-productfield-product-label">
              { product.title }
            </div>
            <div className="crm-productfield-product-remove" onClick={ this._handleRemove.bind(this, index) }>
              <i className="fa fa-times" />
            </div>
          </div>
        )) }
        <div className="crm-productfield-product-add">
          <Button { ...this._getAdd() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.props.onSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { products } = this.props
    if(!_.isEqual(products, prevProps.products)) {
      this._handleChange()
    }
  }

  _getAdd() {
    return {
      label: 'Add a product',
      className: 'link',
      handler: this._handleNew
    }
  }

  _getChooser() {
    return {
      onChoose: this._handleAdd
    }
  }

  _handleAdd(product) {
    this.props.onAdd(product)
  }

  _handleNew() {
    this.context.form.push(<Chooser { ...this._getChooser() } />)
  }

  _handleChange() {
    const { products } = this.props
    this.props.onChange(products)
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

}

export default Productfield
