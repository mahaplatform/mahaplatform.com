import { Designer } from 'maha-admin'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'

class SocialDesigner extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object
  }

  static defaultProps = {}

  render() {
    return <Designer { ...this._getDesigner() } />
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getCanvas() {
    const { config } = this.props
    return {
      config
    }
  }

  _getDesigner() {
    return {
      canvas: <Canvas { ...this._getCanvas() } />,
      sidebar: <Sidebar { ...this._getSidebar() } />
    }
  }

  _getSidebar() {
    return {}
  }

}

export default SocialDesigner
