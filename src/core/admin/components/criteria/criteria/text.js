import RadioGroup from '../../form/select/radio_group'
import ModalPanel from '../../modal_panel'
import TextField from '../../form/textfield'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Text extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    code: PropTypes.string,
    field: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    operator: null,
    value: ''
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
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
      this._handleChange()
    }
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getOperators() {
    const { field } = this.props
    return field.comparisons || [
      { value: '$eq', text: 'equals' },
      { value: '$neq', text: 'does not equal' },
      { value: '$lk', text: 'contains' },
      { value: '$nlk', text: 'does not contain' },
      { value: '$kn', text: 'is known' },
      { value: '$nkn', text: 'is unknown' }
    ]
  }

  _getPanel() {
    const { operator, value } = this.state
    const { field } = this.props
    return {
      title: field.name,
      color: 'grey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      buttons: [{
        label: 'Add Criteria',
        color: 'blue',
        disabled: _.includes(['$eq','$nek','$lk','$nlk'], operator) && value.length === 0,
        handler: this._handleDone
      }]
    }
  }

  _getRadioGroup() {
    const options = this._getOperators()
    const { operator } = this.state
    return {
      defaultValue: operator || options[0].value,
      options,
      onChange: this._handleUpdate.bind(this, 'operator')
    }
  }

  _getTextField() {
    const { operator, value } = this.state
    return {
      defaultValue: value,
      disabled: _.includes(['$nkn','$kn'], operator),
      placeholder: 'Enter a value',
      onChange: this._handleUpdate.bind(this, 'value')
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange() {
    const { operator, value } = this.state
    const { code, field } = this.props
    this.props.onChange({
      code,
      field: field.key,
      operator,
      value,
      data: null
    })
  }

  _handleDone() {
    const { operator, value } = this.state
    const { code, field } = this.props
    this.props.onDone({
      code,
      field: field.key,
      operator,
      value,
      data: null
    })
  }

  _handleSet(defaultValue) {
    const operator = Object.keys(defaultValue)[0]
    const value = defaultValue[operator]
    this.setState({ operator, value })
  }

  _handleUpdate(key, value) {
    this.setState({
      [key]: value
    })
  }

}

export default Text
