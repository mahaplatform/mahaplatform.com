import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const SPECIAL_KEYS = ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Backspace']

const REGEX = /^-?[0-9]*\.?[0-9]*$/

class NumberField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.number,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Enter a number'
  }

  number = null

  state = {
    value: ''
  }

  _handleChange = this._handleChange.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleKeyDown = this._handleKeyDown.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-input">
        <div className="maha-input-field">
          <input { ...this._getInput() }/>
        </div>
        { value.length > 0 &&
          <div className="maha-input-clear" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setState({ value: defaultValue })
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.value !== prevState.value) {
      this.props.onChange(Number(this.state.value))
    }
  }

  _getInput() {
    const { placeholder, tabIndex } = this.props
    const { value } = this.state
    return {
      tabIndex,
      className: 'ui input',
      type: 'text',
      placeholder,
      value,
      ref: node => this.number = node,
      onChange: this._handleChange,
      onKeyDown: this._handleKeyDown
    }
  }

  _handleChange() {
    this.setState({
      value: this.number.value
    })
  }

  _handleClear() {
    this.setState({
      value: ''
    })
  }

  _handleKeyDown(e) {
    if(_.includes(SPECIAL_KEYS, e.key)) return
    if(e.ctrlKey || e.metaKey) return
    const value = this.number.value || ''
    const newvalue = value + e.key
    if(newvalue.match(REGEX)) return
    e.preventDefault()
  }

}

export default NumberField
