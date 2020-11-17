import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Dropdown extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.any,
    htmlFor: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    options: [],
    onChange: () => {},
    onReady: () => {}
  }

  control = null

  state = {
    active: false,
    animating: false,
    direction: null,
    show: false,
    selected: null
  }

  _handleOpen = this._handleOpen.bind(this)
  _handleClickOutside = this._handleClickOutside.bind(this)
  _handleKeyDown = this._handleKeyDown.bind(this)

  render() {
    const { code, options, placeholder } = this.props
    const { selected } = this.state
    return (
      <div { ...this._getDropdown() }>
        <div id={ code } className={ this._getClass() } onClick={ this._handleOpen }>
          <i className="dropdown icon"></i>
          { selected === null ?
            <div className="default text">{ placeholder }</div> :
            <div className="text">{ options[selected].text }</div>
          }
          <div className={ this._getMenuClass() }>
            { options.map((option, index) => (
              <div key={`option_${index}`} { ...this._getOption(index) }>
                { option.text }
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    document.addEventListener('mousedown', this._handleClickOutside)
    if(defaultValue !== undefined) this._handleDefault(defaultValue)
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { show, selected } = this.state
    const { status } = this.props
    if(selected !== prevState.selected) {
      this._handleChange()
    }
    if(show !== prevState.show) {
      this.setState({
        animating: true
      })
      setTimeout(() => this.setState({
        animating: false
      }), 250)
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside)
  }

  _getClass() {
    const { animating, active, direction } = this.state
    const classes = ['ui','fluid','selection','dropdown']
    if(direction === 'up') classes.push('upward')
    if(active) classes.push('active')
    if(active && !animating) classes.push('visible')
    if(!active && animating) classes.push('visible')
    return classes.join(' ')
  }

  _getDropdown() {
    const { tabIndex } = this.props
    return {
      className: 'maha-dropdown',
      ref: node => this.control = node,
      tabIndex,
      onKeyDown: this._handleKeyDown
    }
  }

  _getMenuClass() {
    const { active, animating, direction } = this.state
    const classes = ['menu','transition']
    if(!animating && !active) classes.push('hidden')
    if(animating || active) classes.push('visible')
    if(animating && active) classes.push(`animating slide ${direction} in`)
    if(animating && !active) classes.push(`animating slide ${direction} out`)
    return classes.join(' ')
  }

  _getOption(index) {
    return {
      className: this._getOptionClass(index),
      onClick: this._handleChoose.bind(this, index)
    }
  }

  _getOptionClass(index) {
    const { selected } = this.state
    const classes = ['item']
    if(index === selected) classes.push('active')
    return classes.join(' ')
  }

  _getValue() {
    const { options } = this.props
    const { selected } = this.state
    return !_.isNil(selected) ? options[selected].value : null
  }

  _handleChange() {
    const value = this._getValue()
    this.props.onChange(value)
  }

  _handleChoose(selected) {
    this.setState({
      selected,
      active: false
    })
  }

  _handleClickOutside(e) {
    const { active } = this.state
    if(!active || this.control.contains(e.target)) return
    this.setState({
      active: false
    })
  }

  _handleDefault(value) {
    const { options } = this.props
    const selected = options.findIndex(option => {
      return option.value === value
    })
    this.setState({ selected })
  }

  _handleKeyDown(e) {
    const { direction, selected } = this.state
    const { options } = this.props
    if(e.which === 38 && direction === 'up') {
      this.setState({
        active: true,
        selected: selected !== null ? (selected === 0 ? options.length - 1 : selected - 1) : options.length -1
      })
    } else if(e.which === 38 && direction === 'down') {
      this.setState({
        active: true,
        selected: selected !== null  ? (selected === 0 ? options.length - 1 : selected - 1) : options.length - 1
      })
    } else if(e.which === 40 && direction === 'down') {
      this.setState({
        active: true,
        selected: selected !== null  ? (selected === options.length - 1 ? 0 : selected + 1) : 0
      })
    } else if(e.which === 40 && direction === 'up') {
      this.setState({
        active: true,
        selected: selected !== null  ? (selected === options.length - 1 ? 0 : selected + 1) : 0
      })
    } else if(selected !== null && e.which === 13) {
      this._handleChoose(selected)
    }
    e.preventDefault()
  }

  _handleOpen(e) {
    e.stopPropagation()
    const percent = (e.clientY / window.innerHeight) * 100
    const { active } = this.state
    if(active || e.target.className === 'item') return
    this.setState({
      direction: percent > 75 ? 'up' : 'down',
      active: true
    })
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

export default Dropdown
