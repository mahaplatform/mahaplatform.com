import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'

class SocialDesigner extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    profiles: PropTypes.array,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  render() {
    return (
      <div className="social-designer">
        <div className="social-designer-main">
          <Canvas { ...this._getCanvas() } />
        </div>
        <div className="social-designer-sidebar">
          <Sidebar { ...this._getSidebar() } />
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getCanvas() {
    const { config } = this.props
    return {
      config
    }
  }

  _getSidebar() {
    const { cid, config, profiles, onUpdate } = this.props
    return {
      cid,
      config,
      profiles,
      onUpdate
    }
  }

}

export default SocialDesigner
