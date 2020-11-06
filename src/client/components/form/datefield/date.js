import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Date extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    format: PropTypes.string,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.number,
    value: PropTypes.object,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func
  }

  input = null

  state = {
    value: ''
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleFocus = this._handleFocus.bind(this)
  _handleKeyDown = this._handleKeyDown.bind(this)
  _handleUpdate =this._handleUpdate.bind(this)

  render() {
    return <input { ...this._getDate() } />
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleSet(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if(value !== prevProps.value) {
      this._handleSet(value)
    }
  }

  _getDate() {
    const { placeholder, tabIndex } = this.props
    const { value } = this.state
    return {
      ref: node => this.input = node,
      type: 'text',
      placeholder,
      tabIndex,
      value,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
      onKeyDown: this._handleKeyDown,
      onChange: this._handleUpdate
    }
  }

  _handleBlur() {
    this.props.onBlur()
    const { format } = this.props
    if(this.state.value.length === 0) return
    const raw = moment(this.state.value, ['MM-DD-YYYY','MM-DD-YY','YYYY-MM-DD','MM/DD/YY','MM/DD/YYYY','MMDDYY','MMDDYYYY'], true)
    if(!raw.isValid()) return this.setState({ value: '' })
    const value = raw.format(format)
    const prev = moment(this.props.value).format(format)
    this.setState({ value })
    if(value === prev) return
    this.props.onChange(raw)
  }

  _handleFocus() {
    this.props.onFocus()
  }

  _handleKeyDown(e) {
    if(e.which === 13) this.input.blur()
  }

  _handleSet(value) {
    const { format } = this.props
    this.setState({
      value: value ? moment(value).format(format) : ''
    })
  }

  _handleUpdate(e) {
    const value = e.target.value
    if(!value.match(/^[\d-/]*$/)) return
    this.setState({ value })
  }

}

export default Date
