import EmailDesigner from '../../../../components/email_designer/wrapper'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

class Designer extends React.Component {

  static propTypes = {
    template: PropTypes.object
  }

  render() {
    return <EmailDesigner { ...this._getEmailDesigner() } />
  }

  _getEmailDesigner() {
    const { template } = this.props
    return {
      defaultValue: template.config,
      endpoint: `/api/admin/crm/programs/${template.program.id}/templates/${template.id}`,
      program: template.program,
      tokens: [],
      settings: false
    }
  }

}

const mapResourcesToPage = (props, context) => ({
  template: `/api/admin/crm/programs/${props.params.program_id}/templates/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Template',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
