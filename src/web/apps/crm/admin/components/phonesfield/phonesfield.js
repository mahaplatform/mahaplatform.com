import { Button, PhoneField } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Phonesfield extends React.PureComponent {

  static propTypes = {
    defaultValue: PropTypes.array,
    numbers: PropTypes.array,
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
    const { numbers, tabIndex } = this.props
    return (
      <div className="phonesfield" tabIndex={ tabIndex }>
        { numbers.map((number, index) => (
          <div className="phonesfield-number" key={ `number_${index}` }>
            <div className="phonesfield-number-field">
              <PhoneField { ...this._getPhoneField(number, index) } />
            </div>
            { numbers.length > 1 &&
              <div className="emailsfield-email-action">
                <Button { ...this._getPrimaryButton(number, index) } />
              </div>
            }
            { numbers.length > 1 &&
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
      { number: '', is_primary: true }
    ]
    this.props.onSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { numbers } = this.props
    if(!_.isEqual(numbers, prevProps.numbers)) {
      this.props.onChange(numbers)
    }
  }

  _getAddButton() {
    return {
      label: 'Add Another Number',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getPhoneField(number, index) {
    return {
      defaultValue: number.number,
      onChange: this._handleUpdate.bind(this, number, index)
    }
  }

  _getPrimaryButton(number, index) {
    return {
      label: 'PRIMARY',
      className: number.is_primary ? 'ui mini blue button' : 'ui mini button',
      handler: this._handlePrimary.bind(this, number, index)
    }
  }

  _getRemoveButton(index) {
    return {
      className: 'phonesfield-number-action',
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

  _handlePrimary(phone_number, index) {
    const value = {
      ...phone_number,
      is_primary: true
    }
    this.props.onUpdate(index, value)
  }

  _handleUpdate(phone_number, index, number) {
    const value = {
      ...phone_number,
      number
    }
    this.props.onUpdate(index, value)
  }

}

export default Phonesfield
