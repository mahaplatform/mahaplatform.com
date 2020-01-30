import PropTypes from 'prop-types'
import React from 'react'

class RadioGroup extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.array,
    htmlFor: PropTypes.string,
    name: PropTypes.object,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  options = {}

  state = {
    selected: null
  }

  _handleChange = this._handleChange.bind(this)

  render() {
    const { options } = this.props
    return (
      <div className="maha-checkboxes">
        { options.map((option, index) => (
          <div className="maha-checkbox" key={`option_${index}`} onClick={ this._handleChoose.bind(this, index) }>
            <div className="maha-checkbox-icon">
              <i { ...this._getOption(option, index) } />
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
    onReady()
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

  _getOption(option, index) {
    const { tabIndex } = this.props
    return {
      className: `fa fa-${this._getIcon(option)}`,
      ref: node => this.options[index] = node,
      tabIndex,
      onKeyDown: this._handleKeyDown.bind(this, index)
    }
  }

  _handleChange() {
    this.props.onChange(this.state.selected)
  }

  _handleChoose(index) {
    const { options } = this.props
    const option = options[index]
    this.setState({
      selected: option.value
    })
  }

  _handleKeyDown(index, e) {
    const { selected } = this.state
    const { options } = this.props
    if(e.which === 38) {
      const option = this.options[index === 0 ? options.length - 1 : index - 1]
      if(selected !== null) option.click()
      option.focus()
    }
    if(e.which === 40) {
      const option = this.options[index === options.length - 1 ? 0 : index + 1]
      if(selected !== null) option.click()
      option.focus()
    }
    if(e.which === 32) this._handleChoose(index)
  }

  _handleValidate() {
    const { required } = this.props
    const { selected } = this.state
    if(required && selected === null) {
      this.props.onValidate(selected, 'You must choose a value')
    } else {
      this.props.onValidate(selected)
    }
  }

}

export default RadioGroup
