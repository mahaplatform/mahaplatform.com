import PropTypes from 'prop-types'
import Button from '../../button'
import Format from '../../format'
import Token from './token'
import React from 'react'
import _ from 'lodash'

const Select = (multiple) => {

  class Control extends React.Component {

    static propTypes = {
      defaultValue: PropTypes.any,
      deselectable: PropTypes.bool,
      endpoint: PropTypes.string,
      format: PropTypes.any,
      height: PropTypes.number,
      items: PropTypes.array,
      multiple: PropTypes.bool,
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
      deselectable: true,
      format: Token,
      multiple,
      tabIndex: 0,
      value: 'value',
      text: 'text',
      onBusy: () => {},
      onChange: () => {},
      onReady: () => {}
    }

    _handleDeselectAll = this._handleDeselectAll.bind(this)
    _handleKeyDown = this._handleKeyDown.bind(this)
    _handleSelectAll = this._handleSelectAll.bind(this)

    render() {
      const { deselectable, items, format, tabIndex, text, value } = this.props
      return (
        <div className="maha-select ui field" tabIndex={ tabIndex } onKeyDown={ this._handleKeyDown }>
          { deselectable && items.length > 0 &&
            <div className="maha-select-deselect">
              <Button { ...this._getDeselect() } />
            </div>
          }
          <div className="maha-select-options" style={ this._getStyle() }>
            { items.length === 0 &&
              <div className="maha-select-option-empty">
                There are no options
              </div>
            }
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
        </div>
      )
    }

    componentDidMount() {
      const { defaultValue, endpoint, options } = this.props
      if(defaultValue !== undefined) this._handleSetSelected(defaultValue)
      if(endpoint) return this.props.onFetchItems(endpoint)
      if(options) return this._handleSetOptions(options)
      this.props.onReady()
    }

    componentDidUpdate(prevProps) {
      const { defaultValue, multiple, options, selected, status, onChange, onReady } = this.props
      if(!_.isEqual(defaultValue, prevProps.defaultValue) && !_.isEqual(defaultValue, selected) && defaultValue) {
        this._handleSetSelected(defaultValue)
      }
      if(!_.isEqual(options, prevProps.options)) {
        this._handleSetOptions(options)
      }
      if(status !== prevProps.status && status === 'success') {
        onReady()
      }
      if(selected !== prevProps.selected) {
        const value = multiple ? selected : selected[0]
        onChange(value)
      }
    }

    _getDeselect() {
      const { selected } = this.props
      return {
        label: multiple ? (selected.length > 0 ? 'deselect all' : 'select all') : 'deselect',
        className: (!multiple && selected.length === 0) ? 'link disabled' : 'link',
        handler: (multiple && selected.length === 0) ? this._handleSelectAll : this._handleDeselectAll
      }
    }

    _getItem(option) {
      return {
        className: this._getItemClass(option),
        onClick: this._handleClick.bind(this, option)
      }
    }

    _getItemClass(option) {
      const classes = ['maha-select-option']
      if(this._getSelected(option)) classes.push('selected')
      return classes.join(' ')
    }

    _getItemIcon(option) {
      const { multiple } = this.props
      const selected = this._getSelected(option)
      if(selected) return multiple ? 'check-square' : 'check-circle'
      if(!selected) return multiple ? 'square-o' : 'circle-o'
    }

    _getSelected(option) {
      const { selected } = this.props
      const value = _.get(option, this.props.value)
      return _.includes(selected, value)
    }

    _getStyle() {
      const { height } = this.props
      if(!height) return {}
      return {
        overflowY: 'scroll',
        maxHeight: height
      }
    }

    _handleSetOptions(options) {
      const { onReady, onSetItems } = this.props
      const items = options.map(item => {
        return _.isPlainObject(item) ? item : { value: item, text: item }
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

    _handleDeselectAll() {
      this.props.onSetSelected([])
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

    _handleSelectAll() {
      const { items, value } = this.props
      this.props.onSetSelected(items.map(option => {
        return _.get(option, value)
      }))
    }

  }

  return Control

}

export default Select
