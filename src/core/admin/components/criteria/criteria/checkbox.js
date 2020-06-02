import RadioGroup from '../../form/select/radio_group'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'

class Checkbox extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    code: PropTypes.string,
    comparisons: PropTypes.array,
    name: PropTypes.string,
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
    const { comparisons } = this.props
    return comparisons || [
      { value: '$ck', text: 'is checked' },
      { value: '$nck', text: 'is not checked' }
    ]
  }

  _getPanel() {
    const { value } = this.state
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
      operator,
      data: operator === '$ck' ? 'is checked' : 'is not checked',
      value: true
    })
  }

  _handleDone() {
    const { operator } = this.state
    const { code } = this.props
    this.props.onDone({
      code,
      operator,
      data: operator === '$ck' ? 'is checked' : 'is not checked',
      value: true
    })
  }

  _handleOperator(operator) {
    this.setState({ operator })
  }

}

export default Checkbox
