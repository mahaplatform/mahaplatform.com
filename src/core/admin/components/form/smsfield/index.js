import PropTypes from 'prop-types'
import { segmenter, util } from './utils'
import React from 'react'

class SMSField extends React.Component {

  static propTypes = {
    autogrow: PropTypes.bool,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
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
    placeholder: '',
    rows: 5,
    tabIndex: 0,
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    remaining: 160,
    segments: 1,
    value: ''
  }

  input = null
  offset = 0

  _handleChange = this._handleChange.bind(this)
  _handleKeyUp = this._handleKeyUp.bind(this)
  _handleResize = this._handleResize.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { remaining, segments } = this.state
    return (
      <div className="maha-smsfield">
        <div className="maha-smsfield-segments">
          { remaining } / { segments }
        </div>
        <textarea ref={ node => this.input = node } { ...this._getTextArea() } />
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setValue(defaultValue)
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
    const chars = util.unicodeCharacters(value)
    const encoding = util.pickencoding(value)
    const segments = segmenter[encoding](chars)
    const dataheader = segments.length > 1 ? (encoding === 'gsm' ? 7 : 3) : 0
    const charsPerSegment = encoding === 'gsm' ? 160 - dataheader : 70 - dataheader
    this.setState({
      remaining: charsPerSegment - (value.length % charsPerSegment),
      segments: Math.ceil((value.length + 1) / charsPerSegment),
      value
    }, this._handleResize)
  }

}

export default SMSField
