import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'
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
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
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
              { product.description }
            </div>
            <div className="crm-productfield-product-remove" onClick={ this._handleEdit.bind(this, index) }>
              <i className="fa fa-pencil" />
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

  _getEdit(index) {
    const { products } = this.props
    return {
      product: products[index],
      onDone: this._handleUpdate.bind(this, index)
    }
  }

  _getNew() {
    return {
      onDone: this._handleAdd
    }
  }

  _handleAdd(product) {
    this.props.onAdd(product)
  }

  _handleEdit(index) {
    this.context.form.push(<Edit { ...this._getEdit(index) } />)
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

  _handleUpdate(index, product) {
    this.props.onUpdate(index, product)
  }

}

export default Productfield
