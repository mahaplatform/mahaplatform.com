import { Container, ModalPanel, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Chooser extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    products: PropTypes.array,
    onChoose: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const { products } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        { products.length > 0 ?
          <div className="crm-productfield-chooser-products">
            { products.map((product, index) => (
              <div className="crm-productfield-chooser-product" key={`product_${index}`} onClick={ this._handleChoose.bind(this, product)}>
                { product.title }
              </div>
            )) }
          </div> :
          <Message { ...this._getEmpty() } />
        }
      </ModalPanel>
    )
  }

  _getEmpty() {
    return {
      icon: 'times',
      title: 'No products',
      text: 'There are no products associated with this program'
    }
  }

  _getPanel() {
    return {
      title: 'Choose Product',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChoose(product) {
    this.props.onChoose(product)
    this.context.form.pop()
  }

}

const mapResources = (props, context) => ({
  products: '/api/admin/finance/products'
})

export default Container(mapResources)(Chooser)
