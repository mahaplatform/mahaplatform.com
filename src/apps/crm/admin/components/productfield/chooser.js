import { Container, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Chooser extends React.PureComponent {

  static propTypes = {
    products: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { products } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="crm-productfield-chooser-products">
          { products.map((product, index) => (
            <div className="crm-productfield-chooser-product" key={`product_${index}`} onClick={ this._handleChoose.bind(this, product)}>
              { product.title }
            </div>
          )) }
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose Product'
    }
  }

  _handleChoose(product) {
    this.props.onChoose(product)
  }

}

const mapResources = (props, context) => ({
  products: '/api/admin/finance/products'
})

export default Container(mapResources)(Chooser)
