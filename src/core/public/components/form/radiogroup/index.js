import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class RadioGroup extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  state = {
    selected: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const options = this._getOptions()
    return (
      <div className="maha-checkboxes">
        { options.map((option, index) => (
          <div className="maha-checkbox" key={`option_${index}`} onClick={ this._handleChoose.bind(this, option) }>
            <div className="maha-checkbox-icon">
              <i className={`fa fa-fw fa-${this._getIcon(option)}`} />
            </div>
            <div className="maha-checkbox-label">
              { option.text }
            </div>
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setState({
      selected: defaultValue
    })
    onReady(this._handleValidate)
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state
    const { status } = this.props
    if(selected !== prevState.selected) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _getIcon(option) {
    const { selected } = this.state
    return option.value === selected ? 'check-circle' : 'circle-o'
  }

  _getOptions() {
    const { options } = this.props
    return options.map(option => {
      return _.isString(option) ? { value: option, text: option } : option
    })
  }

  _handleChange() {
    this.props.onChange(this.state.selected)
  }

  _handleChoose(option) {
    this.setState({
      selected: option.value
    })
  }

  _handleValidate() {
    const { required } = this.props
    const { selected } = this.state
    if(required && selected === null) {
      this.props.onValid('invalid', 'You must choose a value')
    } else {
      this.props.onValid('valid')
    }
  }

}

export default RadioGroup
