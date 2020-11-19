import EmailDesigner from '@apps/automation/admin/components/email_designer'
import PropTypes from 'prop-types'
import { Page } from '@admin'
import React from 'react'
import _ from 'lodash'

class Designer extends React.Component {

  static propTypes = {
    announcement: PropTypes.object
  }

  render() {
    return <EmailDesigner { ...this._getEmailDesigner() } />
  }

  _getEmailDesigner() {
    const { announcement } = this.props
    return {
      defaultValue: announcement.config,
      editable: _.includes(['active','draft','inactive'], announcement.status),
      endpoint: `/api/admin/platform/announcements/${announcement.id}`,
      tokens: [
        { title: 'Account', tokens: [
          { name: 'Full Name', token: 'account.full_name' },
          { name: 'First Name', token: 'account.first_name' },
          { name: 'Last Name', token: 'account.last_name' },
          { name: 'Email', token: 'account.email' }
        ] }
      ]
    }
  }

}

const mapResourcesToPage = (props, context) => ({
  announcement: `/api/admin/platform/announcements/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Announcement',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
