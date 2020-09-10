import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import Release from './release'
import React from 'react'

class Releases extends React.Component {

  static propTypes = {
    releases: PropTypes.array
  }

  render() {
    const { releases } = this.props
    return (
      <div className="maha-help-changelog">
        { releases.map((release, index) => (
          <Release release={ release } index={ index } key={`release_${index}`} />
        )) }
      </div>
    )
  }

}

const mapResources = (props, context) => ({
  releases: '/api/admin/help/changes'
})

export default Container(mapResources)(Releases)
