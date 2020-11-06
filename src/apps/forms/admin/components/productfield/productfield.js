import { Button } from '@admin'
import PropTypes from 'prop-types'
import Product from './product'
import React from 'react'

import New from './new'
import _ from 'lodash'

class Productfield extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    products: PropTypes.array,
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onReorder: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleReorder = this._handleReorder.bind(this)

  render() {
    const { products } = this.props
    return (
      <div className="crm-productfield">
        { products.map((product, index) => (
          <Product { ...this._getProduct(product, index)  } key={`product_${index}`} />
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

  _getNew() {
    return {
      onDone: this._handleAdd
    }
  }

  _getProduct(product, index) {
    return {
      index,
      product,
      onRemove: this._handleRemove.bind(this, index),
      onReorder: this._handleReorder.bind(this),
      onUpdate: this._handleUpdate.bind(this, index)
    }
  }

  _handleAdd(product) {
    this.props.onAdd(product)
  }

  _handleNew() {
    this.context.form.push(<New { ...this._getNew() } />)
  }

  _handleChange() {
    const { value } = this.props
    this.props.onChange(value)
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handleReorder(from, to) {
    this.props.onReorder(from, to)
  }

  _handleUpdate(index, product) {
    this.props.onUpdate(index, product)
  }

}

export default Productfield
