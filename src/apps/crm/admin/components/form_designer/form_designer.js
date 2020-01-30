import { Preview } from 'maha-admin'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'

class FormDesigner extends React.PureComponent {

  static propTypes = {
    active: PropTypes.number,
    changes: PropTypes.number,
    cid: PropTypes.string,
    code: PropTypes.string,
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    sidebar: PropTypes.bool,
    onAdd: PropTypes.func,
    onClone: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { sidebar } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="designer-main">
          <div className="designer-toggle" onClick={ this._handleToggle }>
            { sidebar ?
              <i className="fa fa-times" /> :
              <i className="fa fa-chevron-left" />
            }
          </div>
          <Preview>
            <Canvas { ...this._getCanvas() } />
          </Preview>
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
    const { active, config, onClone, onEdit, onRemove } = this.props
    return {
      active,
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
      page: null,
      header: null,
      body: null,
      footer: null,
      settings: null,
      fields: []
    }
  }

  _getSidebar() {
    const { active, cid, code, config, onEdit, onSave, onUpdate } = this.props
    return {
      active,
      cid,
      code,
      config,
      onEdit,
      onSave,
      onUpdate
    }
  }

  _handleAdd(index, type) {
    this.props.onAdd(index, { type })
  }

  _handleToggle() {
    this.props.onToggle()
  }

}

export default FormDesigner
