import PropTypes from 'prop-types'
import React from 'react'

class SenderField extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

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

  input = null

  state = {
    value: ''
  }

  _handleClear = this._handleClear.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="crm-tokenfield">
        <div className="crm-tokenfield-field">
          <div className="maha-input" onClick={ this._handleLookup }>
            <div className="maha-input-field">
              <input { ...this._getInput() } />
            </div>
            { value.length > 0 &&
              <div className="maha-input-clear" onClick={ this._handleClear}>
                <i className="fa fa-times" />
              </div>
            }
          </div>
        </div>
        <div className="crm-tokenfield-token">
          <span className="crm-tokenfield-token-text">{ this._getFormatted() }</span>
        </div>
      </div>

    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) {
      this.setState({
        value: defaultValue.replace(this._getSuffix(), '')
      })
    }
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this.props.onChange(this._getFormatted())
    }
  }

  _getFormatted() {
    const { value } = this.state
    return `${value}${this._getSuffix()}`
  }

  _getSuffix() {
    const { admin } = this.context
    return `-${admin.team.subdomain}@mahaplatform.com`
  }

  _getInput() {
    const { tabIndex } = this.props
    const { value } = this.state
    return {
      ref: node => this.input = node,
      type: 'text',
      tabIndex,
      value,
      onChange: this._handleUpdate
    }
  }

  _handleClear() {
    this.setState({
      value: ''
    })
  }

  _handleUpdate(e) {
    const value = e.target.value.replace(/[\@(),:;<>\s\[\]\\\/]/g, '')
    this.setState({ value })
  }

}

export default SenderField
