import PropTypes from 'prop-types'
import React from 'react'

class PermalinkField extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.string,
    destination: PropTypes.string,
    placeholder: PropTypes.string,
    prefix: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    placeholder: '/path/to/page',
    prefix: '',
    onChange: () => {},
    onReady: () => {}
  }

  input = null

  state = {
    value: ''
  }

  _handleChange = this._handleChange.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)
  _handleValidate = this._handleValidate.bind(this)

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
            { this._getHost() }{ this._getPermalink() }
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
    this.props.onReady(this._handleValidate)
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getHost() {
    return process.env.WEB_HOST.replace('mahaplatform', 'ccetompkins.mahaplatform')
  }

  _getInput() {
    const { placeholder } = this.props
    const { value } = this.state
    return {
      ref: node => this.input = node,
      type: 'text',
      value,
      placeholder,
      onChange: this._handleUpdate
    }
  }

  _getPermalink() {
    const { prefix } = this.props
    const { value } = this.state
    return `${prefix}/${ value.length > 0 ? value : '' }`
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

  _handleSuccess({ data }) {
    const { onValid } = this.props
    const { value } = this.state
    if(data.length > 0) {
      return onValid(null, ['This url is already taken'])
    }
    onValid(value)
  }

  _handleUpdate(e) {
    const value = e.target.value
    const regex = /^[a-z0-9-_]*$/
    if(!regex.test(value)) return
    this.setState({ value })
  }

  _handleValidate() {
    const { destination, required, onValid } = this.props
    const { value } = this.state
    if(!value && required) return onValid(null, ['This field is required'])
    if(!value) return
    this.context.network.request({
      endpoint: '/api/admin/aliases',
      query: {
        $filter: {
          ...destination ? {
            destination: {
              $neq: destination
            }
          } : {},
          src: {
            $eq: this._getPermalink()
          }
        }
      },
      onSuccess: this._handleSuccess
    })
  }

}

export default PermalinkField
