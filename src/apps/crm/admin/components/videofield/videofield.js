import { Loader, Message, TextArea } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class VideoField extends React.Component{

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    caption: PropTypes.string,
    defaultValue: PropTypes.object,
    status: PropTypes.object,
    video: PropTypes.object,
    onFetch: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleSet = this._handleSet.bind(this)

  render() {
    const { status } = this.props
    return (
      <div className="videofield">
        <div className="videofield-header">
          <input { ...this._getInput() } />
        </div>
        <div className="videofield-body">
          { status === 'pending' &&
            <Message { ...this._getPendingMessage() } />
          }
          { status === 'loading' &&
            <Loader />
          }
          { status === 'failure' &&
            <Message { ...this._getFailureMessage() } />
          }
          { status === 'success' &&
            <div className="videofield-form">
              <div { ...this._getPlayer() }>
                <iframe { ...this._getIframe() } />
              </div>
              Caption
              <TextArea { ...this._getCaption() } />
            </div>
          }
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
    const { video, onChange } = this.props
    if(video !== prevProps.video) {
      onChange(video)
    }
  }

  _getIframe() {
    const { video } = this.props
    return {
      src: video.video_url,
      frameBorder: 0,
      allowFullScreen: true
    }
  }

  _getPlayer() {
    const { video } = this.props
    const { video_width, video_height } = video
    return {
      className: 'videofield-player',
      style: {
        paddingTop: `${(video_height / video_width) * 100}%`
      }
    }
  }

  _getPendingMessage() {
    return {
      icon: 'play',
      title: 'Paste URL',
      text: 'Paste the url of a video to preiew its contents'
    }
  }

  _getInput() {
    return {
      type: 'text',
      placeholder: 'Paste a YouTube or Vimeo URL',
      onChange: this._handleFetch
    }
  }

  _getFailureMessage() {
    return {
      icon: 'remove',
      title: 'Unable to load',
      text: 'We were unable to load your url and play the video'
    }
  }

  _getCaption() {
    const { caption } = this.props
    return {
      defaultValue: caption
    }
  }

  _handleFetch(e) {
    this.props.onFetch(e.target.value)
  }

  _handleRemove() {
    this.props.onRemove()
  }

  _handleSet(src) {
    this.props.onSet(src)
  }

}

export default VideoField
