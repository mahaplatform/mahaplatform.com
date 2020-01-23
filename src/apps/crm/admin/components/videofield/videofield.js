import { Buttons, Button} from 'maha-admin'
import PropTypes from 'prop-types'
import Picker from './picker'
import React from 'react'

class VideoField extends React.Component{

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    cid: PropTypes.string,
    defaultValue: PropTypes.number,
    src: PropTypes.string,
    preview: PropTypes.string,
    prompt: PropTypes.string,
    onFetch: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    prompt: 'Choose Video',
    onChange: () => {},
    onReady: () => {}
  }

  _handlePicker = this._handlePicker.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleSet = this._handleSet.bind(this)

  render() {
    const { src } = this.props
    if(!src) return <Button { ...this._getNewButton() } />
    return (
      <div className="maha-videofield">
        <div className="maha-videofield-player">
          <iframe { ...this._getIframe()} />
        </div>
        <div className="maha-videofield-footer">
          <Buttons { ...this._getEditButtons() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady, onFetch } = this.props
    if(defaultValue) onFetch(defaultValue)
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { src } = this.props
    if(src !== prevProps.src) {
      this._handleChange()
    }
  }

  _getIframe() {
    const { src } = this.props
    return {
      src,
      frameBorder: 0,
      allowFullScreen: true
    }
  }

  _getPicker() {
    const { cid, onFetch } = this.props
    return {
      cid,
      onFetch
    }
  }

  _getEditButtons() {
    return {
      buttons: [
        {
          label: 'Remove',
          color: 'red',
          handler: this._handleRemove
        },{
          label: 'Change',
          color: 'green',
          handler: this._handlePicker
        }
      ]
    }
  }

  _getNewButton() {
    const { prompt } = this.props
    return {
      className: 'ui button',
      label: prompt,
      handler: this._handlePicker
    }
  }

  _handleChange() {
    const { src, preview } = this.props
    this.props.onChange({ src, preview })
  }

  _handlePicker() {
    this.context.form.push(Picker, this._getPicker.bind(this))
  }

  _handleRemove() {
    this.props.onRemove()
  }

  _handleSet(src) {
    this.props.onSet(src)
  }

}

export default VideoField
