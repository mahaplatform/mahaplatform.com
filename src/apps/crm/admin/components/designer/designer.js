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
    sidebar: PropTypes.bool,
    title: PropTypes.string,
    tokens: PropTypes.object,
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
    onToggle: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    preview: false
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleAddSection = this._handleAddSection.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { preview, sidebar } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="designer-main">
          <div className="designer-toggle" onClick={ this._handleToggle }>
            { sidebar ?
              <i className="fa fa-times" /> :
              <i className="fa fa-chevron-left" />
            }
          </div>
          { preview ?
            <Preview>
              <Canvas { ...this._getCanvas() } />
            </Preview> :
            <Canvas { ...this._getCanvas() } />
          }
        </div>
        { sidebar &&
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
    const { active, canvas, config, onClone, onEdit, onRemove } = this.props
    return {
      active,
      canvas,
      config,
      onAdd: this._handleAdd,
      onClone,
      onEdit,
      onRemove
    }
  }

  _getClass() {
    const { sidebar } = this.props
    const classes = ['designer']
    if(sidebar) classes.push('expanded')
    return classes.join(' ')
  }

  _getDefault() {
    return {
      page: defaults.page,
      sections: []
    }
  }

  _getSidebar() {
    const { active, blocks, cid, components, config, title, tokens, onDeleteSection, onMoveSection, onEdit, onSave, onUpdate } = this.props
    return {
      active,
      blocks,
      cid,
      components,
      config,
      title,
      tokens,
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

  _handleToggle() {
    this.props.onToggle()
  }

}

export default Designer
