import RadioGroup from '../../form/select/radio_group'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'

class Boolean extends React.Component {

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
    operator: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleOperator = this._handleOperator.bind(this)

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
    const { operator } = this.state
    if(operator !== prevState.operator) {
      this._handleChange()
    }
  }

  _getOperators() {
    const { field } = this.props
    return field.comparisons || [
      { value: '$tr', text: 'is true' },
      { value: '$ntr', text: 'is false' }
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
    const { operator } = this.state
    const { code } = this.props
    this.props.onChange({
      code,
      operator
    })
  }

  _handleDone() {
    const { operator } = this.state
    const { code } = this.props
    this.props.onDone({
      code,
      operator
    })
  }

  _handleOperator(operator) {
    this.setState({ operator })
  }

}

export default Boolean
