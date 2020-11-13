import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Teams from './teams'
import React from 'react'
import Apps from './apps'

class Navigation extends React.Component {

  static propTypes = {
    apps: PropTypes.array,
    mode: PropTypes.string,
    path: PropTypes.array,
    rights: PropTypes.array,
    state: PropTypes.string,
    team: PropTypes.object,
    user: PropTypes.object,
    onDone: PropTypes.func,
    onToggleMode: PropTypes.func,
    onForward: PropTypes.func,
    onBack: PropTypes.func
  }

  static defaultProps = {
    onDone: () => {}
  }

  render() {
    const { mode, state } = this.props
    return (
      <div className={`maha-navigation ${state}`}>
        { mode === 'apps' ?
          <Apps { ...this._getApps() } /> :
          <Teams { ...this._getTeams() } />
        }
      </div>
    )
  }

  _getApps() {
    const { apps, team, rights, user } = this.props
    return {
      ...this.props,
      items: apps.filter(app => {
        return !(!app.items && !app.route)
      }),
      rights,
      team,
      user
    }
  }

  _getTeams() {
    const { team } = this.props
    return {
      ...this.props,
      team
    }
  }

}

const mapStateToProps = (state, props) => ({
  active: state.maha.admin.active,
  apps: state.maha.admin.apps,
  rights: state.maha.admin.rights,
  teams: state.maha.admin.teams,
  team: state.maha.admin.team,
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Navigation)
