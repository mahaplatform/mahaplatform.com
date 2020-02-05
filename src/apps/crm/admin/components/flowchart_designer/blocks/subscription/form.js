import { Container, Form } from 'maha-admin'
import { actions } from './variables'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class AddToList extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    lists: PropTypes.array,
    workflow: PropTypes.object,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config, lists } = this.props
    return {
      title: 'Add to List',
      onChange: this._handleChange,
      onCancel: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { name: 'action', type: 'radiogroup', options: actions, required: true, defaultValue: 'add' },
            { label: 'List', name: 'list_id', type: 'lookup', options: lists, value: 'id', text: 'title', required: true, defaultValue: _.get(config, 'list.id'), form: this._getListForm()}
          ]
        }
      ]
    }
  }

  _getListForm() {
    const { workflow } = this.props
    return {
      title: 'New List',
      method: 'post',
      action: `/api/admin/crm/programs/${workflow.program.id}/lists`,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a name', required: true },
            { name: 'type', type: 'hidden', defaultValue: 'static' }
          ]
        }
      ]
    }
  }

  _handleChange(config) {
    const { lists } = this.props
    const list = _.find(lists, { id: config.list_id })
    this.props.onChange({
      action: config.action,
      list: list ? {
        id: list.id,
        title: list.title
      } : null
    })
  }

  _handleDone() {
    this.props.onDone()
  }

}

const mapResources = (props, context) => ({
  lists: {
    endpoint: `/api/admin/crm/programs/${props.workflow.program.id}/lists`,
    filter: { type: { $eq: 'static' } }
  }
})

export default Container(mapResources)(AddToList)