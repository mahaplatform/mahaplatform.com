import PaymentField from '../../fields/paymentfield'
import ProductField from '../../fields/productfield'
import PropTypes from 'prop-types'
import React from 'react'

class Payment extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array,
    form: PropTypes.object
  }

  _handleDragStart = this._handleDragStart.bind(this)

  render() {
    const fields = this._getFields()
    return (
      <div className="flowchart-designer-blocks">
        <p>These fields are for soliciting user payment and will add a second
        page to the form for collecting payment information</p>
        { fields.map((field, index) => (
          <div className="flowchart-designer-block" key={`field_${index}`} { ...this._getField(field) }>
            <div className="flowchart-designer-block-icon action">
              <i className={`fa fa-fw fa-${ field.icon }`} />
            </div>
            <div className="flowchart-designer-block-label">
              { field.label.toUpperCase() }
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getFields() {
    return [
      { label: 'Payment Field', icon: 'dollar', type: 'paymentfield', component: PaymentField },
      { label: 'Product Field', icon: 'shopping-bag', type: 'productfield', component: ProductField }
    ]
  }

  _getField(field) {
    return {
      draggable: true,
      onDragStart: this._handleDragStart.bind(this, field)
    }
  }

  _handleDragStart(field, e) {
    e.dataTransfer.dropEffect = 'all'
    e.dataTransfer.setData('field', JSON.stringify({
      type: field.type
    }))
  }

}

export default Payment
