import TripsImportFinalize from '../../components/trips_import_finalize'
import { connect } from 'react-redux'
import { Import } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class TripImport extends React.Component {

  static propTypes = {
    user_id: PropTypes.number
  }

  render() {
    return <Import {...this._getImport()} />
  }

  _getImport() {
    const { user_id } = this.props
    return {
      table: 'finance_trips',
      fields: [
        { label: 'ID', key: 'item_id', width: 80, visible: false },
        { label: 'Date', name: 'date', type: 'datefield', required: true, format: 'YYYY-MM-DD' },
        { label: 'Description', name: 'description', type: 'textfield', required: true },
        { label: 'Project Code', name: 'project_code', type: 'textfield' },
        { label: 'Time Leaving', name: 'time_leaving', type: 'timefield', format: 'HH:mm:ss' },
        { label: 'Time Arriving', name: 'time_arriving', type: 'timefield', format: 'HH:mm:ss' },
        { label: 'Odometer Start', name: 'odometer_start', type: 'textfield' },
        { label: 'Odometer End', name: 'odometer_end', type: 'textfield' },
        { label: 'Distance', name: 'total_miles', type: 'textfield' }
      ],
      primaryKey: null,
      rules: {
        date: ['required'],
        description: ['required']
      },
      destination: (import_id) => `/admin/finance/items?$filter[import_id][$in][0]=${import_id}`,
      defaultParams: {
        user_id,
        status: 'pending'
      },
      defaultMapping: [
        { field:'date', header:'Date', type:'datefield', relation:null, format: 'YYYY-MM-DD' },
        { field:'description', header:'Description', type:'text', relation:null },
        { field:'project_id', header:'Project Code', type:'relation', relation:'finance_projects', relationcolumn:'integration.project_code' },
        { field:'time_leaving', header:'Time Leaving', type:'timefield', relation:null, format: 'HH:mm:ss' },
        { field:'time_arriving', header:'Time Arriving', type:'timefield', relation:null, format: 'HH:mm:ss' },
        { field:'odometer_start', header:'Odometer Start', type:'integer', relation:null },
        { field:'odometer_end', header:'Odometer End', type:'integer', relation:null },
        { field:'total_miles', header:'Distance', type:'integer', relation:null }
      ],
      finalizeComponent: TripsImportFinalize
    }
  }

}

const mapStateToProps = (state, props) => ({
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(TripImport)
