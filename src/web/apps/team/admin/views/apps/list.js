import InstallButton from '../../components/install_button'
import { AppToken, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Apps extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    records: PropTypes.array,
    status: PropTypes.string
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-list">
        { records.map((app, index) => {
          return (
            <div key={`app_${index}`} className="maha-list-item maha-app-item">
              <div className="maha-list-item-content" onClick={ this._handleClick.bind(this, app.id) }>
                <AppToken { ...app } />
              </div>
              <div className="maha-list-item-extra">
                <InstallButton app={ app } />
              </div>
              <div className="maha-list-item-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  _handleClick(app_id) {
    this.context.router.push(`/admin/team/apps/${app_id}`)
  }

}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Apps',
  rights: ['team:manage_apps'],
  collection: {
    endpoint: '/api/admin/team/apps',
    entity: 'app',
    defaultSort: { key: 'code', order: 'asc' },
    layout: Apps
  }
})

export default Page(null, mapPropsToPage)
