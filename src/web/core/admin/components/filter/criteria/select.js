import RadioGroup from '../../form/select/radio_group'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Buttons from '../../buttons'
import Search from '../../search'
import React from 'react'
import _ from 'lodash'

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
    operator: '$eq',
    value: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-form">
          <div className="maha-criterion-form-header">
            <RadioGroup { ...this._getRadioGroup() } />
          </div>
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

  componentDidUpdate(prevProps, prevState) {
    const { operator, value } = this.state
    if(operator !== prevState.operator) {
      this.props.onChange({ [operator]: value })
    }
    if(!_.isEqual(operator !== prevState.operator)) {
      this.props.onChange({ [operator]: value })
    }
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
      title: field.name,
      color: 'lightgrey'
    }
  }

  _getRadioGroup() {
    const { operator } = this.state
    return {
      defaultValue: operator,
      options: [
        { value: '$eq', text: 'is' },
        { value: '$neq', text: 'is not' },
        { value: '$in', text: 'is one of' },
        { value: '$nin', text: 'is not one of' }
      ],
      onChange: this._handleChange.bind(this, 'operator')
    }
  }

  _getSearch() {
    const { operator, value } = this.state
    const { field } = this.props
    return {
      defaultValue: _.castArray(value),
      endpoint: field.endpoint,
      format: field.format,
      label: field.name,
      multiple: _.includes(['$in','$nin'], operator),
      options: field.options,
      text: field.text,
      value: field.value,
      onChange: this._handleChange.bind(this, 'value')
    }
  }

  _handleChange(key, value) {
    this.setState({ [key]: value })
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleDone() {
    const { operator, value } = this.state
    this.props.onDone({ [operator]: value })
  }

  _handleSet(defaultValue) {
    const operator = Object.keys(defaultValue)[0]
    const value = defaultValue[operator]
    this.setState({ value })
  }

}

export default Select
