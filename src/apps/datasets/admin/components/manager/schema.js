import { Fields } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Schema extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    dataset: PropTypes.object,
    type: PropTypes.object
  }

  render() {
    return (
      <div className="datasets-manager-container">
        <div className="datasets-manager-panel">
          <Fields { ...this._getFields()}  />
        </div>
      </div>
    )
  }

  _getFields() {
    const { dataset, type } = this.props
    return {
      parent_type: 'datasets_types',
      parent_id: type.id,
      datasources: dataset.types.map(type => ({
        label: type.title,
        endpoint: `/api/admin/datasets/datasets/${dataset.id}/types/${type.id}/records`,
        value: 'id',
        text: 'title',
        type_id: type.id
      }))
    }
  }

}

export default Schema
