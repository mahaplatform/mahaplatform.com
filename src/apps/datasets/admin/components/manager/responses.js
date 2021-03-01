import { Collection, Container, StatusToken } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Responses extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    dataset: PropTypes.object,
    fields: PropTypes.array,
    type: PropTypes.object
  }

  render() {
    return (
      <Collection { ...this._getCollection() } />
    )
  }

  _getCollection() {
    const { dataset, fields, type } = this.props
    return {
      endpoint: `/api/admin/datasets/datasets/${dataset.id}/types/${type.id}/responses`,
      table: [
        { label: 'ID', key: 'id', collapsing: true, visible: false },
        { label: 'Contact', key: 'contact.display_name' },
        { label: 'Record', key: 'record.title' },
        { label: 'Status', key: 'status', collapsing: true, visible: true, format: StatusToken }
      ],
      empty: {
        icon: 'envelope',
        title: 'No Responses',
        text: 'You have not yet received any responses'
      },
      criteria: {
        fields: [
          {
            label: type.title,
            fields: fields.map(field => ({
              name: field.name.value,
              key: field.code,
              type: 'text'
            }))
          }
        ]
      },
      entity: 'record',
      defaultSort: { key: 'title', order: 'asc' },
      selectable: true,
      onClick: (record) => this.context.router.history.push(`/datasets/datasets/${dataset.id}/types/${type.id}/responses/${record.id}`)
    }
  }

}

const mapResources = (props, context) => ({
  fields: `/api/admin/datasets_types/${props.type.id}/fields`
})

export default Container(mapResources)(Responses)
