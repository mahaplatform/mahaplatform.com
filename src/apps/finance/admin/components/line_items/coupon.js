import { Search2, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Coupon extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    onChoose: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Search2 { ...this._getSearch() } />
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
    return {
      endpoint: '/api/admin/finance/coupons',
      label: 'Coupon',
      value: 'id',
      text: 'code',
      onChoose: this._handleChoose
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChoose(coupon) {
    this.props.onChoose(coupon.id)
    this.context.form.pop()
  }

}

export default Coupon
