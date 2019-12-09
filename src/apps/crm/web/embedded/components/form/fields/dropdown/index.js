import PropTypes from 'prop-types'
import React from 'react'

class Dropdown extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onFinalize: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
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
    const { code, options, placeholder } = this.props
    const { value } = this.state
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
    document.addEventListener('mousedown', this._handleClickOutside)
    const { onReady } = this.props
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    const { status } = this.props
    if(value !== prevState.value) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
      if(status === 'finalizing') this._handleFinalize()
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

  _handleBegin(e) {
    e.stopPropagation()
    const percent = (e.clientY / window.innerHeight) * 100
    const show = true
    const position = percent < 75 ? 'below' : 'above'
    this.setState({ show, position })
  }

  _handleChange() {
    const { options } = this.props
    const { value } = this.state
    this.props.onChange(options[value].value)
  }

  _handleChoose(value) {
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

  _handleFinalize() {
    this.props.onFinalize('paymentToken')
  }

  _handleValidate() {
    this.props.onValidate('valid')
  }

}

export default Dropdown
