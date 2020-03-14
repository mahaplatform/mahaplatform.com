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
  _handleChange = this._handleChange.bind(this)

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
              <div className="phonesfield-number-action">
                <Button { ...this._getPrimaryButton(number, index) } />
              </div>
            }
            { numbers.length > 1 &&
              <Button { ...this._getRemoveButton(index) } />
            }
          </div>
        ))}
        <div className="phonesfield-add">
          <Button { ...this._getAddButton() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const defaultValue = this._getDefaultValue()
    this.props.onSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { numbers } = this.props
    if(!_.isEqual(numbers, prevProps.numbers)) {
      this._handleChange()
    }
  }

  _getAddButton() {
    return {
      label: 'Add Another Number',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getDefaultValue() {
    const { defaultValue } = this.props
    return defaultValue && defaultValue.length > 0 ? defaultValue: [
      { number: null, is_primary: true }
    ]
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

  _handleChange() {
    const numbers = this.props.numbers.filter(number => {
      return number.number !== null
    })
    this.props.onChange(numbers)
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
