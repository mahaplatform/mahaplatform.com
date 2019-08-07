import RadioGroup from '../../form/select/radio_group'
import TextField from '../../form/textfield'
import PropTypes from 'prop-types'
import Button from '../../button'
import React from 'react'
import _ from 'lodash'

class Text extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    field: PropTypes.object,
    mode: PropTypes.string,
    onDone: PropTypes.func
  }

  state = {
    operator: '$eq',
    value: ''
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <div className="maha-criterion-form-panel">
        <div className="maha-criterion-field">
          <RadioGroup { ...this._getRadioGroup() } />
        </div>
        <div className="maha-criterion-field">
          <TextField { ...this._getTextField() } />
        </div>
        <div className="maha-criterion-field">
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
    const { operator, value } = this.state
    const { mode } = this.props
    return {
      label: mode === 'add' ? 'Add Criteria' : 'Update Criteria',
      color: 'blue',
      disabled: _.includes(['$eq','$lk','$nlk'], operator) && value.length === 0,
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

  _getRadioGroup() {
    const { operator } = this.state
    return {
      defaultValue: operator,
      options: [
        { value: '$eq', text: 'equals' },
        { value: '$lk', text: 'contains' },
        { value: '$nlk', text: 'does not contain' },
        { value: '$kn', text: 'is known' },
        { value: '$nkn', text: 'is unknown' }
      ],
      onChange: this._handleChange.bind(this, 'operator')
    }
  }

  _getTextField() {
    const { operator, value } = this.state
    return {
      defaultValue: value,
      disabled: _.includes(['$nkn','$kn'], operator),
      onChange: this._handleChange.bind(this, 'value')
    }
  }

  _handleDone() {
    const { operator, value } = this.state
    this.props.onDone({ [operator]: value })
  }

  _handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  _handleSet(defaultValue) {
    const operator = Object.keys(defaultValue)[0]
    const value = defaultValue[operator]
    this.setState({ operator, value })
  }

}

export default Text
