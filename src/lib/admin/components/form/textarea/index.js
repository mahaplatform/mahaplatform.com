import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class TextArea extends React.Component {

  static propTypes = {
    autogrow: PropTypes.bool,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    tabIndex: PropTypes.number,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    autogrow: true,
    defaultValue: '',
    disabled: false,
    maxLength: null,
    placeholder: '',
    rows: 5,
    tabIndex: 0,
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    value: ''
  }

  input = null
  offset = 0

  _handleChange = this._handleChange.bind(this)
  _handleKeyUp = this._handleKeyUp.bind(this)
  _handleResize = this._handleResize.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { value } = this.state
    const { maxLength } = this.props
    return (
      <div className="maha-textarea">
        { maxLength &&
          <div className={ this._getMaxClass() }>
            { value.length } / { maxLength }
          </div>
        }
        <textarea ref={ node => this.input = node } { ...this._getTextArea() } />
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setValue(_.toString(defaultValue))
    this.offset = this.input.offsetHeight - this.input.clientHeight
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.defaultValue !== prevProps.defaultValue) {
      this.props.onChange(this.state.value )
    }
    if(this.state.value !== prevState.value) {
      this._handleChange()
    }
  }

  _getMaxClass() {
    const { value } = this.state
    const { maxLength } = this.props
    const classes = ['maha-textarea-length']
    if(value.length >= maxLength) classes.push('max')
    return classes.join(' ')
  }

  _getTextArea() {
    const { autogrow, placeholder, disabled, rows, tabIndex } = this.props
    const { value } = this.state
    return {
      disabled,
      placeholder,
      rows: autogrow ? 3 : rows,
      tabIndex,
      value,
      onChange: this._handleUpdate,
      onKeyUp: this._handleKeyUp
    }
  }

  _handleChange() {
    this.props.onChange(this.state.value )
  }

  _handleKeyUp(e) {
    if(!this.props.autogrow) return
    this._handleResize()
  }

  _handleResize() {
    this.input.style.height = 'auto'
    this.input.style.height = this.input.scrollHeight + this.offset + 'px'
  }

  _handleUpdate(e) {
    this.setValue(e.target.value)
  }

  setValue(value) {
    if(this.props.maxLength && value.length > this.props.maxLength) return
    this.setState({ value }, this._handleResize)
  }

}

export default TextArea
