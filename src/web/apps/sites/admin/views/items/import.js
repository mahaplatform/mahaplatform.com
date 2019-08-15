import SitesImportFinalize from '../../components/sites_import_finalize'
import { Import } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class ItemsImport extends React.Component {

  static propTypes = {
    fields: PropTypes.array,
    page: PropTypes.object,
    user: PropTypes.object
  }

  render() {
    return <Import { ...this._getImport() } />
  }

  _getImport() {
    const { fields, page } = this.props
    return {
      table: 'sites_items',
      fields: fields.reduce((fields, field) => [
        ...fields,
        {
          ...field.config,
          name: field.config.name.replace('values', 'preimport')
        }
      ], []),
      primaryKey: null,
      destination: (import_id) => `${page.pathname}?$filter[import_id][$in][0]=${import_id}`,
      defaultParams: {
        site_id: page.params.site_id,
        type_id: page.params.type_id
      },
      defaultMapping: fields.reduce((mapping, field) => [
        ...mapping,
        ...this._getMapping(field)
      ], []),
      finalizeComponent: SitesImportFinalize
    }
  }

  _getMapping(field) {
    if(field.type === 'addressfield') return  this._getAddressField(field)
    if(field.type === 'lookup') return  this._getLookup(field)
    return [{
      field: `preimport.${field.code}`,
      header: field.label,
      type: this._getType(field.type),
      relation: null
    }]
  }

  _getType(type) {
    if(_.includes(['datefield','timefield'])) return type
    if(type == 'lookup') return 'relation'
    if(type == 'numberfield') return 'integer'
    if(type == 'imagefield') return 'upload'
    return 'text'
  }

  _getLookup({ code, label, config }) {
    return [{
      field: `preimport.${code}`,
      header: label,
      type: 'relation',
      relation: 'sites_items',
      relationcolumn: 'values.title',
      relationtypeid: config.type_id
    }]
  }

  _getAddressField({ code }) {
    return [
      { field: `preimport.${code}.street1`, header: 'Street 1', type: 'text', relation: null },
      { field: `preimport.${code}.street2`, header: 'Street 2', type: 'text', relation: null },
      { field: `preimport.${code}.city`, header: 'City', type: 'text', relation: null },
      { field: `preimport.${code}.province`, header: 'State/Province', type: 'text', relation: null },
      { field: `preimport.${code}.postalcode`, header: 'Postal Code', type: 'text', relation: null }
    ]
  }

}

export default ItemsImport
