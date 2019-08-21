import PropTypes from 'prop-types'
import React from 'react'

class EmailField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  email = null

  state = {
    value: ''
  }

  _handleChange = this._handleChange.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-input">
        <div className="maha-input-field">
          <input { ...this._getInput() }/>
        </div>
        { value && value.length > 0 &&
          <div className="maha-input-clear" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setState({ value: defaultValue })
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.value !== prevState.value) {
      this.props.onChange(this.state.value)
    }
  }

  _getInput() {
    const { tabIndex } = this.props
    const { value } = this.state
    return {
      className: 'ui input',
      type: 'email',
      placeholder: 'Email',
      tabIndex,
      value,
      ref: node => this.email = node,
      onChange: this._handleChange
    }
  }

  _handleChange() {
    this.setState({
      value: this.email.value
    })
  }

  _handleClear() {
    this.setState({
      value: ''
    })
  }

}

export default EmailField
