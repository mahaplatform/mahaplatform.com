import EditDataset from '../../views/datasets/edit'
import NewDataset from '../../views/datasets/new'
import EditType from '../../views/types/edit'
import DatasetAccess from './dataset_access'
import NewType from '../../views/types/new'
import TypeAccess from './type_access'
import Responses from './responses'
import PropTypes from 'prop-types'
import { Finder } from '@admin'
import Dataset from './dataset'
import APIKeys from './apikeys'
import Backup from '../backup'
import Schema from './schema'
import Forms from './forms'
import Type from './type'
import Data from './data'
import React from 'react'
import API from './api'
import _ from 'lodash'

class Manager extends React.PureComponent {

  static contextTypes = {
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
                modal: <Backup dataset={ dataset } />
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
            handler: this._handleDatasetView.bind(this, Dataset, dataset),
            children: [
              {
                icon: 'shield',
                label: 'Access',
                handler: this._handleDatasetView.bind(this, DatasetAccess, dataset)
              },
              {
                icon: 'gears',
                label: 'API',
                handler: this._handleTypeView.bind(this, API, dataset),
                children: [
                  {
                    icon: 'key',
                    label: 'Keys',
                    handler: this._handleTypeView.bind(this, APIKeys, dataset)
                  }
                ]
              },
              {
                icon: 'database',
                label: 'Types',
                children: dataset.types.length > 0 ? dataset.types.map(type => ({
                  icon: 'database',
                  label: type.title,
                  handler: this._handleTypeView.bind(this, Type, dataset, type),
                  children: [
                    {
                      icon: 'shield',
                      label: 'Access',
                      handler: this._handleDatasetView.bind(this, TypeAccess, dataset, type)
                    },
                    {
                      icon: 'table',
                      label: 'Data',
                      handler: this._handleTypeView.bind(this, Data, dataset, type)
                    },
                    {
                      icon: 'check-square',
                      label: 'Fields',
                      handler: this._handleTypeView.bind(this, Schema, dataset, type)
                    },
                    {
                      icon: 'globe',
                      label: 'Forms',
                      handler: this._handleTypeView.bind(this, Forms, dataset, type),
                      children: [
                        {
                          icon: 'envelope',
                          label: 'Responses',
                          handler: this._handleTypeView.bind(this, Responses, dataset, type)
                        }
                      ]
                    }
                  ],
                  tasks: [
                    { label: 'Edit Type', modal: <EditType dataset={ dataset } type={ type } /> },
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
