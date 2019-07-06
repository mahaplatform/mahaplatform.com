import ValueToken from './value_token'
import PropTypes from 'prop-types'
import Format from '../../format'
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
    disabled: PropTypes.bool,
    defaultValue: PropTypes.any,
    endpoint: PropTypes.string,
    format: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    form: PropTypes.object,
    options: PropTypes.array,
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
    format: ValueToken,
    search: true,
    tabIndex: 0,
    text: 'text',
    value: 'value',
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {}
  }

  render() {
    const { chosen, format, prompt, tabIndex, text } = this.props
    const value = chosen ? _.get(chosen, text) : ''
    return (
      <div className="maha-lookup-field" tabIndex={ tabIndex }>
        { chosen &&
          <div className="maha-lookup-token" onClick={ this._handleBegin.bind(this) }>
            <Format { ...chosen } format={ format } value={ value } />
          </div>
        }
        { chosen &&
          <div className="maha-lookup-field-clear">
            <i className="icon circle remove" onClick={ this._handleClear.bind(this) } />
          </div>
        }
        { !chosen &&
          <div className="maha-lookup-field-prompt" onClick={ this._handleBegin.bind(this) }>
            { prompt }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, endpoint, onChoose, onLoad, onReady } = this.props
    const options = this._getOptions()
    if(!defaultValue) return onReady()
    if(endpoint) return onLoad({ $filter: { id: { $in: [ defaultValue ] } } }, endpoint)
    const chosen = _.find(options, { value: defaultValue })
    onChoose(chosen)
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { form } = this.context
    const { active, adding, disabled, status, onClear, onReady } = this.props
    if(prevProps.status !== status && status === 'success') onReady()
    if(prevProps.disabled !== disabled) onClear()
    if(!prevProps.active && active) form.push(<Search { ...this._getSearch() } />)
    if(!prevProps.adding && adding) form.push(<Form { ...this._getForm() } />)
  }

  _getOptions() {
    const { options } = this.props
    return options.map(option => {
      return (_.isString(option)) ? { value: option, text: option } : options
    })
  }

  _getSearch() {
    return {
      ...this.props,
      options: this._getOptions()
    }
  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleClear() {
    const { onClear, onChange } = this.props
    onClear()
    onChange()
  }

  _getForm() {
    const { form } = this.context
    const { value, onChoose, onChange, onHideForm } = this.props
    return {
      ...this.props.form,
      onCancel: () => {
        onHideForm()
        form.pop()
      },
      onSuccess: (chosen) => {
        onChoose(chosen)
        onHideForm()
        onChange(_.get(chosen, value))
        form.pop(2)
      }
    }
  }

}

export default Lookup
