import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'

class DateField extends React.Component {

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

  control = null

  state = {
    position: 'below',
    show: false,
    value: null
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleClickOutside = this._handleClickOutside.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { placeholder } = this.props
    const { position, show, value } = this.state
    return (
      <div { ...this._getInput() }>
        <div className="maha-datefield-field">
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
        { show &&
          <div className={`maha-datefield-panel ${position}`}>
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

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside)
  }

  _getChooser() {
    const { value } = this.state
    return {
      value,
      onCancel: this._handleCancel,
      onChoose: this._handleChoose
    }
  }

  _getInput() {
    const { tabIndex } = this.props
    return {
      className: 'maha-datefield',
      ref: node => this.control = node,
      // onClick: this._handleBegin,
      onFocus: this._handleBegin,
      tabIndex
    }
  }

  _handleBegin(e) {
    e.stopPropagation()
    const percent = (e.clientY / window.innerHeight) * 100
    const show = true
    const position = percent < 75 ? 'below' : 'above'
    this.setState({ show, position })
  }

  _handleChange() {
    this.props.onChange(this.state.value)
  }

  _handleClickOutside(e) {
    const { show } = this.state
    if(!show || this.control.contains(e.target)) return
    this.setState({
      show: false
    })
  }

  _handleChoose(value) {
    this.setState({
      show: false,
      value
    })
  }

  _handleClear(e) {
    e.stopPropagation()
    this.setState({
      value: null
    })
  }

  _handleValidate() {
    const { required } = this.props
    const { value } = this.state
    if(required && value === null) {
      this.props.onValidate(value, 'You must choose a date')
    } else {
      this.props.onValidate(value)
    }
  }

}

export default DateField
