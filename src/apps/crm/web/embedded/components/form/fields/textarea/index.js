import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class TextArea extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.string,
    htmlFor: PropTypes.string,
    name: PropTypes.object,
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
    value: ''
  }

  input = null
  offset = 0

  _handleChange = _.debounce(this._handleChange.bind(this), 250, { leading: true })
  _handleKeyUp = this._handleKeyUp.bind(this)
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
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _getTextArea() {
    const { htmlFor, name, placeholder, tabIndex } = this.props
    return {
      id: htmlFor,
      name,
      placeholder,
      rows: 3,
      tabIndex,
      onChange: this._handleUpdate,
      onKeyUp: this._handleKeyUp
    }
  }

  _handleChange() {
    this.props.onChange(this.state.value)
  }

  _handleKeyUp(e) {
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
