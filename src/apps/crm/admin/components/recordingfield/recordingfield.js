import PropTypes from 'prop-types'
import React from 'react'

const content_types = ['mpeg','wav','wave','x-wav','aiff','x-aifc','x-aiff','x-gsm','gsm','ulaw'].map(type => {
  return `audio/${type}`
})

class Recordingfield extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  render() {
    return (
      <div className="recordingfield">
      recordingfield
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {}

  _getAttachments() {
    // { label: 'Recording', name: 'recording_id', type: 'attachmentfield', prompt: 'Choose Audio File', multiple: false, allow: { content_types }, defaultValue: config.recording_id },

  }


}

export default Recordingfield
