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
        <div className="maha-app-detail-header">
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
      { label: 'Description', content: app.description }
    ]
  }

}

const mapResourcesToPage = (props, context, page) => ({
  app: `/api/admin/platform/apps/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.app.title,
  component: AppsShow
})

export default Page(mapResourcesToPage, mapPropsToPage)
