import RadioGroup from '../../form/select/radio_group'
import Checkboxes from '../../form/select/checkboxes'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

class Date extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    code: PropTypes.string,
    field: PropTypes.object,
    name: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    operator: '$in',
    value: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDay = this._handleDay.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleOperator = this._handleOperator.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-form">
          <div className="maha-criterion-form-header">
            <RadioGroup { ...this._getOperator() } />
          </div>
          <div className="maha-criterion-form-body">
            <div className="maha-criterion-form-panel">
              <div className="maha-criterion-field">
                <Checkboxes { ...this._getDay() } />
              </div>
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
    return [
      { value: '$in', text: 'is one of' },
      { value: '$nin', text: 'is not one of' }
    ]
  }

  _getPanel() {
    const { value } = this.state
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
        disabled: value.length === 0,
        handler: this._handleDone
      }]
    }
  }

  _getDay() {
    return {
      options: days.map((text, value) => ({
        value,
        text
      })),
      onChange: this._handleDay
    }
  }

  _getOperator() {
    const options = this._getOperators()
    const { operator } = this.state
    return {
      defaultValue: operator || options[0].value,
      deselectable: false,
      options,
      onChange: this._handleOperator
    }
  }

  _getData(value) {
    if(value === null) return null
    return value.map(index => ({
      text: days[index]
    }))
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
      data: this._getData(value)
    })
  }

  _handleDay(value) {
    this.setState({ value })
  }

  _handleDone() {
    const { operator, value } = this.state
    const { code } = this.props
    this.props.onDone({
      code,
      operator,
      value,
      data: this._getData(value)
    })
  }

  _handleOperator(operator) {
    this.setState({ operator })
  }

  _handleSet(value) {
    this.setState({ value })
  }

}

export default Date
