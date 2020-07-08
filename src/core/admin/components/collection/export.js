import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Button from '../button'
import React from 'react'
import qs from 'qs'

class Export extends React.Component {

  static contextTypes = {
    tasks: PropTypes.object
  }

  static propTypes = {
    columns: PropTypes.array,
    endpoint: PropTypes.string,
    entity: PropTypes.string,
    filter: PropTypes.object,
    sort: PropTypes.string,
    token: PropTypes.string
  }

  _handleTasks = this._handleTasks.bind(this)

  render() {
    return <Button { ...this._getButton() } />
  }

  _getButton() {
    return {
      icon: 'download',
      className: 'maha-collection-header-action',
      handler: this._handleTasks,
      tooltip: {
        title: 'Export Records',
        position: 'bottom right'
      }
    }
  }

  _handleTasks() {
    this.context.tasks.open({
      items: [
        this._getTask('csv'),
        this._getTask('xlsx')
      ]
    })
  }

  _getTask(type) {
    return {
      label: `Export ${type.toUpperCase()}`,
      className: 'maha-collection-dropdown-item',
      handler: this._handleDownload.bind(this, type)
    }
  }

  _handleDownload(extension) {
    const { columns, endpoint, entity, filter, sort, token } = this.props
    const query = {
      $filter: filter,
      $sort: sort,
      $select: columns.filter(column => column.checked).reduce((select, item) => ({
        ...select,
        [item.label]: item.key
      }), {})
    }
    const entities = pluralize(entity)
    const url = `${endpoint}.${extension}?$page[limit]=0&filename=${entities}&token=${token}&download=true&${qs.stringify(query)}`
    window.location.href = url
  }

}

const mapStateToProps = (state, props) => ({
  token: props.token || (state.maha.admin.team ? state.maha.admin.team.token : null)
})

export default connect(mapStateToProps)(Export)
