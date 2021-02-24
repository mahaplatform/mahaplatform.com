import { Collection } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Data extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    return (
      <Collection { ...this._getCollection() } />
    )
  }

  _getCollection() {
    return {
      endpoint: '/api/admin/datasets/datasets/1/types/1/items',
      table: [
        { label: 'ID', key: 'id', collapsing: true, visible: false },
        { label: 'Title', key: 'title', primary: true }
      ],
      empty: {
        icon: 'file-text',
        title: 'No Items',
        text: 'You have not yet created any items'
      },
      entity: 'item',
      defaultSort: { key: 'title', order: 'asc' },
      onClick: (record) => this.context.router.history.push(`/datasets/datasets/1/types/1/items/${record.id}`)
    }
  }


}

export default Data
