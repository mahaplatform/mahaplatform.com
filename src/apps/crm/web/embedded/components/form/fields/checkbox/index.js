import PropTypes from 'prop-types'
import React from 'react'

class Checkbox extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.bool,
    htmlFor: PropTypes.string,
    name: PropTypes.object,
    prompt: PropTypes.string,
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

  state = {
    value: false
  }

  _handleChange = this._handleChange.bind(this)
  _handleKeyDown = this._handleKeyDown.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { prompt } = this.props
    return (
      <div className="maha-confirmation" onClick={ this._handleToggle }>
        <div className="maha-confirmation-icon">
          <i { ...this._getOption() } />
        </div>
        { prompt &&
          <div className="maha-confirmation-label" dangerouslySetInnerHTML={{ __html: prompt }} />
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setState({
      value: defaultValue
    })
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
    }
  }

  _getIcon() {
    const { value } = this.state
    return value ? 'check-square' : 'square-o'
  }

  _getOption() {
    const { tabIndex } = this.props
    return {
      className: `fa fa-${this._getIcon()}`,
      tabIndex,
      onKeyDown: this._handleKeyDown
    }
  }

  _handleChange() {
    this.props.onChange(this.state.value)
  }

  _handleKeyDown(e) {
    if(e.which === 32) this._handleToggle(e)
  }

  _handleToggle(e) {
    if(e.target.tagName === 'A') return
    const { value } = this.state
    this.setState({
      value: !value
    })
  }

  _handleValidate() {
    const { required } = this.props
    const { value } = this.state
    if(required && !value) {
      this.props.onValidate(null, 'This field is required')
    } else {
      this.props.onValidate(value)
    }
  }

}

export default Checkbox
