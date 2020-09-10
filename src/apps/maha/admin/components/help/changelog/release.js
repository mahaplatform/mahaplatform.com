import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import Change from './change'
import moment from 'moment'
import React from 'react'

class Release extends React.Component {

  static propTypes = {
    index: PropTypes.number,
    release: PropTypes.object
  }

  render() {
    const { index, release } = this.props
    return (
      <div className="maha-help-changelog-release">
        <div className="maha-help-changelog-release-title">
          <Button { ...this._getTitle(release) } />
          { index === 0 &&
            <span className="maha-help-changelog-release-new">NEW</span>
          }
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

export default Release
