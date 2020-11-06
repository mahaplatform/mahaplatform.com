import RecordToken from '../../tokens/recording'
import { Page } from '@admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Recordings',
  rights: [],
  collection: {
    endpoint: `/api/admin/campaigns/voice/${props.params.campaign_id}/recordings`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { key: 'asset.file_name', primary: true, padded: true, collapsing: true, format: (recording) => <RecordToken asset={ recording.asset } /> },
      { label: 'Contact', key: 'contact.display_name', primary: true },
      { label: 'Duration', key: 'duration', format: 'duration' },
      { label: 'Created At', key: 'created_at', format: 'datetime' }
    ],
    empty: {
      icon: 'microphone',
      title: 'No Recordings',
      text: 'There are no recordings for this voice campaign'
    },
    defaultSort: { key: '-created_at', order: 'asc' },
    entity: 'enrollment'
  }
})

export default Page(null, mapPropsToPage)
