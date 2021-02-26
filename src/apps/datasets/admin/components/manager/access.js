import DatasetAccessToken from '../../tokens/dataset_access'
import { Access, Container, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Acess extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    accesses: PropTypes.array,
    dataset: PropTypes.object,
    type: PropTypes.object
  }

  render() {
    return (
      <div className="datasets-manager-container">
        <div className="datasets-manager-panel">
          <List { ...this._getList() } />
        </div>
      </div>
    )
  }

  _getAccess() {
    const { dataset } = this.props
    return {
      action: `/api/admin/datasets/datasets/${dataset.id}/access`,
      endpoint: `/api/admin/datasets/datasets/${dataset.id}/access`
    }
  }

  _getList() {
    const { accesses } = this.props
    return {
      items: accesses.map((access, index) => ({
        component: (props) => <DatasetAccessToken access={ access } />
      })),
      empty: {
        icon: 'user-circle',
        title: 'No access',
        text: 'This datatset has no authorized users',
        button: {
          label: 'Manage Access',
          modal: <Access { ...this._getAccess() } />
        }
      },
      buttons: [
        { label: 'Manage Access', color: 'blue', modal: <Access { ...this._getAccess() } /> }
      ]
    }
  }

}

const mapResources = (props, context) => ({
  accesses: `/api/admin/datasets/datasets/${props.dataset.id}/access`
})

export default Container(mapResources)(Acess)
