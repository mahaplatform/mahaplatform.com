import { Search, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Coupon extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    line_items: PropTypes.array,
    onChoose: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Search { ...this._getSearch() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose Coupon',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _getSearch() {
    const { line_items } = this.props
    return {
      endpoint: '/api/admin/finance/coupons',
      filter: {
        product_id: {
          $in: line_items.map(line_item => line_item.product_id)
        }
      },
      label: 'Coupon',
      value: 'id',
      text: 'code',
      onChange: this._handleChoose
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChoose(id) {
    this.props.onChoose(id)
    this.context.form.pop()
  }

}

export default Coupon
