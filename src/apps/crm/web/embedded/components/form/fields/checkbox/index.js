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
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { prompt } = this.props
    return (
      <div className="maha-confirmation" onClick={ this._handleToggle }>
        <div className="maha-confirmation-icon">
          <i className={`fa fa-${this._getIcon()}`} />
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

  _getIcon(option) {
    const { value } = this.state
    return value ? 'check-square' : 'square-o'
  }

  _handleChange() {
    this.props.onChange(this.state.value)
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
