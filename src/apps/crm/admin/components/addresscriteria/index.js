import { ModalPanel, RadioGroup } from 'maha-admin'
import PropTypes from 'prop-types'
import Distance from './distance'
import React from 'react'
import Map from './map'
import _ from 'lodash'

class AddressCriteria extends React.Component {

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
    operator: null,
    value: null,
    data: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleOperator = this._handleOperator.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { operator } = this.state
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-form">
          <div className="maha-criterion-form-header">
            <RadioGroup { ...this._getRadioGroup() } />
          </div>
          <div className="maha-criterion-form-body">
            { _.includes(['$addt','$naddt'], operator) &&
              <Distance { ...this._getDistance() } />
            }
            { _.includes(['$adsh','$nadsh'], operator) &&
              <Map { ...this._getMap() } />
            }
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

  _getDistance() {
    return {
      onChange: this._handleUpdate
    }
  }

  _getMap() {
    return {
      onChange: this._handleUpdate
    }
  }

  _getOperators() {
    return [
      { value: '$adsh', text: 'is inside polygon' },
      { value: '$nadsh', text: 'is not inside polygon' },
      { value: '$addt', text: 'is within distance of' },
      { value: '$naddt', text: 'is not within distance of' },
      { value: '$nnl', text: 'is known' },
      { value: '$nl', text: 'is unknown' }
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
      deselectable: false,
      options,
      onChange: this._handleOperator
    }
  }

  _getText(data) {
    const { operator } = this.state
    if(operator === '$addt') return `is within ${data.text}`
    if(operator === '$naddt') return `is not within ${data.text}`
    if(operator === '$adsh') return 'is inside polygon'
    if(operator === '$nadsh') return 'is not inside polygon'
    if(operator === '$nnl') return 'is known'
    if(operator === '$nl') return 'is unknown'
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange() {
    const { data, operator, value } = this.state
    const { code } = this.props
    if(!value && !_.includes(['$nl','$nnl'], operator)) return
    this.props.onChange({
      code,
      operator,
      value,
      data: {
        ...data,
        text: this._getText(data)
      }
    })
  }

  _handleDone() {
    const { operator, data, value } = this.state
    const { code } = this.props
    this.props.onDone({
      code,
      operator,
      value,
      data: {
        ...data,
        text: this._getText(data)
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

  _handleUpdate(value, data) {
    this.setState({ data, value })
  }

}

export default AddressCriteria
