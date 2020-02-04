import { Attachments, Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import qs from 'qs'

class ImageField extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.string,
    ratio: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    ratio: 1
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
    const transform = this._getTransform()
    return (
      <div className="crm-imagefield">
        { value ?
          <div className="crm-imagefield-preview">
            <img src={`/imagecache/${transform}${value}`} />
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

  _getTransform() {
    const { ratio } = this.props
    return qs.stringify({
      fit: 'cover',
      w: 200 * ratio,
      h: 200,
      q: 100
    })
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
