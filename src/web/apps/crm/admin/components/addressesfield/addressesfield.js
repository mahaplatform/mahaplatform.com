import { Button, AddressField } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class AddressesField extends React.PureComponent {

  static propTypes = {
    addresses: PropTypes.array,
    defaultValue: PropTypes.array,
    tabIndex: PropTypes.number,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)

  render() {
    const { addresses, tabIndex } = this.props
    return (
      <div className="addressesfield" tabIndex={ tabIndex }>
        { addresses.map((address, index) => (
          <div className="addressesfield-address" key={ `address_${index}` }>
            <div className="addressesfield-address-field">
              <AddressField { ...this._getAddressField(address, index) } />
            </div>
            { addresses.length > 1 &&
              <div className="addressesfield-address-action">
                <Button { ...this._getPrimaryButton(address, index) } />
              </div>
            }
            { addresses.length > 1 &&
              <Button { ...this._getRemoveButton(index) } />
            }
          </div>
        ))}
        <Button { ...this._getAddButton() } />
      </div>
    )
  }

  componentDidMount() {
    const defaultValue = this.props.defaultValue || [
      { address: {}, is_primary: true }
    ]
    this.props.onSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { addresses } = this.props
    if(!_.isEqual(addresses, prevProps.addresses)) {
      this.props.onChange(addresses)
    }
  }

  _getAddButton() {
    return {
      label: 'Add Another Address',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getAddressField(address, index) {
    return {
      defaultValue: address.address,
      onChange: this._handleUpdate.bind(this, address, index)
    }
  }

  _getPrimaryButton(address, index) {
    return {
      label: 'PRIMARY',
      className: address.is_primary ? 'ui mini blue button' : 'ui mini button',
      handler: this._handlePrimary.bind(this, address, index)
    }
  }

  _getRemoveButton(index) {
    return {
      className: 'addressesfield-address-action',
      icon: 'times',
      handler: this._handleRemove.bind(this, index)
    }
  }

  _handleAdd() {
    this.props.onAdd()
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handlePrimary(address, index) {
    const value = {
      ...address,
      is_primary: true
    }
    this.props.onUpdate(index, value)
  }

  _handleUpdate(address, index, newaddress) {
    const value = {
      ...address,
      address: newaddress
    }
    this.props.onUpdate(index, value)
  }

}

export default AddressesField
