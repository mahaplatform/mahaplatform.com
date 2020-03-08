import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class ProductField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.array,
    htmlFor: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    products: PropTypes.array,
    quantities: PropTypes.object,
    required: PropTypes.bool,
    status: PropTypes.string,
    subtotal: PropTypes.number,
    tabIndex: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number,
    value: PropTypes.object,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  _handleFocus = this._handleFocus.bind(this)

  render() {
    const { products, subtotal, tax, total } = this.props
    return (
      <div className="maha-productfield">
        <div className="maha-productfield-products">
          <div className="maha-productfield-product-header">
            <div className="maha-productfield-product-header-item">
              Item
            </div>
            <div className="maha-productfield-product-header-price">
              Price
            </div>
            <div className="maha-productfield-product-header-qty">
              Qty
            </div>
            <div className="maha-productfield-product-header-total">
              Total
            </div>
            <div className="maha-productfield-product-header-action" />
          </div>
          <div className="maha-productfield-product">
            <div className="maha-productfield-product-item">
              <div className="maha-productfield-product-item-title">
                5 Ducks
              </div>
            </div>
            <div className="maha-productfield-product-price">
              20.00
            </div>
            <div className="maha-productfield-product-qty">
              <input type="text" value="5" />
            </div>
            <div className="maha-productfield-product-total">
              100.00
            </div>
            <div className="maha-productfield-product-action">
              <i className="fa fa-times" />
            </div>
          </div>
          <div className="maha-productfield-product">
            <div className="maha-productfield-product-item">
              <div className="maha-productfield-product-item-title">
                T-Shirt
              </div>
              <div className="maha-productfield-product-item-variation">
                Size: large
              </div>
              <div className="maha-productfield-product-item-variation">
                Color: red
              </div>
            </div>
            <div className="maha-productfield-product-price">
              10.00
            </div>
            <div className="maha-productfield-product-qty">
              <input type="text" value="1" />
            </div>
            <div className="maha-productfield-product-total">
              10.00
            </div>
            <div className="maha-productfield-product-action">
              <i className="fa fa-times" />
            </div>
          </div>
          <div className="maha-productfield-product">
            <div className="maha-productfield-product-item">
              <div className="maha-productfield-product-item-title">
                T-Shirt
              </div>
              <div className="maha-productfield-product-item-variation">
                Size: small
              </div>
              <div className="maha-productfield-product-item-variation">
                Color: green
              </div>
            </div>
            <div className="maha-productfield-product-price">
              10.00
            </div>
            <div className="maha-productfield-product-qty">
              <input type="text" value="1" />
            </div>
            <div className="maha-productfield-product-total">
              10.00
            </div>
            <div className="maha-productfield-product-action">
              <i className="fa fa-times" />
            </div>
          </div>
        </div>

        <div className="maha-productfield-products-add">
          <div className="maha-productfield-products-add-body">
            <div className="field">
              <label>Item</label>
              <div className="ui fluid selection dropdown">
                <i className="dropdown icon" />
                <div className="text">T-Shirt ($10.00)</div>
                <div className="menu">
                  <div className="item">
                    T-Shirt
                  </div>
                  <div className="item">
                    5 Ducks
                  </div>
                </div>
              </div>
            </div>
            <div className="two fields">
              <div className="field">
                <label>Size</label>
                <div className="ui fluid selection dropdown">
                  <i className="dropdown icon" />
                  <div className="text">large</div>
                  <div className="menu">
                    <div className="item">
                      T-Shirt
                    </div>
                    <div className="item">
                      5 Ducks
                    </div>
                  </div>
                </div>
              </div>
              <div className="field">
                <label>Color</label>
                <div className="ui fluid selection dropdown">
                  <i className="dropdown icon" />
                  <div className="text">green</div>
                  <div className="menu">
                    <div className="item">
                      T-Shirt
                    </div>
                    <div className="item">
                      5 Ducks
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="maha-productfield-products-add-footer">
            <button className="ui black small button">
              Add
            </button>
          </div>
        </div>


        { false &&

          <table className="ui unstackable celled table">
            <thead>
              <tr>
                <th>Item</th>
                <th className="collapsing">Qty</th>
                <th className="collapsing">Price</th>
                <th className="collapsing">Total</th>
              </tr>
            </thead>
            <tbody>
              { products.length === 0 &&
                <tr>
                  <td colSpan="4">There are no products</td>
                </tr>
              }
              { products.map((product, index) => (
                <tr key={`product_${index}`}>
                  <td>{ product.title }</td>
                  <td className="input">
                    <input { ...this._getInput(product) } />
                  </td>
                  <td>{ numeral(product.price).format('0.00') }</td>
                  <td>{ numeral(product.total).format('0.00') }</td>
                </tr>
              )) }
              { tax > 0 &&
                <tr className="total">
                  <td colSpan="3">Subtotal</td>
                  <td>{ numeral(subtotal).format('0.00') }</td>
                </tr>
              }
              { tax > 0 &&
                <tr>
                  <td colSpan="3">Tax</td>
                  <td>{ numeral(tax).format('0.00') }</td>
                </tr>
              }
              <tr className="total">
                <td colSpan="3">Total</td>
                <td>{ numeral(total).format('0.00') }</td>
              </tr>
            </tbody>
          </table>
        }
      </div>
    )
  }

  componentDidMount() {
    const { onReady } = this.props
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { quantities, status } = this.props
    if(!_.isEqual(quantities, prevProps.quantities)) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _getInput(product) {
    const { tabIndex } = this.props
    return {
      tabIndex,
      type: 'text',
      value: product.quantity,
      onFocus: this._handleFocus,
      onChange: this._handleUpdate.bind(this, product.id)
    }
  }

  _handleFocus(e) {
    e.target.select()
  }

  _handleChange() {
    this.props.onChange(this.props.value)
  }

  _handleUpdate(id, e) {
    const raw = e.target.value
    const value = raw.length > 0 ? parseInt(raw) : 0
    this.props.onSet(id, value)
  }

  _handleValidate() {
    const { required, subtotal, value } = this.props
    if(required && subtotal === 0) {
      this.props.onValidate(null, 'You must specify at least one item')
    } else {
      this.props.onValidate(value)
    }
  }

}

export default ProductField
