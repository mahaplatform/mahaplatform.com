import { Designer } from 'maha-admin'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'

class FormDesigner extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <Designer { ...this._getDesigner() } />
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getDesigner() {
    return {
      canvas: <Canvas { ...this._getCanvas() } />,
      sidebar: <Sidebar { ...this._getSidebar() } />
    }
  }

  _getCanvas() {
    // const {} = this.props
    return {}
  }

  _getSidebar() {
    // const {} = this.props
    return {}
  }

}

export default FormDesigner
