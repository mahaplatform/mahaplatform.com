import EmailDesigner from '../../components/email_designer/wrapper'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Designer extends React.Component {

  static propTypes = {
    email: PropTypes.object
  }

  render() {
    return <EmailDesigner { ...this._getEmailDesigner() } />
  }

  _getEmailDesigner() {
    const { email } = this.props
    return {
      defaultValue: email.config,
      endpoint: `/api/admin/crm/emails/${email.id}`,
      program: email.program,
      tokens: this._getTokens()
    }
  }

  _getTokens() {
    const { email } = this.props
    if(email.form) {
      return [
        { title: 'Response Tokens', tokens: email.form.config.fields.filter(field => {
          return !_.includes(['text'], field.type)
        }).map(field => ({
          name: field.name.value,
          token: field.name.token
        })) }
      ]
    }
    return []
  }

}

const mapResourcesToPage = (props, context) => ({
  email: `/api/admin/crm/emails/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
