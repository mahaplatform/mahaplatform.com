import InstallButton from '../../components/install_button'
import { List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class AppsShow extends React.Component {

  static propTypes = {
    app: PropTypes.object
  }

  render() {
    const { app } = this.props
    return (
      <div className="maha-app-detail">
        <div className={ `maha-app-detail-header ${app.color}` }>
          <i className={ `fa fa-fw fa-${app.icon}` } />
        </div>
      </div>
    )
  }

}

const Details = ({ app }) => {
  const items = [
    { label: 'Title', content: app.title },
    { label: 'Description', content: app.description }
  ]
  return <List items={ items } />
}

const getTabs = ({ app }, { configuration }) => {

  const items = [
    { label: 'Details', component: <Details app={ app } /> }
  ]

  if(configuration.usage[app.code]) {
    const Usage = configuration.usage[app.code]
    items.push({ label: 'Usage', component: <Usage /> })
  }

  return {
    header: <AppsShow app={ app } />,
    items
  }

}

const mapResourcesToPage = (props, context) => ({
  app: `/api/admin/team/apps/${props.params.id}`
})

const mapPropsToPage = (props, context, resources) => ({
  title: resources.app.title,
  color: resources.app.color,
  rights: ['team:manage_apps'],
  tabs: getTabs(resources, context),
  tasks: context.configuration.settings[resources.app.code] ? {
    items: [{
      label: 'Edit Settings',
      modal: context.configuration.settings[resources.app.code],
      rights: ['team:manage_apps']
    }]
  } : null,
  footer: [
    <InstallButton app={ resources.app } key="install" />
  ]
})

export default Page(mapResourcesToPage, mapPropsToPage)
