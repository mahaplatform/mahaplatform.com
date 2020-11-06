import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Date extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
  }

  input = null

  state = {
    value: ''
  }

  _handleChange = this._handleChange.bind(this)
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
    const { defaultValue } = this.props
    if(defaultValue !== prevProps.defaultValue) {
      this._handleSet(defaultValue)
    }
  }

  _getDate() {
    const { placeholder } = this.props
    const { value } = this.state
    return {
      ref: node => this.input = node,
      type: 'text',
      placeholder,
      value,
      onBlur: this._handleChange,
      onKeyDown: this._handleKeyDown,
      onChange: this._handleUpdate
    }
  }

  _handleChange() {
    const value = moment(this.state.value, ['MM-DD-YYYY','MM-DD-YY','YYYY-MM-DD','MM/DD/YY','MM/DD/YYYY','MMDDYY','MMDDYYYY'], true)
    if(!value.isValid()) return this.setState({ value: '' })
    this.setState({ value: value.format('MM/DD/YYYY') })
    this.props.onChange(value)
  }

  _handleKeyDown(e) {
    if(e.which === 13) this.input.blur()
  }

  _handleSet(value) {
    this.setState({
      value: value ? moment(value).format('MM/DD/YYYY') : ''
    })
  }

  _handleUpdate(e) {
    const value = e.target.value
    if(!value.match(/^[\d-/]*$/)) return
    this.setState({ value })
  }

}

export default Date
