import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Buttons from '../../buttons'
import Search from '../../search'
import React from 'react'

class Select extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    field: PropTypes.object,
    mode: PropTypes.string,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    value: []
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-form">
          <div className="maha-criterion-form-body">
            <Search { ...this._getSearch() } />
          </div>
          <div className="maha-criterion-form-footer">
            <Buttons { ...this._getButtons() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleSet(defaultValue)
  }

  _getButtons() {
    const { mode } = this.props
    return {
      buttons: [{
        label: 'Cancel',
        color: 'lightgrey',
        handler: this._handleCancel
      },{
        label: mode === 'add' ? 'Add Criteria' : 'Update Criteria',
        color: 'blue',
        handler: this._handleDone
      }]
    }
  }

  _getPanel() {
    const { field } = this.props
    return {
      title: field.label,
      color: 'lightgrey'
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

  _handleCancel() {
    this.props.onCancel()
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
