import React from 'react'
import { Page } from 'maha-admin'
import Edit from './edit'
import Reject from './reject'
import Details from './details'

const mapResourcesToPage = (props, context) => ({
  attraction: `/api/admin/eatfresh/attractions/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.attraction.title,
  tabs: {
    items: [
      { label: 'Details', component: <Details attraction={ resources.attraction } /> }
    ]
  },
  tasks: {
    items: [
      {
        label: 'Edit Attraction',
        modal: (props) => <Edit attraction={ resources.attraction } />
      }, {
        label: 'Delete Attraction',
        show: resources.attraction.is_approved === false,
        confirm: 'Are you sure you want to delete this attraction?',
        request: {
          method: 'DELETE',
          endpoint: `/api/admin/eatfresh/attractions/${ resources.attraction.id }`,
          onSuccess: (result) => {
            context.flash.set('success', 'Successfully deleted this attraction')
            context.router.goBack()
          },
          onFailure: (result) => context.flash.set('error', 'Unable to delete this attraction')
        }
      }, {
        label: 'Approve Attraction',
        show: resources.attraction.is_approved === null,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/eatfresh/attractions/${resources.attraction.id}/approve`,
          onFailure: (result) => context.flash.set('error', 'Unable to approve attraction'),
          onSuccess: (result) => context.flash.set('success', 'This attraction has been approved')
        }
      }, {
        label: 'Reject Attraction',
        show: resources.attraction.is_approved === null,
        modal: () => <Reject id={ resources.attraction.id } />
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
