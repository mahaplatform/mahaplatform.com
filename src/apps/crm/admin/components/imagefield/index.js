import { Attachments, Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class ImageField extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    value: null
  }

  _handleAttachments = this._handleAttachments.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="crm-imagefield">
        { value ?
          <div className="crm-imagefield-preview">
            <img src={`/imagecache/fit=cover&w=200&h=200${value}`} />
            <div className="crm-imagefield-remove" onClick={ this._handleClear }>
              <i className="fa fa-times" />
            </div>
          </div> :
          <Button { ...this._getButton() } />
        }
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
    if(value !== prevState.value) {
      this.props.onChange(value)
    }
  }

  _getAttachments() {
    return {
      multiple: false,
      allow: {
        extensions: ['jpg','gif','png']
      },
      cancelText: <i className="fa fa-chevron-left" />,
      onCancel: this._handleCancel,
      onDone: this._handleUpdate
    }
  }

  _getButton() {
    return {
      label: 'Choose Image',
      className: 'ui button',
      handler: this._handleAttachments
    }
  }

  _handleAttachments() {
    this.context.form.push(Attachments, this._getAttachments())
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleClear() {
    this.setState({
      value: null
    })
  }

  _handleUpdate(assets) {
    const image = assets[0]
    this.setState({
      value: image.path
    })
    this.context.form.pop()
  }

}

export default ImageField
