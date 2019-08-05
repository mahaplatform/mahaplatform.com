import SortableList from '../sortable_list'
import ModalPanel from '../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Button from '../button'
import React from 'react'
import qs from 'qs'

class Export extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
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
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-export">
          <div className="maha-export-body">
            <SortableList { ...this._getSortableList() } />
          </div>
          <div className="maha-cexport-footer">
            <div className="maha-cexport-footer-item">
              <Button { ...this._getButton('csv') } />
            </div>
            <div className="maha-export-footer-item">
              <Button { ...this._getButton('xlsx') } />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getButton(type) {
    return {
      label: `Export ${type.toUpperCase()}`,
      className: 'ui fluid red button',
      handler: this._handleDownload.bind(this, type)
    }
  }

  _getPanel() {
    return {
      title: 'Export',
      leftItems: [
        { label: 'Cancel', handler: this._handleDone }
      ]
    }
  }

  _getSortableList() {
    const { defaultValue } = this.props
    return {
      defaultValue,
      onUpdate: this._handleUpdate
    }
  }

  _handleDone() {
    this.context.modal.pop()
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

  _handleUpdate(items) {
    this.setState({ items })
  }

}

const mapStateToProps = (state, props) => ({
  token: props.token || (state.maha.admin.team ? state.maha.admin.team.token : null)
})

export default connect(mapStateToProps)(Export)
