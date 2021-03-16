import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Button } from '@admin'

class Zone extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    domain: PropTypes.object,
    records: PropTypes.object
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td className="collapsing" />
              <td>Name</td>
              <td className="collapsing">Type</td>
              <td>Value</td>
              <td className="collapsing" />
            </tr>
          </thead>
          <tbody>
            { records.map((record, index) => (
              <tr key={`record_${index}`}>
                <td>
                  { record.is_system &&
                    <span className="alert">*</span>
                  }
                </td>
                <td>{ this._getName(record) }</td>
                <td>{ record.type }</td>
                <td>{ record.records.map((record, rindex) => (
                  <Fragment key={`value_${rindex}`}>
                    { record.value }<br />
                  </Fragment>
                )) }</td>
                <td>
                  { !record.is_system &&
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

  _getName(record) {
    const { domain } = this.props
    if(!record.name) return domain.name
    return `${record.name}.${domain.name}`
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
            endpoint: `/api/admin/websites/domains/${domain.id}/records/${record.id}`,
            method: 'delete',
            onFailure: () => this.context.flash.set('error', 'Unable to delete record'),
            onSuccess: () => {}
          }
        }
      ]
    }
  }

}

export default Zone
