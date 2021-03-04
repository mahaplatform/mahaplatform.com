import PropTypes from 'prop-types'
import { Button } from '@admin'
import moment from 'moment'
import React from 'react'

class Versions extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    entity: PropTypes.string,
    version: PropTypes.object,
    versions: PropTypes.array,
    onSetVersion: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { versions } = this.props
    return (
      <div className="maha-versions">
        { versions.map((version, index) => (
          <div className={ this._getClass(version.id) } key={`version_${index}`} onClick={ this._handleClick.bind(this, version) }>
            <div className="maha-versions-version-active">
              <i className={`fa fa-${this._getIcon(version.id) }`} />
            </div>
            <div className="maha-versions-version-details">
              <div className="maha-versions-version-title">
                { index === 0 ? 'Current Version ' : `Version ${versions.length - index} ` }
              </div>
              <div className="maha-versions-version-timestamp">
                UPDATED: { moment(version.updated_at).format('MMM DD, YYYY [@] h:mm A') } by { version.user.full_name }
              </div>
              { version.is_published &&
                <span className="maha-versions-version-published">Published</span>
              }
              { (!version.is_published || index > 0) &&
                <Button { ...this._getPublish(version, index) } />
              }
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getClass(id) {
    const { version } = this.props
    const classes = ['maha-versions-version']
    if(id === version.id) classes.push('active')
    return classes.join(' ')
  }

  _getIcon(id) {
    const { version } = this.props
    return id === version.id ? 'check-circle' : 'circle-o'
  }

  _getPublish(version, index) {
    const handler = index === 0 ? this._handlePublish : this._handleRollback
    return {
      label: index === 0 ? 'Publish Version' : 'Revert to Version',
      className: 'link',
      handler: handler.bind(this, version)
    }
  }

  _handleClick(version) {
    this.props.onSetVersion(version.id)
  }

  _handlePublish(version, e) {
    e.stopPropagation()
    const { entity } = this.props
    this.context.network.request({
      endpoint: `/api/admin/${entity}/versions/publish`,
      method: 'PATCH',
      body: {
        publish_id: version.id
      },
      onFailure: () => {},
      onSuccess: () => {}
    })
  }

  _handleRollback(version, e) {
    e.stopPropagation()
    const { entity } = this.props
    this.context.network.request({
      endpoint: `/api/admin/${entity}/versions/rollback`,
      method: 'PATCH',
      body: {
        rollback_id: version.id
      },
      onFailure: () => {},
      onSuccess: () => {}
    })
  }

}

export default Versions
