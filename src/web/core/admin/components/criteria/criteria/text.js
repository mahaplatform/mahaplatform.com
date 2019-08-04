import RadioGroup from '../../form/select/radio_group'
import TextField from '../../form/textfield'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Button from '../../button'
import React from 'react'
import _ from 'lodash'

class Text extends React.PureComponent {

  static contextTypes = {
    criteria: PropTypes.object
  }

  static propTypes = {
    field: PropTypes.object,
    onDone: PropTypes.func
  }

  static defaultProps = {}

  state = {
    operator: null,
    value: ''
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criterion-form">
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
      </ModalPanel>
    )
  }

  _getButton() {
    const { operator, value } = this.state
    return {
      label: 'Add Criteria',
      color: 'blue',
      disabled: _.includes(['$eq','$lk','$nlk'], operator) && value.length === 0,
      handler: this._handleDone
    }
  }

  _getPanel() {
    const { field } = this.props
    return {
      title: field.label,
      color: 'grey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _getRadioGroup() {
    return {
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
    const { operator } = this.state
    return {
      disabled: _.includes(['$nkn','$kn'], operator),
      onChange: this._handleChange.bind(this, 'value')
    }
  }

  _handleCancel() {
    this.context.criteria.pop()
  }

  _handleDone() {
    const { operator, value } = this.state
    const { field } = this.props
    this.props.onDone({ [field.code]: { [operator]: value } })
    this.context.criteria.pop(1)
  }

  _handleChange(key, value) {
    this.setState({
      [key]: value
    })

  }

}

export default Text
