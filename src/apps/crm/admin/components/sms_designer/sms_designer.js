import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'

class VoiceDesigner extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="sms-designer">
        <div className="sms-designer-main">
          <Canvas { ...this._getCanvas() } />
        </div>
        <div className="sms-designer-sidebar">
          <Sidebar { ...this._getSidebar() } />
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getCanvas() {
    return {}
  }

  _getSidebar() {
    return {}
  }

}

export default VoiceDesigner
