import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'

class VoiceDesigner extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    blocks: PropTypes.array,
    config: PropTypes.array,
    defaultValue: PropTypes.array,
    steps: PropTypes.array,
    onSet: PropTypes.array
  }

  static defaultProps = {}

  render() {
    return (
      <div className="workflow-designer">
        <div className="workflow-designer-main">
          <Canvas { ...this._getCanvas() } />
        </div>
        <div className="workflow-designer-sidebar">
          <Sidebar { ...this._getSidebar() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onSet(this.props.defaultValue)
  }

  componentDidUpdate(prevProps) {}

  _getCanvas() {
    const { blocks, config } = this.props
    return {
      blocks,
      config
    }
  }

  _getSidebar() {
    const { blocks, config } = this.props
    return {
      blocks,
      config
    }
  }

}

export default VoiceDesigner
