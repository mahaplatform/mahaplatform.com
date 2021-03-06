import { Page } from '@admin'
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
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Published', key: 'is_published', collapsing: true, primary: true, format: 'check_times' },
      { label: 'Updated', key: 'updated_at', collapsing: true, visible: false, format: 'date' }
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
    buttons: (selected, onSuccess) => [{
      color: 'red',
      text: 'Delete Selected',
      confirm: `Are you sure you want to delete these ${pluralize('item', selected.total, true)}?`,
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/sites/sites/${page.params.site_id}/types/${page.params.type_id}/items/delete`,
        body: {
          filter: selected.filter
        },
        onFailure: (result) => context.flash.set('error', `Unable to delete these ${pluralize('item', selected.total, true)}`),
        onSuccess: (result) => context.flash.set('success', `You successfully deleted ${pluralize('item', selected.total, true)}`)
      }
    },{
      color: 'red',
      text: 'Publish Selected',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/sites/sites/${page.params.site_id}/types/${page.params.type_id}/items/publish`,
        body: {
          filter: selected.filter,
          is_published: true
        },
        onFailure: (result) => context.flash.set('error', `Unable to publish these ${pluralize('item', selected.total, true)}`),
        onSuccess: (result) => context.flash.set('success', `You successfully published ${pluralize('item', selected.total, true)}`)
      }
    },{
      color: 'red',
      text: 'Unpublish Selected',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/sites/sites/${page.params.site_id}/types/${page.params.type_id}/items/publish`,
        body: {
          filter: selected.filter,
          is_published: false
        },
        onFailure: (result) => context.flash.set('error', `Unable to unpublish these ${pluralize('item', selected.total, true)}`),
        onSuccess: (result) => context.flash.set('success', `You successfully unpublished ${pluralize('item', selected.total, true)}`)
      }
    }]
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
