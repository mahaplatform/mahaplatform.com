import PropTypes from 'prop-types'
import Button from '../../button'
import Search from '../../search'
import React from 'react'

class Select extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    field: PropTypes.object,
    mode: PropTypes.string,
    onDone: PropTypes.func,
    onCancel: PropTypes.func
  }

  state = {
    value: []
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <div className="maha-criterion-form">
        <div className="maha-criterion-form-body">
          <Search { ...this._getSearch() } />
        </div>
        <div className="maha-criterion-form-footer">
          <Button { ...this._getButton() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleSet(defaultValue)
  }

  _getButton() {
    const { mode } = this.props
    return {
      label: mode === 'add' ? 'Add Criteria' : 'Update Criteria',
      color: 'lightgrey',
      handler: this._handleDone
    }
  }

  _getPanel() {
    const { field } = this.props
    return {
      title: field.label,
      color: 'lightgrey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _getSearch() {
    const { value } = this.state
    const { field } = this.props
    return {
      defaultValue: value,
      endpoint: field.endpoint,
      format: field.format,
      label: field.label,
      multiple: field.multiple,
      options: field.options,
      text: field.text,
      value: field.value,
      onChange: this._handleChange
    }
  }

  _handleChange(value) {
    this.setState({ value })
  }

  _handleDone() {
    const { value } = this.state
    const { field } = this.props
    const operator = field.multiple ? '$in' : '$eq'
    this.props.onDone({ [operator]: value })
  }

  _handleSet(defaultValue) {
    const operator = Object.keys(defaultValue)[0]
    const value = defaultValue[operator]
    this.setState({ value })
  }

}

export default Select
