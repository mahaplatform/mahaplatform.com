import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Dropdown extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.string,
    htmlFor: PropTypes.string,
    name: PropTypes.object,
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
    onChange: () => {},
    onReady: () => {}
  }

  control = null

  state = {
    animating: false,
    direction: null,
    show: false,
    selected: null
  }

  _handleOpen = this._handleOpen.bind(this)
  _handleClose = this._handleClose.bind(this)

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
              <div className="item" key={`option_${index}`} onClick={ this._handleChoose.bind(this, index) }>
                { option.text }
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    document.addEventListener('mousedown', this._handleClose)
    const { onReady } = this.props
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
    document.removeEventListener('mousedown', this._handleClose)
  }

  _getClass() {
    const { animating, active, direction } = this.state
    const classes = ['ui','fluid','selection','dropdown']
    if(direction) classes.push(direction)
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
      tabIndex
    }
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

  _getValue() {
    const { options } = this.props
    const { selected } = this.state
    return selected ? options[selected].value : null
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

  _handleClose(e) {
    const { active } = this.state
    const reserved = ['item','text','dropdown icon','ui selection dropdown active visible']
    if(!active || _.includes(reserved, e.target.className)) return
    this.setState({
      active: false
    })
  }

  _handleOpen(e) {
    e.stopPropagation()
    const percent = (e.clientY / window.innerHeight) * 100
    const { active } = this.state
    if(active || e.target.className === 'item') return
    this.setState({
      direction: percent > 75 ? 'upward' : null,
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
