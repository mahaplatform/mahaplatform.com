import EditDataset from '../../views/datasets/edit'
import NewDataset from '../../views/datasets/new'
import EditType from '../../views/types/edit'
import NewType from '../../views/types/new'
import PropTypes from 'prop-types'
import { Finder } from '@admin'
import React from 'react'
import Data from './data'

class Manager extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  state = {
    datasets: []
  }

  _handleFetch = this._handleFetch.bind(this)

  render() {
    return (
      <div className="datasets-manager">
        <div className="datasets-manager-sidebar">
          <Finder {...this._getFinder() } />
        </div>
        <div className="datasets-manager-main">
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
          children: datasets.map(dataset => ({
            icon: 'cube',
            label: dataset.title,
            tasks: [
              { label: 'Edit Dataset', modal: <EditDataset dataset={ dataset } /> },
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
              { icon: 'shield', label: 'Access' },
              {
                icon: 'database',
                label: 'Types',
                children: dataset.types.map(type => ({
                  icon: 'database',
                  label: type.title,
                  children: [
                    { icon: 'file-text', label: 'Schema' },
                    { icon: 'table', label: 'Data' }
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
                })),
                tasks: [
                  { label: 'Add Type', modal: <NewType dataset={ dataset } /> }
                ]
              }
            ]
          }))
        }
      ],
      selected: '0'
    }
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

}

export default Manager
