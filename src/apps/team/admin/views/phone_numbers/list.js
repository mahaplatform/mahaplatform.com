import { Page } from 'maha-admin'
import New from './new'

import PropTypes from 'prop-types'
import React from 'react'

const PhoneTypeToken = ({ type }) => (
  <div className="token">
    { type === 'fax' ? 'fax' : 'voice / sms' }
  </div>
)

PhoneTypeToken.propTypes = {
  type: PropTypes.string
}

const LocalityToken = ({ locality, region }) => (
  <div className="token">
    { locality }, { region }
  </div>
)

LocalityToken.propTypes = {
  locality: PropTypes.string,
  region: PropTypes.string
}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Phone Numbers',
  rights: [],
  collection: {
    endpoint: '/api/admin/team/phone_numbers',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Number', key: 'formatted', primary: true},
      { label: 'Locality', key: 'locality', format: LocalityToken },
      { label: 'Type', key: 'type', format: PhoneTypeToken }
    ],
    recordTasks: (program) => [
      {
        label: 'Release Number',
        request: {
          endpoint: `/api/admin/team/phone_numbers/${program.id}`,
          method: 'delete',
          onSuccess: () => {},
          onFailure: () => {}
        }
      }
    ],
    empty: {
      icon: 'hashtag',
      title: 'No Phone Numbers',
      text: 'You have not yet created any phone numbers',
      buttons: [
        { label: 'Create Phone Number', modal: New }
      ]
    },
    entity: 'phone number',
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Provision Number',
        modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
