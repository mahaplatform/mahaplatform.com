import New from '@apps/datasets/admin/views/apikeys/new'
import { Container, SensitiveText } from '@admin'
import PropTypes from 'prop-types'
import { Button } from '@admin'
import React from 'react'

class APIKeys extends React.PureComponent {

  static contextTypes = {
    flash: PropTypes.object
  }

  static propTypes = {
    apikeys: PropTypes.array,
    dataset: PropTypes.object
  }

  render() {
    const { apikeys } = this.props
    return (
      <div className="datasets-manager-container">
        <div className="datasets-manager-panel">
          <div className="maha-table">
            <table>
              <thead>
                <tr>
                  <td>Title</td>
                  <td className="collapsing">Token</td>
                  <td className="collapsing" />
                </tr>
              </thead>
              <tbody>
                { apikeys.map((apikey, index) => (
                  <tr key={`apikey_${index}`}>
                    <td>{ apikey.title }</td>
                    <td>
                      <SensitiveText text={ apikey.access_token } />
                    </td>
                    <td>
                      <Button { ...this._getTasks(apikey) } />
                    </td>
                  </tr>
                )) }
                { apikeys.length === 0 &&
                  <tr>
                    <td colSpan="2" className="center">
                      No api keys have been created for this dataset
                    </td>
                  </tr>
                }
              </tbody>
            </table>
            <Button { ...this._getButton() } />
          </div>
        </div>
      </div>
    )
  }

  _getButton() {
    const { dataset } = this.props
    return {
      label: 'Create API Key',
      color: 'blue',
      modal: <New dataset={ dataset } />
    }
  }

  _getTasks(apikey) {
    const { dataset } = this.props
    return {
      icon: 'ellipsis-v',
      className: '',
      tasks: [
        {
          label: 'Delete Key',
          confirm: 'Are you sure you want to delete this api key?',
          request: {
            endpoint: `/api/admin/datasets/datasets/${dataset.id}/apikeys/${apikey.id}`,
            method: 'delete',
            onFailure: () => this.context.flash.set('error', 'Unable to delete api key')
          }
        }
      ]
    }
  }

}

const mapResources = (props, context) => ({
  apikeys: `/api/admin/datasets/datasets/${props.dataset.id}/apikeys`
})

export default Container(mapResources)(APIKeys)
