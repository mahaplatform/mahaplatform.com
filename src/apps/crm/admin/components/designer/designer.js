import * as defaults from './defaults'
import { Preview } from 'maha-admin'
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
    preview: PropTypes.bool,
    title: PropTypes.string,
    onAdd: PropTypes.func,
    onAddSection: PropTypes.func,
    onChange: PropTypes.func,
    onClone: PropTypes.func,
    onDeleteSection: PropTypes.func,
    onEdit: PropTypes.func,
    onMoveSection: PropTypes.func,
    onRemove: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    preview: false
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleAddSection = this._handleAddSection.bind(this)

  render() {
    const { preview } = this.props
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
        <div className="designer-sidebar">
          <Sidebar { ...this._getSidebar() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const defaultValue = this.props.defaultValue || this._getDefault()
    this.props.onSet(defaultValue)
  }

  _getDefault() {
    return {
      page: defaults.page,
      sections: []
    }
  }

  _getCanvas() {
    const { active, canvas, config, onClone, onEdit, onRemove, onUpdate } = this.props
    return {
      active,
      canvas,
      config,
      onAdd: this._handleAdd,
      onClone,
      onEdit,
      onRemove,
      onUpdate
    }
  }

  _getSidebar() {
    const { active, blocks, cid, components, config, title, onDeleteSection, onMoveSection, onEdit, onSave, onUpdate } = this.props
    return {
      active,
      blocks,
      cid,
      components,
      config,
      title,
      onAddSection: this._handleAddSection,
      onDeleteSection,
      onMoveSection,
      onEdit,
      onUpdate,
      onSave
    }
  }

  _handleAdd(section, index, type) {
    const { onAdd } = this.props
    onAdd(section, index, { type })
  }

  _handleAddSection() {
    const { onAddSection } = this.props
    onAddSection(defaults.section)
  }

}

export default Designer
