import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'
import New from './new'

const Templates = ({ program, templates }) => {

  const list = {
    items: templates.map((template, index) => ({
      route: `/admin/crm/templates/${template.id}/design`,
      component: (props) => (
        <div className="token">
          { template.title }
        </div>
      )
    })),
    empty: {
      icon: 'copy',
      title: 'No Templates',
      text: 'There are no templates for this program',
      button: program.access_type === 'manage' ? {
        label: 'Add Template',
        modal: <New program_id={ program.id } />
      } : null
    },
    buttons: program.access_type === 'manage' && templates.length > 0 ? [
      { label: 'Add Template', color: 'blue', modal: <New program_id={ program.id } /> }
    ] : null
  }

  return <List { ...list } />

}

Templates.propTypes = {
  program: PropTypes.object,
  templates: PropTypes.array
}

export default Templates
