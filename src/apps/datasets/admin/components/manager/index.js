import EditDataset from '../../views/datasets/edit'
import NewDataset from '../../views/datasets/new'
import EditType from '../../views/types/edit'
import NewType from '../../views/types/new'
import PropTypes from 'prop-types'
import { Finder } from '@admin'
import Dataset from './dataset'
import Schema from './schema'
import Access from './access'
import Type from './type'
import Data from './data'
import React from 'react'
import _ from 'lodash'
import API from './api'

class Manager extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object
  }

  state = {
    panel: null,
    datasets: null
  }

  _handleFetch = this._handleFetch.bind(this)

  render() {
    const { datasets, panel } = this.state
    if(!datasets) return null
    return (
      <div className="datasets-manager">
        <div className="datasets-manager-sidebar">
          <Finder {...this._getFinder() } />
        </div>
        <div className="datasets-manager-main">
          { panel }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleJoin()
    this._handleFetch()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getFinder() {
    const { team } = this.context.admin
    const { datasets } = this.state
    return {
      items: [
        {
          icon: 'cubes',
          label: 'Datasets',
          tasks: [
            { label: 'Add Dataset', modal: <NewDataset /> }
          ],
          children: datasets.length > 0 ? datasets.map(dataset => ({
            icon: 'cube',
            label: dataset.title,
            tasks: [
              { label: 'Edit Dataset', modal: <EditDataset dataset={ dataset } /> },
              {
                label: 'Backup Dataset',
                handler: () => {
                  window.location.href = `/api/admin/datasets/datasets/${dataset.id}/backup?token=${team.token}`
                }
              },
              {
                label: 'Delete Dataset',
                confirm: `
                  Are you sure you want to delete this dataset? It will also delete
                  all types and related data.
                `,
                request: {
                  endpoint: `/api/admin/datasets/datasets/${dataset.id}`,
                  method: 'delete',
                  onFailure: () => {},
                  onSuccess: () => {}
                }
              }
            ],
            children: [
              {
                icon: 'shield',
                label: 'Access',
                handler: this._handleDatasetView.bind(this, Access, dataset)
              },
              {
                icon: 'info-circle',
                label: 'Details',
                handler: this._handleDatasetView.bind(this, Dataset, dataset)
              },
              {
                icon: 'database',
                label: 'Types',
                children: dataset.types.length > 0 ? dataset.types.map(type => ({
                  icon: 'database',
                  label: type.title,
                  children: [
                    {
                      icon: 'shield',
                      label: 'Access',
                      handler: this._handleDatasetView.bind(this, Access, dataset)
                    },
                    {
                      icon: 'gears',
                      label: 'API',
                      handler: this._handleTypeView.bind(this, API, dataset, type)
                    },
                    {
                      icon: 'check-square',
                      label: 'Form',
                      children: [
                        { icon: 'info-circle', label: 'Details' },
                        { icon: 'envelope', label: 'Responses' }
                      ]
                    },
                    {
                      icon: 'info-circle',
                      label: 'Details',
                      handler: this._handleTypeView.bind(this, Type, dataset, type)
                    },
                    {
                      icon: 'table',
                      label: 'Data',
                      handler: this._handleTypeView.bind(this, Data, dataset, type)
                    },
                    {
                      icon: 'copy',
                      label: 'Schema',
                      handler: this._handleTypeView.bind(this, Schema, dataset, type)
                    }
                  ],
                  tasks: [
                    { label: 'Edit Type', modal: <EditType dataset={ dataset } type={ type } /> },
                    {
                      label: 'Backup Type',
                      handler: () => {
                        window.location.href = `/api/admin/datasets/datasets/${dataset.id}/backup?token=${team.token}`
                      }
                    },
                    {
                      label: 'Delete Type',
                      confirm: `
                        Are you sure you want to delete this type? It will also delete
                        all related data.
                      `,
                      request: {
                        endpoint: `/api/admin/datasets/datasets/${dataset.id}/types/${type.id}`,
                        method: 'delete',
                        onFailure: () => {},
                        onSuccess: () => {}
                      }
                    }
                  ]
                })) : [
                  {
                    label: 'No types',
                    selectable: false
                  }
                ],
                tasks: [
                  { label: 'Add Type', modal: <NewType dataset={ dataset } /> }
                ]
              }
            ]
          })) : [
            {
              label: 'No datasets',
              selectable: false
            }
          ]
        }
      ],
      selected: '0'
    }
  }

  _getKey() {
    return _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
  }

  _handleDatasetView(View, dataset) {
    this.setState({
      panel: <View dataset={ dataset } key={ this._getKey() } />
    })
  }

  _handleFetch() {
    this.context.network.request({
      endpoint: '/api/admin/datasets/datasets',
      method: 'get',
      onSuccess: (result) => {
        this.setState({
          datasets: result.data
        })
      }
    })
  }

  _handleJoin() {
    const { network } = this.context
    const target = '/admin/datasets/datasets'
    network.join(target)
    network.subscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const target = '/admin/datasets/datasets'
    network.leave(target)
    network.unsubscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleTypeView(View, dataset, type) {
    this.setState({
      panel: <View dataset={ dataset } type={ type } key={ this._getKey() } />
    })
  }

}

export default Manager
