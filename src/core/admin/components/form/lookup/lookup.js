import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'
import _ from 'lodash'

class Lookup extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    chosen: PropTypes.object,
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    endpoint: PropTypes.string,
    filter: PropTypes.object,
    format: PropTypes.any,
    form: PropTypes.object,
    label: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    prompt: PropTypes.string,
    results: PropTypes.array,
    search: PropTypes.bool,
    selected: PropTypes.number,
    sort: PropTypes.string,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    text: PropTypes.string,
    value: PropTypes.string,
    onBusy: PropTypes.func,
    onClear: PropTypes.func,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onLoad: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    defaultValue: null,
    disabled: false,
    filter: {},
    label: 'item',
    options: [],
    prompt: 'Choose an item',
    search: true,
    tabIndex: 0,
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {}
  }

  input = null

  _handleBegin = this._handleBegin.bind(this)
  _handleClear = this._handleClear.bind(this)

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

  componentDidMount() {
    const { defaultValue, endpoint, onReady } = this.props
    if(!defaultValue) return onReady()
    if(endpoint) return this._handleLoad()
    this._handleSet()
  }

  componentDidUpdate(prevProps) {
    const { chosen, disabled, status, onReady } = this.props
    if(prevProps.status !== status && status === 'success') {
      onReady()
    }
    if(prevProps.disabled !== disabled) {
      this._handleClear()
    }
    if(!_.isEqual(chosen, prevProps.chosen)) {
      this._handleChange()
    }
  }

  _getChooser() {
    const { chosen, endpoint, filter, form, format, label, options, prompt, search, text, value, onChoose } = this.props
    return {
      chosen,
      endpoint,
      filter,
      form,
      format,
      label,
      options,
      prompt,
      search,
      text,
      value,
      onChoose
    }
  }

  _getClass() {
    const { disabled } = this.props
    const classes = ['maha-input','maha-lookup']
    if(disabled) classes.push('disabled')
    return classes.join(' ')
  }

  _handleBegin() {
    const { form } = this.context
    const { disabled } = this.props
    if(disabled) return this.input.blur()
    form.push(Chooser, this._getChooser.bind(this))
  }

  _handleChange() {
    const { chosen, value, onChange } = this.props
    const item = value ? _.get(chosen, value) : chosen
    onChange(item)
  }

  _handleClear() {
    this.props.onClear()
  }

  _handleLoad() {
    const { defaultValue, endpoint, onLoad } = this.props
    return onLoad(endpoint, {
      id: {
        $in: [ defaultValue ]
      }
    })
  }

  _handleSet() {
    const { defaultValue, options, value, onChoose, onReady } = this.props
    const chosen = _.find(options, { [value]: defaultValue })
    onChoose(chosen)
    onReady()
  }

}

export default Lookup
