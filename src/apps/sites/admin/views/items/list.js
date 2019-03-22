import SitesImportFinalize from '../../components/sites_import_finalize'
import { Import, Page } from 'maha-admin'
import React from 'react'
import Edit from './edit'
import New from './new'
import _ from 'lodash'

const _getImport = (user, resources, page, props) => {
  return {
    table: 'sites_items',
    fields: resources.fields.reduce((fields, field) => [
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
    defaultMapping: _getDefaultMapping(resources.fields),
    finalizeComponent: SitesImportFinalize
  }
}

const _getDefaultMapping = (fields) => fields.reduce((mapping, field) => [
  ...mapping,
  ..._getMapping(field)
], [])

const _getMapping = (field) => {
  if(field.type === 'addressfield') return  _getAddressField(field)
  if(field.type === 'lookup') return  _getLookup(field)
  return [{
    field: `preimport.${field.code}`,
    header: field.label,
    type: getType(field.type),
    relation: null
  }]

}

const getType = (type) => {
  if(_.includes(['datefield','timefield'])) return type
  if(type == 'lookup') return 'relation'
  if(type == 'numberfield') return 'integer'
  if(type == 'imagefield') return 'upload'
  return 'text'
}

const _getLookup = (field) => [{
  field: `preimport.${field.code}`,
  header: field.label,
  type: 'relation',
  relation: 'sites_items',
  relationcolumn: 'values.title', //gpbruu682n
  relationtypeid: field.config.type_id
}]

const _getAddressField = (field) => [{
  field: `preimport.${field.code}.street1`,
  header: 'Street 1',
  type: 'text',
  relation: null
},{
  field: `preimport.${field.code}.street2`,
  header: 'Street 2',
  type: 'text',
  relation: null
},{
  field: `preimport.${field.code}.city`,
  header: 'City',
  type: 'text',
  relation: null
},{
  field: `preimport.${field.code}.province`,
  header: 'State/Province',
  type: 'text',
  relation: null
},{
  field: `preimport.${field.code}.postalcode`,
  header: 'Postal Code',
  type: 'text',
  relation: null
}]


const mapResourcesToPage = (props, context, page) => ({
  fields: `/api/admin/sites_types/${page.params.type_id}/fields`,
  type: `/api/admin/sites/sites/${page.params.site_id}/types/${page.params.type_id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.type.title,
  rights: [],
  collection: {
    table: [
      { label: 'Title', key: 'title', primary: true }
    ],
    endpoint: `/api/admin/sites/sites/${page.params.site_id}/types/${page.params.type_id}/items`,
    empty: `You have not yet created any ${resources.type.title}`,
    entity: resources.type.title,
    icon: 'database',
    recordTasks: [
      {
        label: 'Edit Item',
        modal: (props) => <Edit { ...props } type={ resources.type } fields={ resources.fields } site_id={ page.params.site_id } />
      },
      {
        label: 'Delete Item',
        request: (id) => ({
          endpoint: `/api/admin/sites/sites/${page.params.site_id}/types/${resources.type.id}/items/${id}`,
          method: 'DELETE',
          onFailure: () => {},
          onSuccess: () => {}
        })
      }
    ],
    new: () => <New type={ resources.type } fields={ resources.fields } site_id={ page.params.site_id } />,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      { label: `Add ${resources.type.title}`, modal: () => <New type={ resources.type } fields={ resources.fields } site_id={ page.params.site_id } /> },
      { label: `Bulk Import ${resources.type.title}`, modal: () => <Import {..._getImport(props.user, resources, page, props)} /> }

    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
