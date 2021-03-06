import Token from '../../../tokens/token'
import PropTypes from 'prop-types'
import Format from '../../format'
import React from 'react'
import _ from 'lodash'

class Dropdown extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.any,
    format: PropTypes.any,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.string,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Select an option...',
    format: Token,
    text: 'text',
    value: 'value',
    options: [],
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {}
  }

  control = null

  state = {
    animating: false,
    active: false,
    direction: null,
    value: null
  }

  _handleClickOutside = this._handleClickOutside.bind(this)
  _handleOpen = this._handleOpen.bind(this)

  render() {
    const { format, text } = this.props
    const options = this._getOptions()
    return (
      <div className="maha-dropdown" ref={ node => this.control = node }>
        <div className={ this._getDropdownClass() } onClick={ this._handleOpen }>
          <div className="text" onClick={ this._handleOpen }>
            { this._getLabel() }
          </div>
          <i className="dropdown icon" />
          <div className={ this._getMenuClass() }>
            { options.map((option, index) => (
              <div key={`option_${index}`} className="item" onClick={ this._handleChoose.bind(this, option) }>
                <Format { ...option } format={ format } value={ _.get(option, text) } />
              </div>
            )) }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    document.addEventListener('mousedown', this._handleClickOutside)
    if(!_.isNil(defaultValue)) this._handleSetDefault()
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { active, value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
    if(active !== prevState.active) {
      this.setState({
        animating: true
      })
      setTimeout(() => this.setState({
        animating: false
      }), 250)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside)
  }

  _getDropdownClass() {
    const { animating, active, direction } = this.state
    const classes = ['ui','fluid','selection','dropdown']
    if(direction) classes.push(direction)
    if(active) classes.push('active')
    if(active && !animating) classes.push('visible')
    if(!active && animating) classes.push('visible')
    return classes.join(' ')
  }

  _getMenuClass() {
    const { active, animating } = this.state
    const classes = ['menu','transition']
    const direction = this.state.direction === 'upward' ? 'up' : 'down'
    if(!animating && !active) classes.push('hidden')
    if(animating || active) classes.push('visible')
    if(animating && active) classes.push(`animating slide ${direction} in`)
    if(animating && !active) classes.push(`animating slide ${direction} out`)
    return classes.join(' ')
  }

  _getLabel() {
    const { placeholder, value, text } = this.props
    const options = this._getOptions()
    const option = this.state.value ? options.find(option => {
      if(!value) return _.isEqual(option, this.state.value)
      return _.get(option, value) === _.get(this.state.value, value)
    }) : null
    return option ? _.get(option, text) : placeholder
  }

  _getOptions() {
    return this.props.options.map(option => {
      return _.isString(option) ? { value: option, text: option } : option
    })
  }

  _getScrollContainer(node) {
    const parent = node.parentNode
    return _.includes(['maha-form-sections', 'maha-modal-panel-body'], parent.className) ? parent : this._getScrollContainer(parent)
  }

  _handleChoose(value) {
    this.setValue(value)
  }

  _handleChange() {
    const value = this.props.value ? _.get(this.state.value, this.props.value) : this.state.value
    this.props.onChange(value)
  }

  _handleClickOutside(e) {
    const { active } = this.state
    if(!active || this.control.contains(e.target)) return
    this.setState({
      active: false
    })
  }

  _handleOpen(e) {
    const container = this._getScrollContainer(this.control)
    const percent = (e.clientY / container.offsetHeight) * 100
    const { active } = this.state
    if(active || e.target.className === 'item') return
    this.setState({
      direction: percent > 75 ? 'upward' : null,
      active: true
    })
  }

  _handleSetDefault() {
    const { defaultValue, value } = this.props
    const options = this._getOptions()
    const option = options.find(option => {
      return _.get(option, value) === defaultValue
    })
    this.setValue(option)
  }

  setValue(value) {
    this.setState({
      value,
      active: false
    })
  }

}

export default Dropdown
