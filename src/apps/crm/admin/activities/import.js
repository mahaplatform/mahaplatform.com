import { Button, Container } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Import extends React.PureComponent {

  static propTypes = {
    activity: PropTypes.object,
    import: PropTypes.object,
    item: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    const imp = this.props.import
    const { item } = this.props
    return (
      <div className="crm-form-card">
        <table className="ui celled compact unstackable table">
          <tbody>
            <tr>
              <td>Source</td>
              <td>{ imp.service }</td>
            </tr>
            { Object.keys(item.values).map((key, index) => (
              <tr key={`value_${index}`}>
                <td>{ key }</td>
                <td>{ item.values[key] }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

}

const mapResources = (props, context) => ({
  import: `/api/admin/crm/imports/${props.activity.data.import_id}`,
  item: `/api/admin/crm/imports/${props.activity.data.import_id}/items/${props.activity.data.import_item_id}`
})

export default Container(mapResources)(Import)
