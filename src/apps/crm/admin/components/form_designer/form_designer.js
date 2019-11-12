import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'

class FormDesigner extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="form-designer">
        <div className="form-designer-main">
          <div className="form-designer-canvas">
            <Canvas { ...this._getCanvas() } />
          </div>
        </div>
        <div className="form-designer-sidebar">
          <Sidebar { ...this._getSidebar() } />
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getCanvas() {}

  _getSidebar() {}

}

export default FormDesigner
