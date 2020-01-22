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
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="crm-imagefield">
        { value ?
          <div className="crm-imagefield-preview">
            <img src={`/imagecache/fit=cover&w=250&h=250/${value}`} />
          </div> :
          <Button { ...this._getButton() } />
        }
      </div>
    )
  }

  componentDidMount() {
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

  _handleUpdate(assets) {
    const image = assets[0]
    this.setState({
      value: image.path
    })
    this.context.form.pop()
  }

}

export default ImageField
