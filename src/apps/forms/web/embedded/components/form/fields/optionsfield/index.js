import { MoneyField } from '@client'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class OptionsField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.array,
    htmlFor: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.any,
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

  custom = null
  options = {}

  state = {
    custom: null,
    selected: null,
    focused: false
  }

  _handleBlur = this._handleBlur.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleCustom = this._handleCustom.bind(this)
  _handleFocus = this._handleFocus.bind(this)

  _getClass() {
    const { focused } = this.state
    const classes = ['maha-optionsfield']
    if(focused) classes.push('focused')
    return classes.join(' ')
  }

  render() {
    const { options } = this.props
    return (
      <div className={ this._getClass() }>
        <div { ...this._getOptionsField() }>
          { options !== undefined && options.map((option, index) => (
            <div className="maha-checkbox" key={`option_${index}`} onClick={ this._handleChoose.bind(this, index) }>
              <div className="maha-checkbox-icon">
                <i { ...this._getOption(index) } />
              </div>
              <div className="maha-checkbox-label">
                { option.description } { this._getPricing(option) }
              </div>
            </div>
          ))}
        </div>
        { this._showCustom() &&
          <div className="maha-optionsfield-custom">
            <MoneyField { ...this._getMoneyField() } />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, options, onReady } = this.props
    if(defaultValue) {
      const selected = _.findIndex(options, {
        value: defaultValue
      })
      this.setState({ selected })
    }
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state
    const { status } = this.props
    if(selected !== prevState.selected) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _showCustom() {
    const option = this._getSelected()
    return option && option.pricing === 'custom'
  }

  _getIcon(index) {
    const { selected } = this.state
    return index === selected ? 'check-circle' : 'circle-o'
  }

  _getMoneyField() {
    const { custom } = this.state
    return {
      reference: node => this.custom = node,
      onBlur: this._handleBlur,
      onChange: this._handleCustom,
      onFocus: this._handleFocus
    }
  }

  _getOptionsField() {
    const { htmlFor, tabIndex } = this.props
    return {
      id: htmlFor,
      className: 'maha-checkboxes',
      tabIndex,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
      onKeyDown: this._handleKeyDown.bind(this)
    }
  }

  _getOption(index) {
    return {
      className: `fa fa-${this._getIcon(index)}`,
      ref: node => this.options[index] = node
    }
  }

  _getPricing(option) {
    if(option.pricing === 'custom') return null
    return (
      <span className="maha-optionsfield-price">
        ({ option.pricing === 'fixed' ? numeral(option.price).format('$0.00') : 'FREE' })
      </span>
    )
  }

  _getSelected() {
    const { options } = this.props
    const { selected } = this.state
    if(_.isNil(selected)) return null
    return options[selected]
  }

  _getValue() {
    const option = this._getSelected()
    const { custom } = this.state
    if(!option) return null
    return {
      line_items: [{
        code: option.code,
        description: option.description,
        project_id: option.project_id,
        revenue_type_id: option.revenue_type_id,
        is_tax_deductible: option.is_tax_deductible,
        quantity: 1,
        tax_rate: 0.00,
        price: option.pricing === 'fixed' ? option.price : custom,
        total: option.pricing === 'fixed' ? option.price : custom
      }]
    }
  }

  _handleBlur(e) {
    this.setState({
      focused: false
    })
  }

  _handleChange() {
    const value = this._getValue()
    this.props.onChange(value)
  }

  _handleChoose(selected) {
    const { options } = this.props
    this.setState({
      selected
    }, () => {
      if(options[selected].pricing !== 'custom') return
      return this.custom.focus()
    })
  }

  _handleCustom(custom) {
    this.setState({ custom })
  }

  _handleFocus(e) {
    this.setState({
      focused: true
    })
  }

  _handleKeyDown(e) {
    const { selected } = this.state
    const { options } = this.props
    if(e.which === 9) return
    if(e.which === 38) {
      const option = this.options[selected === 0 ? options.length - 1 : selected - 1]
      if(selected !== null) option.click()
      option.focus()
    } else if(e.which === 40) {
      const option = this.options[selected === options.length - 1 ? 0 : selected + 1]
      if(selected !== null) option.click()
      option.focus()
    } else if(_.includes([32,13], e.which)) {
      this._handleChoose(0)
    }
    e.preventDefault()
  }

  _handleValidate() {
    const { required } = this.props
    const { selected } = this.state
    if(required && selected === null) {
      this.props.onValidate(null, 'You must choose a value')
    } else {
      const value = this._getValue()
      this.props.onValidate(value)
    }
  }

}

export default OptionsField
