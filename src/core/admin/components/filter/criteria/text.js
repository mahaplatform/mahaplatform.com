import RadioGroup from '../../form/select/radio_group'
import ModalPanel from '../../modal_panel'
import TextField from '../../form/textfield'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Text extends React.Component {

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
    value: ''
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { operator } = this.state
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-form">
          <div className="maha-criterion-form-header">
            <RadioGroup { ...this._getRadioGroup() } />
          </div>
          <div className="maha-criterion-form-body">
            <div className="maha-criterion-form-panel">
              { !_.includes(['$nkn','$kn'], operator) &&
                <div className="maha-criterion-field">
                  <TextField { ...this._getTextField() } />
                </div>
              }
            </div>
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
    if(value !== prevState.value) {
      this.props.onChange({ [operator]: value })
    }
  }

  _getPanel() {
    const { operator, value } = this.state
    const { mode, field } = this.props
    return {
      title: field.name,
      color: 'grey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      buttons: [{
        label: mode === 'add' ? 'Add Criteria' : 'Update Criteria',
        color: 'blue',
        disabled: _.includes(['$eq','$nek','$lk','$nlk'], operator) && value.length === 0,
        handler: this._handleDone
      }]
    }
  }

  _getRadioGroup() {
    const { operator } = this.state
    return {
      defaultValue: operator,
      options: [
        { value: '$eq', text: 'equals' },
        { value: '$neq', text: 'does not equal' },
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
      placeholder: 'Enter a value',
      onChange: this._handleChange.bind(this, 'value')
    }
  }

  _handleCancel() {
    this.props.onCancel()
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
