import ValueToken from './value_token'
import PropTypes from 'prop-types'
import Search from './search'
import Form from '../../form'
import React from 'react'
import _ from 'lodash'

class Lookup extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    adding: PropTypes.bool,
    chosen: PropTypes.object,
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    endpoint: PropTypes.string,
    filter: PropTypes.object,
    format: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    form: PropTypes.object,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    prompt: PropTypes.string,
    query: PropTypes.string,
    results: PropTypes.array,
    search: PropTypes.bool,
    selected: PropTypes.number,
    sort: PropTypes.string,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    text: PropTypes.string,
    value: PropTypes.string,
    onBegin: PropTypes.func,
    onBusy: PropTypes.func,
    onClear: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onHideForm: PropTypes.func,
    onType: PropTypes.func,
    onLoad: PropTypes.func,
    onLoookup: PropTypes.func,
    onReady: PropTypes.func,
    onShowForm: PropTypes.func
  }

  static defaultProps = {
    defaultValue: null,
    disabled: false,
    filter: {},
    format: ValueToken,
    options: [],
    prompt: 'Choose an item',
    search: true,
    tabIndex: 0,
    text: 'text',
    value: 'value',
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {}
  }

  input = null

  _handleBegin = this._handleBegin.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { chosen, prompt, placeholder, tabIndex, text } = this.props
    return (
      <div ref={ node => this.input = node } className={ this._getClass() } tabIndex={ tabIndex }>
        <div className="maha-lookup-field" onClick={ this._handleBegin }>
          { chosen &&
            <div className="maha-lookup-token">
              { _.get(chosen, text) }
            </div>
          }
          { !chosen &&
            <div className="maha-lookup-field-prompt">
              { placeholder || prompt }
            </div>
          }
        </div>
        { chosen &&
          <div className="maha-lookup-field-clear">
            <i className="fa fa-times" onClick={ this._handleClear } />
          </div>
        }
      </div>
    )
  }

  _getClass() {
    const { disabled } = this.props
    const classes = ['maha-input','maha-lookup']
    if(disabled) classes.push('disabled')
    return classes.join(' ')
  }

  componentDidMount() {
    const { defaultValue, endpoint, value, onChoose, onLoad, onReady } = this.props
    const options = this._getOptions()
    if(!defaultValue) return onReady()
    if(endpoint) return onLoad({ $filter: { id: { $in: [ defaultValue ] } } }, endpoint)
    const chosen = _.find(options, { [value]: defaultValue })
    onChoose(chosen)
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { form } = this.context
    const { active, adding, disabled, status, onClear, onReady } = this.props
    if(prevProps.status !== status && status === 'success') onReady()
    if(prevProps.disabled !== disabled) onClear()
    if(!prevProps.active && active) form.push(Search, this._getSearch.bind(this))
    if(!prevProps.adding && adding) form.push(Form, this._getForm.bind(this))
  }

  _getForm() {
    return {
      ...this.props.form,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess
    }
  }

  _getOptions() {
    const { options } = this.props
    return options.map(option => {
      return (_.isString(option)) ? { value: option, text: option } : option
    })
  }

  _getSearch() {
    return {
      ...this.props,
      options: this._getOptions()
    }
  }

  _handleBegin() {
    const { disabled } = this.props
    if(disabled) return this.input.blur()
    this.props.onBegin()
  }

  _handleCancel() {
    this.props.onHideForm()
    this.context.form.pop()
  }

  _handleClear() {
    this.props.onClear()
    this.props.onChange()
  }

  _handleSuccess(chosen) {
    const { value } = this.props
    this.props.onChoose(chosen)
    this.props.onHideForm()
    this.props.onChange(_.get(chosen, value))
    this.context.form.pop(2)
  }

}

export default Lookup
