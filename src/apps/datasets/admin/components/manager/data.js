import NewRecord from '@apps/datasets/admin/views/records/new'
import { Collection, Container, StatusToken } from '@admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'
import _ from 'lodash'

class Data extends React.PureComponent {

  static contextTypes = {
    flash: PropTypes.object,
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    dataset: PropTypes.object,
    fields: PropTypes.array,
    type: PropTypes.object
  }

  state = {
    cacheKey: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
  }

  _handleRefresh = this._handleRefresh.bind(this)

  render() {
    return (
      <Collection { ...this._getCollection() } />
    )
  }

  componentDidMount() {
    this._handleJoin()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getCollection() {
    const { cacheKey } = this.state
    const { dataset, fields, type } = this.props
    return {
      code: `dataset-${dataset.id}`,
      cacheKey,
      endpoint: `/api/admin/datasets/datasets/${dataset.id}/types/${type.id}/records`,
      table: [
        { label: 'ID', key: 'id', collapsing: true, visible: false },
        ...fields.filter(field => {
          return field.is_active
        }).map((field, index) => ({
          label: field.name.value,
          key: `values.${field.code}`,
          sort: field.code,
          primary: index === 0,
          visible: index !== 0
        })),
        { label: 'Status', key: 'status', collapsing: true, primary: true, format: StatusToken }
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
            fields: [
              ...fields.filter(field => {
                return field.is_active
              }).map(field => ({
                name: field.name.value,
                key: field.code,
                type: 'text'
              })),
              { name: 'Status', key: 'status', type: 'select', multiple: true, options: ['draft','published','changed','archived'], format: StatusToken }
            ]
          }
        ]
      },
      export: [
        { label: 'ID', key: 'id' },
        ...fields.map((field, index) => ({
          label: field.name.value,
          key: `values.${field.code}`
        })),
        { label: 'Status', key: 'status' }
      ],
      recordTasks: (record) => [
        {
          label: 'Publish Record'
        },
        {
          label: 'Archive Record'
        },
        {
          label: 'Delete Record'
        }
      ],
      entity: 'record',
      defaultSort: { key: fields[0].code, order: 'asc' },
      selectable: true,
      buttons: (selected, onSuccess) => [{
        color: 'red',
        text: 'Delete Selected',
        confirm: `Are you sure you want to delete these ${pluralize('records', selected.total, true)}?`,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/datasets/datasets/${dataset.id}/types/${type.id}/records`,
          body: {
            operation: 'delete',
            filter: selected.filter
          },
          onFailure: (result) => this.context.flash.set('error', `Unable to delete these ${pluralize('records', selected.total, true)}`),
          onSuccess: (result) => this.context.flash.set('success', `You successfully deleted ${pluralize('records', selected.total, true)}`)
        }
      },{
        color: 'red',
        text: 'Publish Selected',
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/datasets/datasets/${dataset.id}/types/${type.id}/records`,
          body: {
            operation: 'publish',
            filter: selected.filter
          },
          onFailure: (result) => this.context.flash.set('error', `Unable to publish these ${pluralize('records', selected.total, true)}`),
          onSuccess: (result) => this.context.flash.set('success', `You successfully published ${pluralize('records', selected.total, true)}`)
        }
      },{
        color: 'red',
        text: 'Archive Selected',
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/datasets/datasets/${dataset.id}/types/${type.id}/records`,
          body: {
            operation: 'archive',
            filter: selected.filter
          },
          onFailure: (result) => this.context.flash.set('error', `Unable to archive these ${pluralize('record', selected.total, true)}`),
          onSuccess: (result) => this.context.flash.set('success', `You successfully archive ${pluralize('record', selected.total, true)}`)
        }
      }],
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

  _handleJoin() {
    const { dataset, type } = this.props
    const target = `/admin/datasets/datasets/${dataset.id}/types/${type.id}/records`
    this.context.network.join(target)
    this.context.network.subscribe([
      { target, action: 'refresh', handler: this._handleRefresh }
    ])
  }

  _handleLeave() {
    const { dataset, type } = this.props
    const target = `/admin/datasets/datasets/${dataset.id}/types/${type.id}/records`
    this.context.network.leave(target)
    this.context.network.unsubscribe([
      { target, action: 'refresh', handler: this._handleRefresh }
    ])
  }

  _handleRefresh() {
    this.setState({
      cacheKey: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    })
  }

}

const mapResources = (props, context) => ({
  fields: `/api/admin/datasets_types/${props.type.id}/fields`
})

export default Container(mapResources)(Data)
