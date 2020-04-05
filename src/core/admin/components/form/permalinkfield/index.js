import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class PermalinkField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    prefix: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    placeholder: '/path/to/page',
    prefix: '',
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    value: ''
  }

  _handleChange = this._handleChange.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="crm-permalinkfield">
        <div className="crm-permalinkfield-field">
          <div className="maha-input">
            <div className="maha-input-field">
              <input { ...this._getInput() } />
            </div>
            { value &&
              <div className="maha-input-clear" onClick={ this._handleClear }>
                <i className="fa fa-times" />
              </div>
            }
          </div>
        </div>
        <div className="crm-permalinkfield-permalink">
          <span className="crm-permalinkfield-permalink-text">
            { this._getHost() }{ value.length > 0 ? value : '' }
          </span>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) {
      this.setState({
        value: defaultValue
      })
    }
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(!_.isEqual(value, prevState.value)) {
      this._handleChange()
    }
  }

  _getHost() {
    const { prefix } = this.props
    const host = process.env.WEB_HOST.replace('mahaplatform', 'ccetompkins.mahaplatform')
    return `${host}${prefix}/`
  }

  _getInput() {
    const { placeholder } = this.props
    const { value } = this.state
    return {
      type: 'text',
      value,
      placeholder,
      onChange: this._handleUpdate
    }
  }

  _handleChange() {
    const { value } = this.state
    this.props.onChange(value)
  }

  _handleClear() {
    this.setState({
      value: ''
    })
  }

  _handleUpdate(e) {
    const value = e.target.value
    const regex = /^[a-z0-9-_]*$/
    if(!regex.test(value)) return
    this.setState({ value })
  }

}

export default PermalinkField
