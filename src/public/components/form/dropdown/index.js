import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Dropdown extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  control = null

  state = {
    position: 'below',
    show: false,
    value: null
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleClickOutside = this._handleClickOutside.bind(this)

  render() {
    const { code, placeholder } = this.props
    const { value } = this.state
    const options = this._getOptions()
    return (
      <div className="maha-dropdown" ref={ node => this.control = node }>
        <div id={ code } className={ this._getClass() } onClick={ this._handleBegin }>
          <i className="dropdown icon"></i>
          { value === null ?
            <div className="default text">{ placeholder }</div> :
            <div className="text">{ options[value].text }</div>
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
    const { defaultValue, onReady } = this.props
    document.addEventListener('mousedown', this._handleClickOutside)
    if(defaultValue) this._handleDefault()
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside)
  }

  _getClass() {
    const { position, show } = this.state
    const classes = ['ui selection dropdown']
    if(position === 'above') classes.push('upward')
    if(show) classes.push('active visible')
    return classes.join(' ')
  }

  _getMenuClass() {
    const { show } = this.state
    const classes = ['menu']
    if(show) classes.push('transition visible')
    return classes.join(' ')
  }

  _getOptions() {
    const { options } = this.props
    return options.map(option => {
      return _.isString(option) ? { value: option, text: option } : option
    })
  }

  _handleBegin(e) {
    e.stopPropagation()
    const percent = (e.clientY / window.innerHeight) * 100
    const show = true
    const position = percent < 75 ? 'below' : 'above'
    this.setState({ show, position })
  }

  _handleChange() {
    const { value } = this.state
    const options = this._getOptions()
    this.props.onChange(options[value].value)
  }

  _handleChoose(value, e) {
    e.stopPropagation()
    this.setState({
      show: false,
      value
    })
  }

  _handleClickOutside(e) {
    const { show } = this.state
    if(!show || this.control.contains(e.target)) return
    this.setState({
      show: false
    })
  }

  _handleDefault() {
    const { defaultValue } = this.props
    const options = this._getOptions()
    const value = options.findIndex(option => {
      return option.value === defaultValue
    })
    this.setState({ value })
  }

}

export default Dropdown
