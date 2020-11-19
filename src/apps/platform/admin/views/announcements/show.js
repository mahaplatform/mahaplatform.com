import { Page } from '@admin'
import Details from './details'
// import Clone from './clone'
import React from 'react'
// import Send from './send'
// import Edit from './edit'

const getTabs = ({ audits, announcement, performance }) => ({
  items: [
    { label: 'Details', component: <Details announcement={ announcement } audits={ audits } /> },
    // { label: 'Performance', component: <Performance campaign={ campaign } performance={ performance } /> }
  ]
})

const getTasks = ({ announcement }, { flash }) => {

  const items = []

  // if(campaign.status === 'draft') {
  //   items.push({ label: 'Edit Campaign', modal: <Edit campaign={ campaign } /> })
  //   items.push({ label: 'Design Email', route: `/admin/campaigns/email/${campaign.id}/design` }),
  //   items.push({ label: 'Send/Schedule Campaign', modal: <Send campaign={ campaign } /> })
  // } else if(campaign.status === 'scheduled') {
  //   items.push({
  //     label: 'Unschedule Campaign',
  //     confirm: 'Are you sure you want to unschedule this campaign?',
  //     request: {
  //       endpoint: `/api/admin/platform/announcements/${campaign.id}/unschedule`,
  //       method: 'patch',
  //       onFailure: () => flash.set('error', 'Unable to unschedule campaign')
  //     }
  //   })
  // }
  //
  // items.push({ label: 'Convert to Template', modal: <Convert campaign={ campaign } /> })
  //
  // if(campaign.status === 'sent') {
  //   items.push({ label: 'Resend Campaign', modal: <Resend campaign={ campaign } /> })
  // }
  //
  // items.push({ label: 'Clone Campaign', modal: <Clone campaign={ campaign } /> })

  items.push({
    label: 'Delete Announcement',
    confirm: `
      Are you sure you want to delete this announcement? You will also delete
      all of the associated performance data
    `,
    request: {
      endpoint: `/api/admin/platform/announcements/${announcement.id}`,
      method: 'delete'
    }
  })

  return { items }

}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/maha_announcements/${props.params.id}/audits`,
  announcement: `/api/admin/platform/announcements/${props.params.id}`,
  // performance: `/api/admin/campaigns/email/${props.params.id}/performance`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Announcement',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
