import ExportDialog from './export'
import PropTypes from 'prop-types'
import Button from '../../button'
import React from 'react'

class Export extends React.Component {

  static propTypes = {
    columns: PropTypes.array,
    endpoint: PropTypes.string,
    entity: PropTypes.string,
    filter: PropTypes.object,
    sort: PropTypes.string,
    token: PropTypes.string
  }

  render() {
    return <Button { ...this._getButton() } />
  }

  _getButton() {
    return {
      icon: 'download',
      className: 'maha-collection-header-action',
      modal: <ExportDialog { ...this._getExport() } />,
      tooltip: {
        title: 'Export Records',
        position: 'bottom right'
      }
    }
  }

  _getExport() {
    const { columns, endpoint, entity, filter, sort } = this.props
    return {
      endpoint,
      columns,
      entity,
      filter,
      sort
    }
  }

}

export default Export
