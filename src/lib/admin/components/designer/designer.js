import * as defaults from './defaults'
import { Preview } from '@admin'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'

class Designer extends React.Component {

  static propTypes = {
    active: PropTypes.object,
    blocks: PropTypes.array,
    changes: PropTypes.number,
    cid: PropTypes.string,
    canvas: PropTypes.string,
    components: PropTypes.object,
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    editable: PropTypes.bool,
    endpoint: PropTypes.string,
    preview: PropTypes.bool,
    program_id: PropTypes.number,
    settings: PropTypes.bool,
    status: PropTypes.string,
    title: PropTypes.string,
    tokens: PropTypes.array,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onClone: PropTypes.func,
    onEdit: PropTypes.func,
    onMove: PropTypes.func,
    onRemove: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    editable: true,
    preview: false
  }
  render() {
    const { editable, preview } = this.props
    return (
      <div className="designer">
        <div className="designer-main">
          { preview ?
            <Preview>
              <Canvas { ...this._getCanvas() } />
            </Preview> :
            <Canvas { ...this._getCanvas() } />
          }
        </div>
        { editable &&
          <div className="designer-sidebar">
            <Sidebar { ...this._getSidebar() } />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const defaultValue = this.props.defaultValue || this._getDefault()
    this.props.onSet(defaultValue)
  }

  _getCanvas() {
    const { active, canvas, config, editable, onAdd, onClone, onEdit, onMove, onRemove } = this.props
    return {
      active,
      canvas,
      config,
      editable,
      onAdd,
      onClone,
      onEdit,
      onMove,
      onRemove
    }
  }

  _getDefault() {
    return {
      page: defaults.page,
      sections: []
    }
  }

  _getSidebar() {
    const { active, blocks, cid, components, config, endpoint, program_id, settings, status, title, tokens, onEdit, onSave, onUpdate } = this.props
    return {
      active,
      blocks,
      cid,
      components,
      config,
      endpoint,
      settings,
      status,
      title,
      program_id,
      tokens,
      onEdit,
      onUpdate,
      onSave
    }
  }

}

export default Designer
