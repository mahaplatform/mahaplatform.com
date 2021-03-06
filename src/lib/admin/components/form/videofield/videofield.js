import { Buttons, Button} from '@admin'
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
    embed: PropTypes.string,
    preview: PropTypes.string,
    prompt: PropTypes.string,
    src: PropTypes.string,
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

  _handleDone = this._handleDone.bind(this)
  _handlePicker = this._handlePicker.bind(this)
  _handleRemove = this._handleRemove.bind(this)

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
    const { defaultValue, onReady, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { src } = this.props
    if(src !== prevProps.src) {
      this._handleChange()
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

  _getIframe() {
    const { embed } = this.props
    return {
      src: embed,
      frameBorder: 0,
      allowFullScreen: true
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

  _getPicker() {
    const { cid } = this.props
    return {
      cid,
      onDone: this._handleDone
    }
  }

  _handleChange() {
    const { embed, preview, src } = this.props
    this.props.onChange({ embed, preview, src })
  }

  _handleDone(video) {
    this.props.onSet(video)
    this.context.form.pop()
  }

  _handlePicker() {
    this.context.form.push(Picker, this._getPicker.bind(this))
  }

  _handleRemove() {
    this.props.onRemove()
  }

}

export default VideoField
