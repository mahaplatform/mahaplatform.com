import { Button, Container } from 'maha-admin'
import PropTypes from 'prop-types'
import Change from './change'
import moment from 'moment'
import React from 'react'

class Changelog extends React.Component {

  static propTypes = {
    releases: PropTypes.array
  }

  render() {
    const { releases } = this.props
    return (
      <div className="maha-help-changelog">
        { releases.map((release, index) => (
          <div className="maha-help-changelog-release" key={`release_${index}`}>
            <div className="maha-help-changelog-release-title">
              <Button { ...this._getTitle(release) } />
            </div>
            <div className="maha-help-changelog-release-timestamp">
              { moment(release.created_at).format('MMM D [at] h:mm A') }<br />
            </div>
            <div className="maha-help-changelog-release-body">
              <ul>
                { release.body.split(/\n/).map((change, cindex) => (
                  <Change change={ change } key={`change_${cindex}`} />
                ))}
              </ul>
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getTitle(release) {
    return {
      label: `Version ${ release.name.replace('v', '') }`,
      className: 'link',
      link: `https://github.com/mahaplatform/mahaplatform.com/compare/${release.diff[0]}..${release.diff[1]}`
    }
  }

}

const mapResources = (props, context) => ({
  releases: '/api/admin/help/changes'
})

export default Container(mapResources)(Changelog)
