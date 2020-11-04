import { Loader, Message, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Picker extends React.Component{

  static contextTypes = {
    network: PropTypes.object,
    form: PropTypes.object
  }

  static propTypes = {
    onDone: PropTypes.func
  }

  state = {
    status: 'pending',
    video: null
  }

  _handleProcess = this._handleProcess.bind(this)
  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleFailure = this._handleFailure.bind(this)
  _handlePreview = this._handlePreview.bind(this)
  _handlePreviewed = this._handlePreviewed.bind(this)

  render() {
    const { status } = this.state
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-videofield-picker">
          <div className="maha-videofield-picker-header">
            <input { ...this._getInput() } />
          </div>
          <div className="maha-videofield-picker-body">
            { status === 'pending' &&
              <Message { ...this._getPendingMessage() } />
            }
            { status === 'loading' &&
              <Loader />
            }
            { status === 'processing' &&
              <Loader label="Processing" />
            }
            { status === 'success' &&
              <div className="maha-videofield-player">
                <iframe { ...this._getIframe()} />
              </div>
            }
            { status === 'failure' &&
              <Message { ...this._getFailureMessage() } />
            }
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPendingMessage() {
    return {
      icon: 'play',
      title: 'Paste URL',
      text: 'Paste the url of a video to preiew its contents'
    }
  }

  _getPanel() {
    return {
      title: 'Choose Video',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleProcess }
      ]
    }
  }

  _getIframe() {
    const { video } = this.state
    return {
      src: video.video_url,
      frameBorder: 0,
      allowFullScreen: true
    }
  }

  _getInput() {
    return {
      type: 'text',
      placeholder: 'Paste a YouTube or Vimeo URL',
      onChange: this._handlePreview
    }
  }

  _getFailureMessage() {
    return {
      icon: 'remove',
      title: 'Unable to load',
      text: 'We were unable to load your url and play the video'
    }
  }

  _handleProcess() {
    const { video } = this.state
    this.setState({
      status: 'processing'
    })
    this.context.network.request({
      endpoint: '/api/admin/assets/url',
      method: 'POST',
      body: {
        url: video.image_url
      },
      onSuccess: this._handleDone,
      onFailure: this._handleFailure
    })
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleDone({ data }) {
    const { video } = this.state
    this.props.onDone({
      src: video.link,
      embed: video.video_url,
      preview: data.path
    })
  }

  _handleFailure() {
    this.setState({
      status: 'failure'
    })
  }

  _handlePreview(e) {
    this.setState({
      status: 'loading'
    })
    this.context.network.request({
      endpoint: '/api/admin/links/preview',
      method: 'GET',
      query: {
        url: e.target.value
      },
      onSuccess: this._handlePreviewed,
      onFailure: this._handleFailure
    })
  }

  _handlePreviewed({ data }) {
    this.setState({
      status: 'success',
      video: data
    })
  }

}

export default Picker
