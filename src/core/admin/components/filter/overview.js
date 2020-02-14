import { Container } from '../container'
import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Loader from '../loader'
import Button from '../button'
import React from 'react'
import _ from 'lodash'

class Overview extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    entity: PropTypes.string,
    filters: PropTypes.array,
    onChange: PropTypes.func,
    onEdit: PropTypes.func,
    onNew: PropTypes.func
  }

  state = {
    active: null
  }

  _handleNew = this._handleNew.bind(this)

  render() {
    const { entity, filters } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criteria-list-overview">
          <div className="maha-criteria-list-items">
            <div className={ this._getClass(null) } onClick={ this._handleChoose.bind(this, null) }>
              <div className="maha-criteria-list-item-label">
                All { _.capitalize(pluralize(entity)) }
              </div>
            </div>
            { filters && filters.map((filter, index) => (
              <div className={ this._getClass(filter.id) } key={`filter_${index}`} onClick={ this._handleChoose.bind(this, filter.id) }>
                <div className="maha-criteria-list-item-label">
                  { filter.title }
                </div>
                <Button { ...this._getEdit(filter) } />
                <Button { ...this._getDelete(filter) } />
              </div>
            )) }
            <div className="maha-criteria-list-item">
              <Button { ...this._getButton() } />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { active } = this.state
    const { filters, onChange } = this.props
    if(active !== prevState.active) {
      const filter = filters.find(filter => filter.id === active)
      const criteria = filter ? filter.criteria : { $and: [] }
      onChange(criteria)
    }
  }

  _getButton() {
    return {
      label: '+ New Filter',
      className: 'maha-criteria-list-item-label',
      handler: this._handleNew
    }
  }

  _getClass(id) {
    const { active } = this.state
    const classes = ['maha-criteria-list-item']
    if(id === active) classes.push('active')
    return classes.join(' ')
  }

  _getDelete(filter) {
    return {
      label: <i className="fa fa-trash-o" />,
      className: 'maha-criteria-list-item-action',
      confirm: 'Are you sure you want to delete this filter?',
      request: {
        method: 'DELETE',
        endpoint: `/api/admin/${filter.code}/filters/${filter.id}`,
        onSuccess: () => {
          this.context.flash.set('success', 'The filter was successfully deleted')
        }
      }
    }
  }

  _getEdit(filter) {
    return {
      label: <i className="fa fa-pencil" />,
      className: 'maha-criteria-list-item-action',
      handler: this._handleEdit.bind(this, filter)
    }
  }

  _getPanel() {
    return {
      title: 'Filters',
      color: 'grey'
    }
  }

  _handleChoose(active) {
    this.setState({ active })
  }

  _handleNew() {
    this.props.onNew()
  }

  _handleEdit(filter, e) {
    this.props.onEdit(filter)
    e.stopPropagation()
  }

}

const mapResources = (props, context) => ({
  filters: {
    endpoint: `/api/admin/${props.code}/filters`,
    refresh: `/admin/${props.code}/filters`
  }
})

export default Container(mapResources)(Overview)
