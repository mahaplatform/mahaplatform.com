import NewRecord from '@apps/datasets/admin/views/records/new'
import { Collection, Container, StatusToken } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Data extends React.PureComponent {

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
      endpoint: `/api/admin/datasets/datasets/${dataset.id}/types/${type.id}/records`,
      table: [
        { label: 'ID', key: 'id', collapsing: true, visible: false },
        ...fields.map((field, index) => ({
          label: field.name.value,
          key: `values.${field.code}`,
          primary: index === 0
        })),
        { label: 'Status', key: 'status', collapsing: true, visible: true, format: StatusToken }
      ],
      empty: {
        icon: 'file-text',
        title: 'No Records',
        text: 'You have not yet created any records',
        buttons: [
          { label: 'Create Record', modal: <NewRecord type={ type } fields={ fields } dataset={ dataset } /> }
        ]
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
      buttons: (selected, onSuccess) => [
        { label: 'Publish Records' },
        { label: 'Archive Records' }
      ],
      tasks: {
        icon: 'plus',
        items: [
          { label: 'Create Record', modal: <NewRecord type={ type } fields={ fields } dataset={ dataset } /> },
          { label: 'Import Records'}
        ]
      },
      onClick: (record) => this.context.router.history.push(`/datasets/datasets/${dataset.id}/types/${type.id}/records/${record.id}`)
    }
  }

}

const mapResources = (props, context) => ({
  fields: `/api/admin/datasets_types/${props.type.id}/fields`
})

export default Container(mapResources)(Data)
