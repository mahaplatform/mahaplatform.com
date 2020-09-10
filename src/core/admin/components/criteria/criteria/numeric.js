import RadioGroup from '../../form/select/radio_group'
import NumberField from '../../form/numberfield'
import MoneyField from '../../form/moneyfield'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class Numeric extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    code: PropTypes.string,
    comparisons: PropTypes.array,
    field: PropTypes.object,
    name: PropTypes.object,
    type: PropTypes.string,
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
    const { type } = this.props
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
                  { type === 'numberfield' ?
                    <NumberField { ...this._getNumeric() } /> :
                    <MoneyField { ...this._getNumeric() } />
                  }
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
    const { comparisons } = this.props
    return comparisons || [
      { value: '$eq', text: 'equals' },
      { value: '$neq', text: 'does not equal' },
      { value: '$lt', text: 'less than' },
      { value: '$lte', text: 'less than or equal to' },
      { value: '$gt', text: 'greater than' },
      { value: '$gte', text: 'greater than or equal to' },
      { value: '$kn', text: 'is known' },
      { value: '$nkn', text: 'is unknown' }
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

  _getNumeric() {
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
    const { operator, type, value } = this.state
    const { code } = this.props
    this.props.onDone({
      code,
      operator,
      value,
      data: type !== 'numberfield' ? {
        text: numeral(value).format('0.00')
      } : null
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

export default Numeric
