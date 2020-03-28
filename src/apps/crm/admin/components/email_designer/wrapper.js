import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import EmailDesigner from './index'
import React from 'react'

class EmailDesignerWrapper extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    programfields: PropTypes.array,
    tokens: PropTypes.object
  }

  render() {
    return (
      <EmailDesigner { ...this._getEmailDesigner() } />
    )
  }

  _getEmailDesigner() {
    return {
      ...this.props,
      tokens: this._getTokens()
    }
  }

  _getTokens() {
    const { program, programfields, tokens } = this.props
    return [
      { title: 'Contact Tokens', tokens: [
        { name: 'Full Name', token: 'contact.full_name' },
        { name: 'First Name', token: 'contact.first_name' },
        { name: 'Last Name', token: 'contact.last_name' },
        { name: 'Primary Email', token: 'contact.email' },
        { name: 'Primary Address', token: 'contact.address' },
        { name: 'Primary Phone', token: 'contact.phone' },
        { name: 'Spouse', token: 'spouse' },
        { name: 'Birthday', token: 'birthday' }
      ] },
      ...programfields.length > 0 ? [{ title: `${program.title} Tokens`, tokens: programfields.map(field => ({
        name:   field.label,
        token: `program.${field.name.token}`
      }))}] : [],
      { title: 'Email Tokens', tokens: [
        { name: 'Preferences Link', token: 'email.preferences_link' },
        { name: 'Web Link', token: 'email.web_link' }
      ] },
      ...tokens ? tokens : []
    ]
  }

}

const mapResources = (props, context) => ({
  programfields: `/api/admin/crm/programs/${props.program.id}/fields`
})

export default Container(mapResources)(EmailDesignerWrapper)
