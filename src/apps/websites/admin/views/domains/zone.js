import RecordToken from '@apps/websites/admin/tokens/record'
import PropTypes from 'prop-types'
import { Button } from '@admin'
import React from 'react'
import _ from 'lodash'

class Zone extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    domain: PropTypes.object,
    records: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td className="collapsing">Type</td>
              <td className="collapsing" />
            </tr>
          </thead>
          <tbody>
            { records.map((record, index) => (
              <tr key={`record_${index}`}>
                <td>
                  <RecordToken record={ record } />
                </td>
                <td>{ record.type }</td>
                <td>
                  { !_.includes(['SOA','NS'], record.type) &&
                    <Button { ...this._getTasks(record) } />
                  }
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }

  _getTasks(record) {
    const { domain } = this.props
    return {
      icon: 'ellipsis-v',
      className: '',
      tasks: [
        { label: 'Edit Record', modal: <div /> },
        {
          label: 'Delete Record',
          confirm: 'Are you sure you want to delete this record?',
          request: {
            endpoint: `/api/admin/websites/domains/${domain.id}/records`,
            method: 'delete',
            body: { record },
            onFailure: () => this.context.flash.set('error', 'Unable to delete record'),
            onSuccess: () => {}
          }
        }
      ]
    }
  }

}

export default Zone
