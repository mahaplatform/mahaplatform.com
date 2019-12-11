import { Page } from 'maha-admin'
import ItemsImport from './import'
import pluralize from 'pluralize'
import React from 'react'
import Edit from './edit'
import New from './new'
import _ from 'lodash'

const mapResourcesToPage = (props, context, page) => ({
  fields: `/api/admin/sites_types/${page.params.type_id}/fields`,
  type: `/api/admin/sites/sites/${page.params.site_id}/types/${page.params.type_id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.type.title,
  collection: {
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Published', key: 'is_published', primary: true, format: 'check_times', collapsing: true },
      { label: 'Updated', key: 'updated_at', visible: false, format: 'date', collapsing: true }
    ],
    endpoint: `/api/admin/sites/sites/${page.params.site_id}/types/${page.params.type_id}/items`,
    empty: {
      icon: 'database',
      title: `No ${_.startCase(pluralize(resources.type.name))}`,
      text: `You have not yet created any ${resources.type.title}`,
      buttons: [
        { label: `Create ${_.startCase(resources.type.name)}`, modal: <New type={ resources.type } fields={ resources.fields } site_id={ page.params.site_id } /> },
        { label: `Import ${_.startCase(pluralize(resources.type.name))}`, modal: <ItemsImport user={ props.user } fields={ resources.fields } page={ page } /> }
      ]
    },
    entity: resources.type.title,
    recordTasks: (record) => [
      {
        label: `Edit ${_.startCase(resources.type.name)}`,
        modal: <Edit { ...record } type={ resources.type } fields={ resources.fields } site_id={ page.params.site_id } />
      },{
        label: `Publish ${_.startCase(resources.type.name)}`,
        show: !record.is_published,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/sites/sites/${page.params.site_id}/types/${resources.type.id}/items/${record.id}/publish`,
          body: { is_published: true },
          onFailure: () => {},
          onSuccess: () => {}
        }
      },{
        label: `Unpublish ${_.startCase(resources.type.name)}`,
        show: record.is_published,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/sites/sites/${page.params.site_id}/types/${resources.type.id}/items/${record.id}/publish`,
          body: { is_published: false },
          onFailure: () => {},
          onSuccess: () => {}
        }
      },{
        label: `Delete ${_.startCase(resources.type.name)}`,
        confirm: 'Are you sure you want to delete this item?',
        request: {
          endpoint: `/api/admin/sites/sites/${page.params.site_id}/types/${resources.type.id}/items/${record.id}`,
          method: 'DELETE',
          onFailure: (result) => context.flash.set('error', 'Unable to delete this item'),
          onSuccess: (result) => context.flash.set('success', 'You successfully deleted this item')
        }
      }
    ],
    new: () => <New type={ resources.type } fields={ resources.fields } site_id={ page.params.site_id } />,
    defaultSort: { key: 'title', order: 'asc' },
    selectable: true,
    buttons: ({ selected }) => selected.length > 0 ? [{
      color: 'red',
      text: 'Delete Selected',
      handler: () => {
        const ids = selected.map(record => record.id)
        context.confirm.open(`Are you sure you want to delete these ${pluralize('item', ids.length, true)}?`, () => {
          context.network.request({
            method: 'PATCH',
            endpoint: `/api/admin/sites/sites/${page.params.site_id}/types/${page.params.type_id}/items/delete`,
            body: { ids },
            onFailure: (result) => context.flash.set('error', `Unable to delete these ${pluralize('item', ids.length, true)}`),
            onSuccess: (result) => context.flash.set('success', `You successfully deleted ${pluralize('item', ids.length, true)}`)
          })
        })
      }
    },{
      color: 'red',
      text: 'Publish Selected',
      handler: () => {
        const ids = selected.map(record => record.id)
        context.network.request({
          method: 'PATCH',
          endpoint: `/api/admin/sites/sites/${page.params.site_id}/types/${page.params.type_id}/items/publish`,
          body: { ids, is_published: true },
          onFailure: (result) => context.flash.set('error', `Unable to publish these ${pluralize('item', ids.length, true)}`),
          onSuccess: (result) => context.flash.set('success', `You successfully published ${pluralize('item', ids.length, true)}`)
        })
      }
    },{
      color: 'red',
      text: 'Unpublish Selected',
      handler: () => {
        const ids = selected.map(record => record.id)
        context.network.request({
          method: 'PATCH',
          endpoint: `/api/admin/sites/sites/${page.params.site_id}/types/${page.params.type_id}/items/publish`,
          body: { ids, is_published: false },
          onFailure: (result) => context.flash.set('error', `Unable to unpublish these ${pluralize('item', ids.length, true)}`),
          onSuccess: (result) => context.flash.set('success', `You successfully unpublished ${pluralize('item', ids.length, true)}`)
        })
      }
    }] : null
  },
  tasks: {
    icon: 'plus',
    items: [
      { label: `Create ${_.startCase(resources.type.name)}`, modal: <New type={ resources.type } fields={ resources.fields } site_id={ page.params.site_id } /> },
      { label: `Import ${_.startCase(pluralize(resources.type.name))}`, modal: <ItemsImport user={ props.user } fields={ resources.fields } page={ page } /> }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
