import RadioGroup from '../../form/select/radio_group'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Time extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    code: PropTypes.string,
    comparisons: PropTypes.array,
    field: PropTypes.object,
    name: PropTypes.object,
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
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-form">
          <div className="maha-criterion-form-header">
            <RadioGroup { ...this._getRadioGroup() } />
          </div>
          <div className="maha-criterion-form-body">
            <div className="maha-criterion-form-panel">
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
    const { comparisons } = this.props
    return comparisons || [
      { value: '$tbf', text: 'is before' },
      { value: '$taf', text: 'is after' },
      { value: '$tbt', text: 'is between' }
    ]
  }

  _getPanel() {
    const { operator, value } = this.state
    const { name } = this.props
    return {
      title: name,
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
      deselectable: false,
      options,
      onChange: this._handleUpdate.bind(this, 'operator')
    }
  }

  _getTimeField() {
    const { operator, value } = this.state
    return {
      defaultValue: value,
      disabled: _.includes(['$nkn','$kn'], operator),
      placeholder: 'Enter a value',
      onChange: _.debounce(this._handleUpdate.bind(this, 'value'), 250)
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange() {
    const { operator, value } = this.state
    const { code } = this.props
    this.props.onChange({
      code,
      operator,
      value,
      data: null
    })
  }

  _handleDone() {
    const { operator, value } = this.state
    const { code } = this.props
    this.props.onDone({
      code,
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

export default Time
