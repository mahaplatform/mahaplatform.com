import RadioGroup from '../../form/select/radio_group'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Activity extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    code: PropTypes.string,
    comparisons: PropTypes.array,
    field: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    value: null,
    data: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-form">
          <div className="maha-criterion-form-header">
            <RadioGroup { ...this._getRadioGroup() } />
          </div>
          <div className="maha-criterion-form-body" />
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleSet(defaultValue)
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(!_.isEqual(value, prevState.value)) {
      this._handleChange()
    }
  }

  _getActivities() {
    return [
      { text: 'was opened', value: 'was_opened' },
      { text: 'was clicked', value: 'was_clicked' },
      { text: 'was shared', value: 'was_shared' },
      { text: 'was viewed online', value: 'was_viewed_online' },
      { text: 'was unsubscribed', value: 'was_unsubscribed' }
    ]
  }

  _getPanel() {
    const { value } = this.state
    const { field } = this.props
    return {
      title: field.name,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      color: 'grey',
      buttons: [{
        label: 'Add Criteria',
        color: 'blue',
        disabled: value === null,
        handler: this._handleDone
      }]
    }
  }

  _getRadioGroup() {
    const options = this._getActivities()
    const { operator } = this.state
    return {
      defaultValue: operator || options[0].value,
      options,
      onChange: this._handleUpdate
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange() {
    const { data, value } = this.state
    const { code } = this.props
    if(!value) return
    this.props.onChange({
      code,
      operator: '$ct',
      value,
      data
    })
  }

  _handleDone() {
    const { data, value } = this.state
    const { code } = this.props
    this.props.onDone({
      code,
      operator: '$ct',
      value,
      data
    })
  }

  _handleSet(defaultValue) {
    const operator = Object.keys(defaultValue)[0]
    const value = defaultValue[operator]
    this.setState({ value })
  }

  _handleUpdate(value) {
    this.setState({ value })
  }

}

export default Activity
