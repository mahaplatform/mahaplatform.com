import { Container } from '../../container'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Button from '../../button'
import Criteria from './criteria'
import React from 'react'
import _ from 'lodash'

class Overview extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    entity: PropTypes.string,
    fields: PropTypes.array,
    filters: PropTypes.array,
    onChange: PropTypes.func,
    onEdit: PropTypes.func,
    onNew: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    active: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDelete = this._handleDelete.bind(this)
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
      const criteria = filter ? filter.config.criteria : null
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

  _getCriteria(filter = null) {
    const { code, fields, onChange } = this.props
    return {
      code,
      filter,
      fields,
      onChange,
      onCancel: this._handleCancel
    }
  }

  _getDelete(filter) {
    return {
      label: <i className="fa fa-trash-o" />,
      className: 'maha-criteria-list-item-action',
      confirm: 'Are you sure you want to delete this filter?',
      request: {
        method: 'DELETE',
        endpoint: `/api/admin/${filter.code}/filters/${filter.id}`,
        onSuccess: this._handleDelete
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

  _handleCancel(reset) {
    if(reset) this._handleReset()
    this.props.onPop()
  }

  _handleDelete() {
    this._handleReset()
  }

  _handleChoose(active) {
    this.setState({ active })
  }

  _handleNew() {
    this._handleReset()
    this.props.onPush(Criteria, this._getCriteria.bind(this))
  }

  _handleEdit(filter) {
    this._handleChoose(filter.id)
    this.props.onPush(Criteria, this._getCriteria.bind(this, filter))
  }

  _handleReset() {
    const active = null
    this.props.onChange(active)
    this.setState({ active })
  }

}

const mapResources = (props, context) => ({
  filters: {
    endpoint: `/api/admin/${props.code}/filters`,
    refresh: `/admin/${props.code}/filters`
  }
})

export default Container(mapResources)(Overview)