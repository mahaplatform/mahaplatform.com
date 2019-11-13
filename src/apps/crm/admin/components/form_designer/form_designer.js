import { Preview } from 'maha-admin'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'

class FormDesigner extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    changes: PropTypes.number,
    cid: PropTypes.string,
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    onSave: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {}

  render() {
    return (
      <div className="form-designer">
        <div className="form-designer-main">
          <div className="form-designer-canvas">
            <Preview>
              <Canvas { ...this._getCanvas() } />
            </Preview> :
          </div>
        </div>
        <div className="form-designer-sidebar">
          <Sidebar { ...this._getSidebar() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const defaultValue = this.props.defaultValue || this._getDefault()
    this.props.onSet(defaultValue)
  }

  componentDidUpdate(prevProps) {}

  _getCanvas() {
    const { config } = this.props
    return {
      config
    }
  }

  _getSidebar() {
    const { cid, config, onSave } = this.props
    return {
      cid,
      config,
      onSave
    }
  }

}

export default FormDesigner
