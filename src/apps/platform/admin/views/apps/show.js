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
        <div className="maha-app-detail-body">
          <List items={ this._getItems() } />
        </div>
      </div>
    )
  }

  _getItems() {
    const { app } = this.props
    return [
      { label: 'Title', content: app.title },
      { label: 'Version', content: app.version },
      { label: 'Author', content: app.author },
      { label: 'Description', content: app.description },
      { label: 'Category', content: app.category }
    ]
  }

}

const mapResourcesToPage = (props, context, page) => ({
  app: `/api/admin/platform/apps/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.app.title,
  component: AppsShow,
  color: resources.app.color
})

export default Page(mapResourcesToPage, mapPropsToPage)
