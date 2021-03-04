import PropTypes from 'prop-types'
import Chooser from './chooser'
import moment from 'moment'
import React from 'react'
import Date from './date'

class Datefield extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    prompt: PropTypes.string,
    tabIndex: PropTypes.number,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    defaultValue: null,
    disabled: false,
    placeholder: 'Enter date',
    tabIndex: 0,
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {},
    onSet: () => {}
  }

  state = {
    value: null
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleSet = this._handleSet.bind(this)

  render() {
    const { tabIndex } = this.props
    const { value } = this.state
    return (
      <div className="maha-datefield" tabIndex={ tabIndex }>
        <div className="maha-datefield-handle" onClick={ this._handleBegin }>
          <i className="fa fa-calendar-o" />
        </div>
        <div className="maha-datefield-field" onClick={ this._handleEdit }>
          <div className="maha-datefield-input">
            <Date { ...this._getDate() } />
          </div>
          { value &&
            <div className="maha-datefield-remove" onClick={ this._handleClear }>
              <i className="fa fa-times" />
            </div>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) {
      this.setState({
        value: moment(defaultValue)
      })
    }
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(prevState.value !== value) {
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

  _getDate() {
    const { prompt, placeholder, tabIndex } = this.props
    const { value } = this.state
    return {
      defaultValue: value,
      placeholder: prompt || placeholder,
      tabIndex,
      onChange: this._handleSet
    }
  }

  _handleBegin() {
    this.context.form.push(Chooser, this._getChooser.bind(this))
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChange() {
    const { value } = this.state
    this.props.onChange(value ? value.format('YYYY-MM-DD') : null)
  }

  _handleChoose(value) {
    this.setState({ value })
    this.context.form.pop()
  }

  _handleClear(e) {
    this.setState({ value: null })
    e.stopPropagation()
  }

  _handleSet(value) {
    this.setState({ value })
  }

}

export default Datefield
