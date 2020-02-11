import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class TextArea extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.string,
    htmlFor: PropTypes.string,
    name: PropTypes.string,
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

  state = {
    focused: false,
    value: ''
  }

  input = null
  offset = 0

  _handleBlur = this._handleBlur.bind(this)
  _handleChange = _.debounce(this._handleChange.bind(this), 250, { leading: true })
  _handleFocus = this._handleFocus.bind(this)
  _handleResize = this._handleResize.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <div className="maha-textarea">
        <textarea ref={ node => this.input = node } { ...this._getTextArea() } />
      </div>
    )
  }

  componentDidMount() {
    const { onReady } = this.props
    this.input.style.boxSizing = 'border-box'
    this.offset = this.input.offsetHeight - this.input.clientHeight
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { status } = this.props
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
      this._handleResize()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _getTextArea() {
    const { htmlFor, name, placeholder, tabIndex } = this.props
    const { focused, value } = this.state
    return {
      id: htmlFor,
      name,
      placeholder: !focused ? placeholder : null,
      ref: node => this.input = node,
      rows: 3,
      tabIndex,
      value,
      onBlur: this._handleBlur,
      onChange: this._handleUpdate,
      onFocus: this._handleFocus,
      onKeyUp: this._handleResize
    }
  }

  _handleBlur() {
    this.setState({
      value: this.input.value.trim().replace('\n+$','\n'),
      focused: false
    })
  }

  _handleChange() {
    this.props.onChange(this.state.value)
  }

  _handleFocus() {
    this.setState({
      focused: true
    })
  }

  _handleResize() {
    this.input.style.height = 'auto'
    this.input.style.height = this.input.scrollHeight + this.offset + 'px'
  }

  _handleUpdate(e) {
    if(e.which == 13) return
    this.setState({
      value: e.target.value
    })
  }

  _handleValidate() {
    const { required } = this.props
    const { value } = this.state
    if(required && value.length === 0) {
      this.props.onValidate(value, 'You must enter a value')
    } else {
      this.props.onValidate(value)
    }
  }

}

export default TextArea
