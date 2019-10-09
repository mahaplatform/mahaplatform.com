import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'

class DocumentDesigner extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="postal-designer">
        <div className="postal-designer-main">
          <Canvas { ...this._getCanvas() } />
        </div>
        <div className="postal-designer-sidebar">
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

export default DocumentDesigner
