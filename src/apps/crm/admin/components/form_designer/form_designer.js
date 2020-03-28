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
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    endpoint: PropTypes.string,
    form: PropTypes.object,
    fields: PropTypes.array,
    status: PropTypes.string,
    onAdd: PropTypes.func,
    onClone: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)

  render() {
    return (
      <div className="designer">
        <div className="designer-main">
          <Preview>
            <Canvas { ...this._getCanvas() } />
          </Preview>
        </div>
        <div className="designer-sidebar">
          <Sidebar { ...this._getSidebar() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const defaultValue = this.props.form.config || this._getDefault()
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
    const { active, cid, changes, config, endpoint, form, fields, status, onEdit, onSave, onUpdate } = this.props
    return {
      active,
      cid,
      changes,
      config,
      endpoint,
      form,
      fields,
      status,
      onEdit,
      onSave,
      onUpdate
    }
  }

  _handleAdd(index, type) {
    this.props.onAdd(index, { type })
  }

}

export default FormDesigner
