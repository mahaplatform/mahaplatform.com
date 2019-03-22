import React from 'react'
import { Page } from 'maha-admin'

const mapResourcesToPage = (props, context) => ({
  group: `/api/admin/team/imports/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.import.name || resources.import.asset.original_file_name,
  rights: [],
  component: <div>Foo</div>,
  tasks: {
    items: [
      {
        label: 'Delete Import',
        handler: () => {}
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
