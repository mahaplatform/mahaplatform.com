import SortableList from '../../sortable_list'
import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'
import qs from 'qs'

class Export extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    endpoint: PropTypes.string,
    entity: PropTypes.string,
    filter: PropTypes.object,
    sort: PropTypes.string,
    token: PropTypes.string
  }

  state = {
    items: []
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-collection-tasks-panel-body">
          <SortableList { ...this._getSortableList() } />
        </div>
        <div className="maha-collection-tasks-panel-footer">
          <div className="maha-collection-tasks-panel-footer-item">
            <div className="ui fluid red button" onClick={ this._handleDownload.bind(this, 'csv') }>
              Export CSV
            </div>
          </div>
          <div className="maha-collection-tasks-panel-footer-item">
            <div className="ui fluid red button" onClick={ this._handleDownload.bind(this, 'xlsx') }>
              Export XLSX
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Export Results',
      leftItems: [
        { label: 'Cancel', handler: this._handleDone }
      ]
    }
  }

  _getSortableList() {
    const { defaultValue } = this.props
    return {
      defaultValue,
      onUpdate: (items) => this.setState({ items })
    }
  }

  _handleDownload(extension) {
    const { items } = this.state
    const { endpoint, entity, filter, sort, token } = this.props
    const query = {
      $filter: filter,
      $sort: sort,
      $select: items.filter(item => item.checked).reduce((select, item) => ({
        ...select,
        [item.label]: item.key
      }), {})
    }
    const entities = pluralize(entity)
    const enclosure = encodeURIComponent('"')
    const url = `${endpoint}.${extension}?$page[limit]=0&enclosure=${enclosure}&filename=${entities}&token=${token}&download=true&${qs.stringify(query)}`
    window.location.href = url
    this._handleDone()
  }

  _handleDone() {
    this.context.modal.pop()
  }

}

const mapStateToProps = (state, props) => ({
  token: props.token || (state.maha.admin.team ? state.maha.admin.team.token : null)
})

export default connect(mapStateToProps)(Export)
