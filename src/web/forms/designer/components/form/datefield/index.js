import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'

class DateField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  control = null

  state = {
    active: false,
    value: null
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleClickOutside = this._handleClickOutside.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { placeholder } = this.props
    const { active, value } = this.state
    return (
      <div className="maha-datefield" ref={ node => this.control = node }>
        <div className="maha-datefield-field" onClick={ this._handleBegin }>
          <div className="maha-input">
            { value ?
              <div className="maha-input-token">
                { value }
              </div> :
              <div className="maha-input-placeholder">
                { placeholder }
              </div>
            }
            { value && value.length > 0 &&
              <div className="maha-input-clear" onClick={ this._handleClear }>
                <i className="fa fa-times" />
              </div>
            }
          </div>
        </div>
        <div className="maha-datefield-icon" onClick={ this._handleBegin }>
          <i className="fa fa-calendar" />
        </div>
        { active &&
          <div className="maha-datefield-panel">
            <Chooser { ...this._getChooser() } />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    document.addEventListener('mousedown', this._handleClickOutside)
    const { onReady } = this.props
    onReady()
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside)
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getChooser() {
    const { value } = this.state
    return {
      value,
      onCancel: this._handleCancel,
      onChoose: this._handleChoose
    }
  }

  _handleBegin() {
    this.setState({
      active: true
    })
  }

  _handleChange() {
    this.props.onChange(this.state.value)
  }

  _handleClickOutside(e) {
    if(this.control.contains(e.target)) return
    this.setState({
      active: false
    })
  }

  _handleChoose(value) {
    this.setState({
      active: false,
      value
    })
  }

  _handleClear(e) {
    e.stopPropagation()
    this.setState({
      value: null
    })
  }

}

export default DateField
