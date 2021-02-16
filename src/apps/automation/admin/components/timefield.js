import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class TimeField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  input = null

  state = {
    value: ''
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-input">
        <div className="maha-input-field">
          <input { ...this._getInput() } />
        </div>
        { value && value.length > 0 &&
          <div className="maha-input-clear" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) {
      this.setState({
        value: this._getParsed(defaultValue)
      })
    }
    this.props.onReady(this._handleValidate)
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getFormatted() {
    const value = this.state.value.trim()
    const parsed = moment(value, ['HH:mm','H:mm','h:mmA','h:mm A','h:m'])
    if(!parsed.isValid()) return value
    return parsed.format('h:mm A')
  }

  _getParsed(value) {
    return moment(`2020-01-01 ${value}`).format('h:mm A')
  }

  _getRaw() {
    const { value } = this.state
    return moment(`2020-01-01 ${value}`, 'YYYY-MM-DD h:mm A').format('HH:mm')
  }

  _getInput() {
    const { placeholder } = this.props
    const { value } = this.state
    return {
      ref: node => this.input = node,
      placeholder,
      value,
      onBlur: this._handleBlur,
      onChange: this._handleUpdate
    }
  }

  _handleBlur(e) {
    const value = this._getFormatted()
    this.setState({ value })
  }

  _handleChange() {
    const raw = this._getRaw()
    this.props.onChange(raw)
  }

  _handleClear() {
    this.setState({
      value: ''
    })
  }

  _handleUpdate(e) {
    const value = e.target.value
    this.setState({ value })
  }

  _handleValidate() {
    const { value } = this.state
    const { required } = this.props
    if(required && (!value || value.length === 0)) {
      return this.props.onValid(null, ['field is required'])
    }
    const parsed = moment(value, ['HH:MM','H:MM','h:mmA','h:mm A','h:m'])
    if(!parsed.isValid()) {
      return this.props.onValid(null, ['invlaid time'])
    }
    const raw = this._getRaw()
    this.props.onValid(raw)
  }

}

export default TimeField
