import NewRecord from '../../views/records/new'
import { Collection, Container } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

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
        ...fields.map(field => ({
          label: field.name.value,
          key: field.code,
          primary: true
        }))
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
        { label: 'Foo' },
        { label: 'Bar' },
        { label: 'Baz' }
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
