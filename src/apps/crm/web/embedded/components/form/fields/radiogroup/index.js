import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

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
    selected: null,
    focused: false
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleFocus = this._handleFocus.bind(this)

  render() {
    const { options } = this.props
    return (
      <div { ...this._getInput() }>
        { options.map((option, index) => (
          <div className="maha-checkbox" key={`option_${index}`} onClick={ this._handleChoose.bind(this, index) }>
            <div className="maha-checkbox-icon">
              <i { ...this._getOption(index) } />
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
    const { defaultValue, options, onReady } = this.props
    if(defaultValue) {
      const selected = _.findIndex(options, {
        value: defaultValue
      })
      this.setState({ selected })
    }
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

  _getIcon(index) {
    const { selected } = this.state
    return index === selected ? 'check-circle' : 'circle-o'
  }

  _getInput() {
    const { htmlFor, tabIndex } = this.props
    return {
      id: htmlFor,
      className: 'maha-checkboxes',
      tabIndex,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
      onKeyDown: this._handleKeyDown.bind(this)
    }
  }

  _getOption(index) {
    return {
      className: `fa fa-${this._getIcon(index)}`,
      ref: node => this.options[index] = node
    }
  }

  _getValue() {
    const { options } = this.props
    const { selected } = this.state
    return !_.isNil(selected) ? options[selected].value : null
  }

  _handleBlur(e) {
    this.setState({
      focused: false
    })
  }

  _handleFocus(e) {
    this.setState({
      focused: true
    })
  }

  _handleChange() {
    const value = this._getValue()
    this.props.onChange(value)
  }

  _handleChoose(selected) {
    this.setState({ selected })
  }

  _handleKeyDown(e) {
    const { selected } = this.state
    const { options } = this.props
    if(e.which === 9) return
    if(e.which === 38) {
      const option = this.options[selected === 0 ? options.length - 1 : selected - 1]
      if(selected !== null) option.click()
      option.focus()
    } else if(e.which === 40) {
      const option = this.options[selected === options.length - 1 ? 0 : selected + 1]
      if(selected !== null) option.click()
      option.focus()
    } else if(_.includes([32,13], e.which)) {
      this._handleChoose(0)
    }
    e.preventDefault()
  }

  _handleValidate() {
    const { required } = this.props
    const { selected } = this.state
    if(required && selected === null) {
      this.props.onValidate(null, 'You must choose a value')
    } else {
      const value = this._getValue()
      this.props.onValidate(value)
    }
  }

}

export default RadioGroup
