import { Loader, Message, ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Picker extends React.Component{

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    src: PropTypes.string,
    status: PropTypes.string,
    onFetch: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { status } = this.props
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
        { label: 'Done', handler: this._handleDone }
      ]
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

  _getInput() {
    return {
      type: 'text',
      placeholder: 'Paste a YouTube or Vimeo URL',
      onChange: this._handleChange
    }
  }

  _getFailureMessage() {
    return {
      icon: 'remove',
      title: 'Unable to load',
      text: 'We were unable to load your url and play the video'
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChange(e) {
    this.props.onFetch(e.target.value)
  }

  _handleDone() {
    this.context.form.pop()
  }

}

const mapStateToProps = (state, props) => ({
  src: state.crm.videofield[props.cid].src,
  status: state.crm.videofield[props.cid].status
})

export default connect(mapStateToProps)(Picker)
