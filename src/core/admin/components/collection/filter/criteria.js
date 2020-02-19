import Criteria from '../../criteria'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'
import New from './new'
import _ from 'lodash'

class CriteriaPanel extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    filter: PropTypes.object,
    onChange: PropTypes.func,
    onPop: PropTypes.func
  }

  state = {
    filter: null,
    criteria: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return <Criteria { ...this._getCriteria() } />
  }

  componentDidMount() {
    const { filter } = this.props
    if(!filter) return
    this.setState({
      filter,
      criteria: filter.criteria
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { criteria } = this.state
    if(!_.isEqual(criteria, prevState.criteria)) {
      this.props.onChange(criteria)
    }
  }

  _getCriteria() {
    const { filter, criteria } = this.state
    const { code, fields } = this.props
    return {
      code,
      defaultValue: criteria,
      panel: this._getPanel(filter),
      fields,
      onChange: this._handleChange
    }
  }

  _getDelete(filter) {
    const { onPop } = this.props
    return {
      label: 'Delete',
      color: 'red',
      confirm: 'Are you sure you want to delete this filter?',
      request: {
        method: 'DELETE',
        endpoint: `/api/admin/${filter.code}/filters/${filter.id}`,
        onSuccess: () => {
          this.context.flash.set('success', 'The filter was successfully deleted')
          onPop()
        }
      }
    }
  }

  _getEdit(filter) {
    return {
      label: 'Edit',
      color: 'blue',
      modal: <Edit filter={ filter } />
    }
  }

  _getPanel(filter) {
    const { user } = this.context.admin
    const editable = filter && filter.owner.id === user.id
    return {
      title: filter ? filter.title : 'New Filter',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      buttons: [
        ...editable ? [
          this._getDelete(filter),
          this._getEdit(filter)
        ]: [],
        this._getSave(filter)
      ]
    }
  }

  _getNew() {
    const { code } = this.props
    const { criteria } = this.state
    return {
      code,
      criteria,
      onSuccess: this._handleCreate.bind(this)
    }
  }

  _getSave(filter) {
    const { criteria } = this.state
    const { code } = this.props
    const id = filter ? filter.id : null
    return {
      label: 'Save',
      color: 'blue',
      disabled: !(criteria !== null && criteria.length > 0),
      modal: !id ? <New { ...this._getNew() } /> : null,
      request: id ? {
        endpoint: `/api/admin/${code}/filters/${id}`,
        method: 'PATCH',
        body: { criteria },
        onSuccess: () => {
          this.context.flash.set('success', 'This filter was successfully saved')
        }
      } : null
    }
  }

  _handleCancel() {
    this.props.onPop()
  }

  _handleChange(criteria) {
    this.setState({ criteria })
  }

  _handleCreate(filter) {
    this.setState({ filter })
  }

}

export default CriteriaPanel
