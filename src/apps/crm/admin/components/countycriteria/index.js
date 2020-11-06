import { Dropdown, ModalPanel, RadioGroup, Search } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class CountyCriteria extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    code: PropTypes.string,
    filter: PropTypes.object,
    name: PropTypes.string,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    state: null,
    operator: null,
    value: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleOperator = this._handleOperator.bind(this)
  _handleState = this._handleState.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-form">
          <div className="maha-criterion-form-header">
            <RadioGroup { ...this._getRadioGroup() } />
          </div>
          <div className="maha-criterion-form-body">
            <div className="maha-criterion-form-chooser">
              <Dropdown { ...this._getState() } />
            </div>
            <Search { ...this._getCounty() } />
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
    const { value, operator } = this.state
    if(operator !== prevState.operator) {
      this._handleChange()
    }
    if(!_.isEqual(value, prevState.value)) {
      this._handleChange()
    }
  }

  _getState() {
    return {
      endpoint: '/api/admin/states',
      value: 'short_name',
      text: 'full_name',
      onChange: this._handleState
    }
  }

  _getCounty() {
    const { state } = this.state
    return {
      ...state ? { endpoint: `/api/admin/states/${state.toLowerCase()}/counties` } : {},
      search: false,
      text: 'text',
      value: 'value',
      onChange: this._handleUpdate
    }
  }

  _getOperators() {
    return [
      { value: '$eq', text: 'is in' },
      { value: '$neq', text: 'is not in' }
    ]
  }

  _getPanel() {
    const { operator, value } = this.state
    const { name } = this.props
    return {
      title: name,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      color: 'grey',
      buttons: [{
        label: 'Add Criteria',
        color: 'blue',
        disabled: (!value && !_.includes(['$nl','$nnl'], operator)),
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
      onChange: this._handleOperator
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
      value: value ? value.toLowerCase() : null,
      data: {
        text: value
      }
    })
  }

  _handleDone() {
    const { operator, value } = this.state
    const { code } = this.props
    this.props.onDone({
      code,
      operator,
      value: value ? value.toLowerCase() : null,
      data: {
        text: value
      }
    })
  }

  _handleOperator(operator) {
    this.setState({ operator })
  }

  _handleSet(defaultValue) {
    const operator = Object.keys(defaultValue)[0]
    const value = defaultValue[operator]
    this.setState({ value })
  }

  _handleState(state) {
    this.setState({ state })
  }

  _handleUpdate(value) {
    this.setState({ value })
  }

}

export default CountyCriteria
