import PropTypes from 'prop-types'
import React from 'react'

class BirthdayField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    value: ''
  }

  _handleUpdate = this._handleUpdate.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="crm-birthdayfield">
        <div className="maha-input">
          <div className="maha-input-field">
            <input { ...this._getBirthday() } />
          </div>
          { value && value.length > 0 &&
            <div className="maha-input-clear" onClick={ this._handleClear }>
              <i className="fa fa-times" />
            </div>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.setState({
      value: defaultValue
    })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getBirthday() {
    const { value } = this.state
    return {
      placeholder: 'MM/DD',
      value,
      onChange: this._handleUpdate
    }
  }

  _getFormatted(value) {
    const numbers = value.replace(/[^\d]/g, '')
    const month = numbers.substr(0,2)
    const day = numbers.substr(2,2)
    if(day.length > 0) return `${month}/${day}`
    if(month.length === 2) return `${month}/`
    return month
  }
  
  _handleChange() {
    const { value } = this.state
    this.props.onChange(value)
  }

  _handleClear() {
    this.setState({
      value: ''
    })
  }

  _handleUpdate(e) {
    const value = this._getFormatted(e.target.value)
    this.setState({ value })
  }

}

export default BirthdayField
