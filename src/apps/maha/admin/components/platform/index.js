import { Flash } from 'reframe'
import HTML5Backend from 'react-dnd-html5-backend'
import Notifications from '../notifications'
import { DragDropContext } from 'react-dnd'
import { connect } from 'react-redux'
import { routes } from './selectors'
import Analytics from '../analytics'
import Presence from '../presence'
import PropTypes from 'prop-types'
import Sessions from '../sessions'
import Network from '../network'
import Device from '../device'
import Router from '../router'
import Logger from '../logger'
import Admin from '../admin'
import Push from '../push'
import React from 'react'

class Platform extends React.Component {

  static propTypes = {
    badges: PropTypes.array,
    roots: PropTypes.array,
    routes: PropTypes.object
  }

  render() {
    const { routes } = this.props
    return (
      <div className="maha-platform">
        <Analytics>
          <Logger>
            <Router routes={ routes }>
              <Network>
                <Device>
                  <Push>
                    <Notifications>
                      <Flash>
                        <Admin>
                          <Presence>
                            <Sessions { ...this._getSessions() } />
                          </Presence>
                        </Admin>
                      </Flash>
                    </Notifications>
                  </Push>
                </Device>
              </Network>
            </Router>
          </Logger>
        </Analytics>
      </div>
    )
  }

  _getSessions() {
    const { badges, roots, routes } = this.props
    return {
      badges,
      roots,
      routes
    }
  }

}

const mapStateToProps = (state, props) => ({
  routes: routes(state, props)
})

Platform = connect(mapStateToProps)(Platform)
Platform = DragDropContext(HTML5Backend)(Platform)

export default Platform
