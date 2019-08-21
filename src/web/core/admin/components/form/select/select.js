import Token from './token'
import PropTypes from 'prop-types'
import Format from '../../format'
import React from 'react'
import _ from 'lodash'

const Select = (multiple) => {

  class Control extends React.Component {

    static propTypes = {
      defaultValue: PropTypes.any,
      multiple: PropTypes.bool,
      endpoint: PropTypes.string,
      format: PropTypes.any,
      items: PropTypes.array,
      options: PropTypes.array,
      selected: PropTypes.array,
      status: PropTypes.string,
      tabIndex: PropTypes.number,
      text: PropTypes.string,
      value: PropTypes.string,
      onChange: PropTypes.func,
      onChoose: PropTypes.func,
      onReady: PropTypes.func,
      onFetchItems: PropTypes.func,
      onSetSelected: PropTypes.func,
      onSetItems: PropTypes.func
    }

    static defaultProps = {
      format: Token,
      multiple,
      tabIndex: 0,
      value: 'value',
      text: 'text',
      onBusy: () => {},
      onChange: () => {},
      onReady: () => {},
      onSubmit: (selected) => {}
    }

    _handleKeyDown = this._handleKeyDown.bind(this)

    render() {
      const { items, format, tabIndex, text, value } = this.props
      return (
        <div className="maha-select ui field" tabIndex={ tabIndex } onKeyDown={ this._handleKeyDown }>
          { items.map((option, index) => (
            <div key={`option_${index}`} { ...this._getItem(option) }>
              <div className="maha-select-option-icon">
                <i className={`fa fa-fw fa-${this._getItemIcon(option)}`} />
              </div>
              <div className="maha-select-option-label">
                <Format { ...option } format={ format } value={ _.get(option, value) } text={ _.get(option, text) } />
              </div>
            </div>
          )) }
        </div>
      )
    }

    componentDidMount() {
      const { defaultValue, endpoint, options, onFetchItems } = this.props
      if(defaultValue !== undefined) this._handleSetSelected(defaultValue)
      if(endpoint) return onFetchItems(endpoint)
      if(options) this._handleSetOptions(options)
    }

    componentDidUpdate(prevProps) {
      const { multiple, selected, status, onChange, onReady } = this.props
      if(status !== prevProps.status && status === 'success') {
        onReady()
      }
      if(selected !== prevProps.selected) {
        const value = multiple ? selected : selected[0]
        onChange(value)
      }
    }

    _getItem(option) {
      return {
        className: this._getItemClass(option),
        onClick: this._handleClick.bind(this, option)
      }
    }

    _getSelected(option) {
      const { selected } = this.props
      const value = _.get(option, this.props.value)
      return _.includes(selected, value)
    }

    _getItemClass(option) {
      const classes = ['maha-select-option']
      if(this._getSelected(option)) classes.push('selected')
      return classes.join(' ')
    }

    _getItemIcon(option) {
      const { multiple } = this.props
      const selected = this._getSelected(option)
      if(multiple && selected) return 'check-square'
      if(multiple && !selected) return 'square-o'
      if(!multiple && selected) return 'check-circle'
      if(!multiple && !selected) return 'circle-o'
    }

    _handleSetOptions(options) {
      const { onReady, onSetItems } = this.props
      const items = options.map(item => {
        return _.isString(item) ? { value: item, text: item } : item
      })
      onSetItems(items)
      onReady()
    }

    _handleSetSelected(defaultValue) {
      const { onSetSelected } = this.props
      onSetSelected(_.castArray(defaultValue))
    }

    _handleClick(option) {
      const { multiple, onChoose } = this.props
      const value = _.get(option, this.props.value)
      onChoose(multiple, value)
    }

    _handleKeyDown(e) {
      const { multiple, options, selected, onChoose } = this.props
      if(multiple || !_.includes([38,40], e.which)) return
      const mod = (x, n) => (x % n + n) % n
      const increment = e.which === 38 ? -1 : 1
      const index = _.findIndex(options, { value: selected[0] })
      const newindex = mod((index + increment), options.length)
      onChoose(multiple, options[newindex].value)
    }

  }

  return Control

}

export default Select
