import VariantToken from '@apps/stores/admin/tokens/variant'
import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Fulfill extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    order: PropTypes.object
  }

  state = {
    selected: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { order } = this.props
    return (
      <ModalPanel {...this._getPanel()}>
        <div className="maha-table stores-fulfill">
          <table>
            <thead>
              <tr>
                <td className="collapsing" />
                <td>Product</td>
                <td className="collapsing">Status</td>
              </tr>
            </thead>
            <tbody>
              { order.items.map((item, index) => (
                <tr key={`item_${index}`} className={ this._getClass(item) } onClick={ this._handleToggle.bind(this, item) }>
                  <td className="icon">
                    <i className={`fa fa-fw fa-${this._getIcon(item)}`} />
                  </td>
                  <td className="unpadded">
                    <VariantToken product={ item.variant.product } variant={ item.variant }/>
                  </td>
                  <td>
                    { item.status === 'fulfilled' ? 'FULFILLED' : '' }
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </ModalPanel>
    )
  }

  _getClass(item) {
    const classes = []
    if(item.status === 'fulfilled') classes.push('fulfilled')
    return classes.join(' ')
  }

  _getIcon(item) {
    const { selected } = this.state
    return _.includes(selected, item.id) ? 'check-square' : 'square-o'
  }

  _getPanel() {
    return {
      title: 'Fulfill Order',
      leftitems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Save', handler: this._handleSave }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSave() {
    const { store, order } = this.props
    const { selected } = this.state
    this.context.network.request({
      endpoint: `/api/admin/stores/stores/${store.id}/orders/${order.id}/fulfill`,
      method: 'PATCH',
      body: {
        item_ids: selected
      },
      onFailure: () => this.context.flash.set('error', `Unable to fulfill items`),
      onSuccess: () => this.context.flash.set('success', `Successfully fulfilled ${selected.length} items`)
    })
  }

  _handleSuccess() {
    this.context.modal.close()
  }

  _handleToggle(item) {
    const { selected } = this.state
    this.setState({
      selected: _.xor(selected, [item.id])
    })
  }

}

export default Fulfill
